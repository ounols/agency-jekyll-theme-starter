/**
 * SqueezyImagesCanvas
 * ------------------------------------------------------------------
 * 캔버스 하나에 카드 여러 장을 그리는 "스퀴즈(아코디언)" 캐러셀.
 *
 * 동작 원리
 *  - <canvas> 하나에 카드 7장을 그린다: 큰 컬럼 4장 + 오른쪽 얇은 띠 3장(8px).
 *  - 각 카드는 "둥근 사각형 클리핑 창"이고, 그 뒤에 16:9 이미지가 캔버스 높이에 맞춰
 *    카드 중앙 기준으로 그려진다. 카드 폭이 줄어도 이미지 크기는 그대로라
 *    이미지가 '찌그러지는' 게 아니라 '창이 좁아지는' 느낌(squeezy)이 난다.
 *  - 컬럼 폭은 flex 비율로 정해진다. 마우스를 올린 컬럼은 stretched 비율,
 *    나머지는 squeezed 비율로 1초 easeOutExpo 보간된다.
 *  - 다음/이전: 카드 배열의 끝/앞에 8px짜리 카드를 추가하고 전체를 24px(8+16)씩 밀면서
 *    폭을 다시 보간한다. 애니메이션이 끝나면 columnIndex 0부터 7장만 남긴다.
 *  - 컬럼(0 제외)을 클릭하면 그 컬럼 수만큼 앞으로 이동한다.
 *
 * 사용법
 *   var c = new SqueezyImagesCanvas({
 *     canvasElement: canvas,
 *     items: [{ imgSrc: '/img/a.jpg', collapsedOffsetX: 0 }, ...],
 *     onNextColumnClick: function (steps) { ... },   // 캔버스 클릭 시 호출
 *     prefersReducedMotion: false
 *   });
 *   c.loadCanvasImages();
 *   c.gotoNext(1); c.gotoPrev(1); c.onCanvasResize(); c.dispose();
 */
