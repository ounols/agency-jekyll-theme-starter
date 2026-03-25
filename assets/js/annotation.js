(function () {
  var globalPopup = document.createElement('span');
  globalPopup.className = 'note-popup';
  document.body.appendChild(globalPopup);

  function move(e) {
    var x = e.clientX + 18;
    var y = e.clientY - globalPopup.offsetHeight / 2;

    if (x + globalPopup.offsetWidth > window.innerWidth - 8)
      x = e.clientX - globalPopup.offsetWidth - 10;
    if (y + globalPopup.offsetHeight > window.innerHeight - 8)
      y = window.innerHeight - globalPopup.offsetHeight - 8;

    globalPopup.style.left = x + 'px';
    globalPopup.style.top = Math.max(8, y) + 'px';
  }

  document.querySelectorAll('.note-trigger').forEach(function (trigger) {
    var source = trigger.querySelector('.note-source');
    if (!source) return;

    trigger.addEventListener('mouseenter', function () {
      globalPopup.innerHTML = source.innerHTML;
      globalPopup.classList.add('active');
    });
    trigger.addEventListener('mousemove', move);
    trigger.addEventListener('mouseleave', function () {
      globalPopup.classList.remove('active');
    });
  });

  window.NotePopup = {
    show: function (content) {
      globalPopup.innerHTML = content;
      globalPopup.classList.add('active');
    },
    refresh: function (content) {
      globalPopup.innerHTML = content;
    },
    hide: function () {
      globalPopup.classList.remove('active');
    }
  };
})();