(function (global) {
  'use strict';

  var CONFIG = {
    smallCardGap: 8,          // 얇은 카드 사이 간격
    largeCardGap: 16,         // 큰 컬럼 사이 간격
    smallCardWidth: 8,        // 얇은 카드 폭
    // 컬럼별 flex 비율 [기본, 다른 컬럼 hover 시(squeezed), 자기 자신 hover 시(stretched)]
    columnOne:   { base: -0.06, squeezed: -0.12, stretched: 0    },
    columnTwo:   { base:  0.61, squeezed:  0.59, stretched: 0.71 },
    columnThree: { base:  0.30, squeezed:  0.28, stretched: 0.40 },
    columnFour:  { base:  0.15, squeezed:  0.13, stretched: 0.25 },
    smallCardHoverOffset: 3,  // 얇은 카드 hover 시 늘어나는 px
    borderRadius: 6,
    cardOutlineColor: 'rgba(240, 246, 252, 0.16)', // 어두운 배경에서 카드 경계를 살리는 얇은 윤곽선
    cardOutlineWidth: 1,
    placeholderColor: '#21262d',
    placeholderTextColor: '#8b949e',
    placeholderFont: '600 15px Pretendard, -apple-system, "Segoe UI", sans-serif',
    animationDuration: 1000,
    reducedMotionDuration: 200,
    visibleCards: 7           // 큰 컬럼 4 + 얇은 카드 3
  };

  var COLUMNS = [CONFIG.columnOne, CONFIG.columnTwo, CONFIG.columnThree, CONFIG.columnFour];
  var BASE_FLEX = COLUMNS.map(function (c) { return c.base; });

  function clamp(v, min, max) { return Math.max(Math.min(v, max), min); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }

  /* ---------- 이미지 로더 ---------- */
  function CanvasImage(url, onLoad) {
    var self = this;
    this.loadingState = 'idle';
    this.url = url;
    this.imageElement = new Image();
    this.imageElement.decoding = 'async';
    this.imageElement.onload = function () { self.loadingState = 'loaded'; if (onLoad) onLoad(); };
    this.imageElement.onerror = function () { self.loadingState = 'error'; };
  }
  CanvasImage.prototype.load = function () {
    if (this.loadingState !== 'idle') return;
    if (!this.url) { this.loadingState = 'error'; return; }
    this.loadingState = 'loading';
    this.imageElement.src = this.url;
    if (this.imageElement.complete && this.imageElement.naturalWidth > 0) {
      this.imageElement.onload();
    }
  };

  /* ---------- 메인 클래스 ---------- */
  function SqueezyImagesCanvas(opts) {
    var self = this;

    this.canvasElement = opts.canvasElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.dpr = window.devicePixelRatio || 1;
    this.prefersReducedMotion = !!opts.prefersReducedMotion;
    this.onNextColumnClick = opts.onNextColumnClick || function () {};
    this.animationDuration = this.prefersReducedMotion ? CONFIG.reducedMotionDuration : CONFIG.animationDuration;

    this.canvasImages = [];
    this.itemsCollapsedOffsetX = [];
    this.cards = [];
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.totalGap = 3 * CONFIG.smallCardGap + 3 * CONFIG.largeCardGap;
    this.imageWidth = 0;             // 모든 이미지가 그려지는 폭 (= 캔버스 높이 * 16/9)
    this.colOneBaseWidth = 0;        // 첫 컬럼 기본 폭 (= 캔버스 높이 * 16/9)
    this.totalMediumCardWidth = 0;   // 컬럼들이 flex 비율로 나눠 갖는 폭
    this.columnIndexOffset = 0;
    this.cardsOffsetX = 0;
    this.animationStartCardsOffsetX = 0;
    this.targetCardsOffsetX = 0;
    this.mediumCardsWidthOffset = 0;
    this.animationStartMediumCardsWidthOffset = 0;
    this.targetMediumCardsWidthOffset = 0;
    this.animationStartAt = 0;
    this.animationRequestId = 0;
    this.interactiveCardsFlexFraction = BASE_FLEX.slice();
    this.hoveredCardIndex = -1;
    this.hasInitializedCards = false;

    // 이벤트 핸들러 (this 바인딩)
    this.renderGridCards = function () { self._renderGridCards(); };
    this.updateHoverIndex = function (e) { self._updateHoverIndex(e); };
    this.resetHoverIndex = function () { self._resetHoverIndex(); };
    this.onCanvasClick = function () { self._onCanvasClick(); };
    this.animate = function (now) { self._animate(now); };

    this.canvasElement.style.removeProperty('display');
    this.canvasElement.addEventListener('mouseenter', this.updateHoverIndex);
    this.canvasElement.addEventListener('mousemove', this.updateHoverIndex);
    this.canvasElement.addEventListener('mouseleave', this.resetHoverIndex);
    this.canvasElement.addEventListener('click', this.onCanvasClick);
    document.addEventListener('visibilitychange', this.renderGridCards);

    this._init(opts.items || []);
    this.onCanvasResize();
  }

  /* 초기 카드 배열 구성: 항상 7장을 만들고 아이템이 부족하면 순환시킨다 */
  SqueezyImagesCanvas.prototype._init = function (items) {
    var self = this;
    this.canvasImages = items.map(function (item) {
      return new CanvasImage(item.imgSrc, self.renderGridCards);
    });
    this.itemsCollapsedOffsetX = items.map(function (item) { return item.collapsedOffsetX || 0; });
    this.itemTitles = items.map(function (item) { return item.title || ''; });

    var count = Math.min(CONFIG.visibleCards, Math.max(items.length, 0));
    if (items.length > 0 && items.length < CONFIG.visibleCards) count = CONFIG.visibleCards;
    this.cards = [];
    for (var i = 0; i < count; i++) {
      var itemIndex = i % items.length;
      this.cards.push({
        itemIndex: itemIndex,
        img: this.canvasImages[itemIndex].imageElement,
        title: this.itemTitles[itemIndex],
        x: 0,
        collapsedOffsetX: i === 0 ? 0 : this.itemsCollapsedOffsetX[itemIndex],
        width: this._getCardWidth(i),
        leftGap: i < 4 ? CONFIG.largeCardGap : CONFIG.smallCardGap,
        columnIndex: i
      });
    }
    this._renderGridCards();
    this.hasInitializedCards = true;
  };

  SqueezyImagesCanvas.prototype.loadCanvasImages = function () {
    this.canvasImages.forEach(function (img) { img.load(); });
  };

  /* 캔버스 CSS 크기 → 비트맵 크기(DPR 반영) 갱신 + 레이아웃 상수 재계산 */
  SqueezyImagesCanvas.prototype.onCanvasResize = function () {
    var rect = this.canvasElement.getBoundingClientRect();
    var w = rect.width, h = rect.height;
    this.dpr = window.devicePixelRatio || 1;
    this.canvasElement.width = Math.round(w * this.dpr);
    this.canvasElement.height = Math.round(h * this.dpr);
    this.canvasWidth = w;
    this.canvasHeight = h;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);

    this.colOneBaseWidth = this.canvasHeight * (16 / 9);
    this.totalMediumCardWidth = this.canvasWidth - this.colOneBaseWidth - this.totalGap - 3 * CONFIG.smallCardWidth;
    this.imageWidth = this.colOneBaseWidth + this.totalMediumCardWidth * CONFIG.columnOne.stretched;

    if (this.animationRequestId) cancelAnimationFrame(this.animationRequestId);
    var self = this;
    this.cards.forEach(function (card) {
      card.width = self._getCardWidth(card.columnIndex);
      card.leftGap = card.columnIndex < 4 ? CONFIG.largeCardGap : CONFIG.smallCardGap;
    });
    if (this.hasInitializedCards) this._resetHoverIndex();
  };

  /* ---------- hover ---------- */
  SqueezyImagesCanvas.prototype._updateHoverIndex = function (e) {
    var x = e.offsetX;
    var hit = -1;
    for (var i = 0; i < this.cards.length; i++) {
      var c = this.cards[i];
      if (c.x <= x && x <= c.x + c.width) { hit = c.columnIndex; break; }
    }
    if (hit >= 0 && hit !== this.hoveredCardIndex) {
      this.hoveredCardIndex = hit;
      this._updateCardsFlex();
    }
  };

  SqueezyImagesCanvas.prototype._resetHoverIndex = function () {
    this.hoveredCardIndex = -1;
    this._updateCardsFlex();
  };

  SqueezyImagesCanvas.prototype._onCanvasClick = function () {
    if (this.hoveredCardIndex > 0) this.onNextColumnClick(this.hoveredCardIndex);
  };

  SqueezyImagesCanvas.prototype._updateCardsFlex = function () {
    var h = this.hoveredCardIndex;
    if (h >= 0 && h <= 3 && !this.prefersReducedMotion) {
      this.interactiveCardsFlexFraction = COLUMNS.map(function (col, i) {
        return i === h ? col.stretched : col.squeezed;
      });
    } else {
      this.interactiveCardsFlexFraction = BASE_FLEX.slice();
    }
    // 원본은 hover 인덱스 >= 0 이면 pointer 였지만, 클릭 동작은 컬럼 1 이상에서만 일어난다.
    this.canvasElement.style.cursor = h > 0 ? 'pointer' : 'default';
    this._startCarouselAnimation(0);
  };

  /* ---------- 레이아웃 ---------- */
  SqueezyImagesCanvas.prototype._getCardWidth = function (columnIndex) {
    if (columnIndex < 0 || columnIndex > 3) {
      var extra = this.hoveredCardIndex === columnIndex ? this.targetMediumCardsWidthOffset : 0;
      return CONFIG.smallCardWidth + extra;
    }
    var medium = this.totalMediumCardWidth - this.targetMediumCardsWidthOffset;
    if (columnIndex === 0) {
      return this.colOneBaseWidth + medium * this.interactiveCardsFlexFraction[0];
    }
    return medium * this.interactiveCardsFlexFraction[columnIndex];
  };

  SqueezyImagesCanvas.prototype._renderGridCards = function () {
    var self = this;
    this.cards.forEach(function (card, i) {
      card.x = i === 0 ? self.cardsOffsetX : self.cards[i - 1].x + self.cards[i - 1].width + card.leftGap;
    });
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.cards.forEach(function (card) {
      if (card.x + card.width < 0 || card.x > self.canvasWidth) return;
      self._renderCard(card);
    });
  };

  /* 카드 하나: 둥근 사각형으로 클리핑 후, 16:9 박스에 cover 로 맞춘 이미지를 카드 중앙에 그림 */
  SqueezyImagesCanvas.prototype._renderCard = function (card) {
    var img = card.img;
    var ctx = this.ctx;
    if (!img || !img.naturalWidth) {
      this._renderPlaceholderCard(card);
      return;
    }
    ctx.save();
    this._setFullHeightRoundedRectClip(card.x, card.width);

    var ratio = img.naturalWidth / img.naturalHeight;
    var drawW, drawH, fitX, fitY;
    if (ratio > this.imageWidth / this.canvasHeight) {
      drawH = this.canvasHeight;
      drawW = this.canvasHeight * ratio;
      fitX = (this.imageWidth - drawW) / 2;
      fitY = 0;
    } else {
      drawW = this.imageWidth;
      drawH = this.imageWidth / ratio;
      fitX = 0;
      fitY = (this.canvasHeight - drawH) / 2;
    }
    var drawX = fitX + (card.x + card.width / 2 - drawW / 2) - card.collapsedOffsetX;
    ctx.drawImage(img, drawX, fitY, drawW, drawH);
    this._strokeCardOutline(card.x, card.width);
    ctx.restore();
  };

  /* 이미지가 없거나 아직 로드되지 않은 카드: 어두운 타일 + 제목 한 줄 */
  SqueezyImagesCanvas.prototype._renderPlaceholderCard = function (card) {
    var ctx = this.ctx;
    var h = this.canvasHeight;
    ctx.save();
    this._setFullHeightRoundedRectClip(card.x, card.width);
    ctx.fillStyle = CONFIG.placeholderColor;
    ctx.fillRect(card.x, 0, card.width, h);
    if (card.title && card.width > 160) {
      var pad = 20;
      ctx.font = CONFIG.placeholderFont;
      ctx.fillStyle = CONFIG.placeholderTextColor;
      ctx.textBaseline = 'alphabetic';
      var text = card.title;
      var maxW = card.width - pad * 2;
      if (ctx.measureText(text).width > maxW) {
        while (text.length > 1 && ctx.measureText(text + '…').width > maxW) text = text.slice(0, -1);
        text += '…';
      }
      ctx.fillText(text, card.x + pad, h - pad);
    }
    this._strokeCardOutline(card.x, card.width);
    ctx.restore();
  };

  SqueezyImagesCanvas.prototype._fullHeightRoundedRectPath = function (x, w) {
    var h = this.canvasHeight;
    var r = clamp(CONFIG.borderRadius, 0, Math.min(w, h) / 2);
    var p = new Path2D();
    p.moveTo(x + r, 0);
    p.lineTo(x + w - r, 0);
    p.arcTo(x + w, 0, x + w, r, r);
    p.lineTo(x + w, h - r);
    p.arcTo(x + w, h, x + w - r, h, r);
    p.lineTo(x + r, h);
    p.arcTo(x, h, x, h - r, r);
    p.lineTo(x, r);
    p.arcTo(x, 0, x + r, 0, r);
    p.closePath();
    return p;
  };

  SqueezyImagesCanvas.prototype._setFullHeightRoundedRectClip = function (x, w) {
    this.ctx.clip(this._fullHeightRoundedRectPath(x, w));
  };

  /* 클립 안쪽으로만 보이도록 선폭을 두 배로 그려 실제로는 cardOutlineWidth 만큼만 보이게 함 */
  SqueezyImagesCanvas.prototype._strokeCardOutline = function (x, w) {
    if (!CONFIG.cardOutlineWidth) return;
    var ctx = this.ctx;
    ctx.strokeStyle = CONFIG.cardOutlineColor;
    ctx.lineWidth = CONFIG.cardOutlineWidth * 2;
    ctx.stroke(this._fullHeightRoundedRectPath(x, w));
  };

  /* ---------- 네비게이션 ---------- */
  SqueezyImagesCanvas.prototype.gotoPrev = function (steps) {
    var n = this.canvasImages.length;
    if (!n) return;
    for (var s = 0; s < steps; s++) {
      var itemIndex = (this.cards[0].itemIndex - 1 + n) % n;
      this.cards.unshift({
        itemIndex: itemIndex,
        img: this.canvasImages[itemIndex].imageElement,
        title: this.itemTitles[itemIndex],
        x: 0,
        collapsedOffsetX: 0,
        width: CONFIG.smallCardWidth,
        leftGap: CONFIG.largeCardGap,
        columnIndex: 0
      });
    }
    var self = this;
    this.cards.forEach(function (card, i) { card.columnIndex = i + self.columnIndexOffset; });
    this._startCarouselAnimation(steps);
  };

  SqueezyImagesCanvas.prototype.gotoNext = function (steps) {
    var n = this.canvasImages.length;
    if (!n) return;
    for (var s = 0; s < steps; s++) {
      var itemIndex = (this.cards[this.cards.length - 1].itemIndex + 1) % n;
      this.cards.push({
        itemIndex: itemIndex,
        img: this.canvasImages[itemIndex].imageElement,
        title: this.itemTitles[itemIndex],
        x: 0,
        collapsedOffsetX: this.itemsCollapsedOffsetX[itemIndex],
        width: CONFIG.smallCardWidth,
        leftGap: CONFIG.smallCardGap,
        columnIndex: 0
      });
    }
    this.columnIndexOffset -= steps;
    var self = this;
    this.cards.forEach(function (card, i) { card.columnIndex = i + self.columnIndexOffset; });
    this._startCarouselAnimation(0);
  };

  /* 현재 상태를 시작값으로, columnIndex 기준 폭/간격/오프셋을 목표값으로 잡고 보간 시작 */
  SqueezyImagesCanvas.prototype._startCarouselAnimation = function (prependedCount) {
    var step = CONFIG.smallCardWidth + CONFIG.largeCardGap; // 24px
    this.animationStartCardsOffsetX = this.cardsOffsetX - prependedCount * step;
    this.targetCardsOffsetX = this.columnIndexOffset * step;
    this.animationStartMediumCardsWidthOffset = this.mediumCardsWidthOffset;
    this.targetMediumCardsWidthOffset =
      (!this.prefersReducedMotion && this.hoveredCardIndex > 3) ? CONFIG.smallCardHoverOffset : 0;

    var self = this;
    this.cards.forEach(function (card) {
      var ci = card.columnIndex;
      card.animationStartCollapsedOffsetX = card.collapsedOffsetX;
      card.animationStartWidth = card.width;
      card.animationStartLeftGap = card.leftGap;
      card.targetCollapsedOffsetX = ci === 0 ? 0 : self.itemsCollapsedOffsetX[card.itemIndex];
      card.targetWidth = self._getCardWidth(ci);
      card.targetLeftGap = ci < 4 ? CONFIG.largeCardGap : CONFIG.smallCardGap;
    });

    this.animationStartAt = performance.now();
    if (this.animationRequestId) cancelAnimationFrame(this.animationRequestId);
    this.animationRequestId = requestAnimationFrame(this.animate);
  };

  SqueezyImagesCanvas.prototype._animate = function (now) {
    var t = Math.min((now - this.animationStartAt) / this.animationDuration, 1);
    var e = easeOutExpo(t);
    this.cardsOffsetX = lerp(this.animationStartCardsOffsetX, this.targetCardsOffsetX, e);
    this.mediumCardsWidthOffset = lerp(this.animationStartMediumCardsWidthOffset, this.targetMediumCardsWidthOffset, e);
    this.cards.forEach(function (card) {
      card.collapsedOffsetX = lerp(card.animationStartCollapsedOffsetX, card.targetCollapsedOffsetX, e);
      card.width = lerp(card.animationStartWidth, card.targetWidth, e);
      card.leftGap = lerp(card.animationStartLeftGap, card.targetLeftGap, e);
    });
    this._renderGridCards();
    if (e < 1) {
      this.animationRequestId = requestAnimationFrame(this.animate);
    } else {
      this.animationRequestId = 0;
      this._onAnimationComplete();
    }
  };

  /* 애니메이션 종료: columnIndex 0 부터 7장만 남기고 오프셋 초기화 */
  SqueezyImagesCanvas.prototype._onAnimationComplete = function () {
    var first = 0;
    for (var i = 0; i < this.cards.length; i++) {
      if (this.cards[i].columnIndex === 0) { first = i; break; }
    }
    this.cards = this.cards.slice(first, first + CONFIG.visibleCards);
    this.columnIndexOffset = 0;
    this.cardsOffsetX = 0;
    this._renderGridCards();
  };

  SqueezyImagesCanvas.prototype.dispose = function () {
    if (this.animationRequestId) cancelAnimationFrame(this.animationRequestId);
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.canvasElement.width = 0;
    this.canvasElement.height = 0;
    this.canvasImages.forEach(function (img) {
      img.imageElement.onload = null;
      img.imageElement.onerror = null;
      img.imageElement.src = '';
    });
    this.canvasElement.removeEventListener('mouseenter', this.updateHoverIndex);
    this.canvasElement.removeEventListener('mousemove', this.updateHoverIndex);
    this.canvasElement.removeEventListener('mouseleave', this.resetHoverIndex);
    this.canvasElement.removeEventListener('click', this.onCanvasClick);
    document.removeEventListener('visibilitychange', this.renderGridCards);
  };

  global.SqueezyImagesCanvas = SqueezyImagesCanvas;
})(window);
