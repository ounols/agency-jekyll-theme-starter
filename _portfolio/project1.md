---
title: CSEngine - 자체 개발 크로스 플랫폼 3D 게임 엔진
subtitle: 자체 개발 크로스 플랫폼 실시간 3D 게임 엔진
image: assets/img/portfolio/01-full.jpg
alt: CSEngine Demo Scene

caption:
  title: CSEngine
  subtitle: <span class="section-subheading">자체 개발 크로스 플랫폼 실시간 3D 게임 엔진</span>
  thumbnail: assets/img/portfolio/01-thumbnail.jpg
---

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>

## 간단 소개

<div class="row d-flex justify-content-center">
  <div class="col-sm-4">
      <div class="team-member">
      <img class="mx-auto rounded-circle" src="assets/img/timeline/1.jpg" alt="">
      <h3>C++ & OpenGL 엔진</h3>
      <p class="text-muted">개인 개발 3D 게임 엔진</p>
      </div>
  </div>

  <div class="col-sm-4">
      <div class="team-member">
      <img class="mx-auto rounded-circle" src="assets/img/timeline/2.jpg" alt="">
      <h3>크로스 플랫폼</h3>
      <p class="text-muted">멀티 플랫폼 지원</p>
      </div>
  </div>

  <div class="col-sm-4">
      <div class="team-member">
      <img class="mx-auto rounded-circle" src="assets/img/timeline/3.jpg" alt="">
      <h3>모듈화</h3>
      <p class="text-muted">엔진의 모듈화 구조</p>
      </div>
  </div>
</div>

저의 프로젝트와 개발하며 느꼈던 경험부터,<br/>
구현 기능에 대한 작업 내역은 아래의 링크에서 확인하실 수 있습니다.
<div class="project-links text-center mb-5">
  <a href="https://github.com/ounols/CSEngine" class="section-subheading btn btn-outline-dark m-2">
    <i class="fab fa-github"></i> GitHub 프로젝트
  </a>
  <a href="https://ounols.kr/categories/%EC%9E%90%EC%B2%B4-%EA%B2%8C%EC%9E%84-%EC%97%94%EC%A7%84-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8" class="section-subheading btn btn-outline-danger m-2">
    <i class="fa-solid fa-pen-nib"></i> 기술 블로그
  </a>
  <a href="https://doc-engine.ounols.kr" class="section-subheading btn btn-outline-primary m-2">
    <i class="fas fa-book"></i> API 문서
  </a>
  <a href="https://ounols.github.io/CSEngine-Demo" class="section-subheading btn btn-outline-success m-2">
    <i class="fas fa-play"></i> 웹 데모
  </a>
</div>

---

## 프로젝트 구조

<div class="row">
  <div class="col-md-6 mb-4">
    <div class="card h-100">
      <div class="card-body">
        <h4 class="card-title">📚 개발 배경 & 의도</h4>
        <p class="card-text">게임 엔진을 직접 만들어 본 경험, 기술 성장 및 자기 주도 개발의 동기를 소개</p>
        <a href="https://velog.io/@ounols/Cpp%EB%A1%9C-%EC%A0%9C%EC%9E%91%ED%95%98%EB%8A%94-%ED%81%AC%EB%A1%9C%EC%8A%A4%ED%94%8C%EB%9E%AB%ED%8F%BC-%EA%B2%8C%EC%9E%84%EC%97%94%EC%A7%84-%EC%A0%9C%EC%9E%91%EA%B8%B0" 
           class="section-subheading btn btn-outline-primary">자세히 보기 →</a>
      </div>
    </div>
  </div>
  <div class="col-md-6 mb-4">
    <div class="card h-100">
      <div class="card-body">
        <h4 class="card-title">🔧 엔진 아키텍처</h4>
        <p class="card-text">모듈 기반 구조 (렌더러, 애니메이터, 씬/프리팹, 스크립트, 플랫폼 핸들링 등) 로직</p>
        <a href="https://pofo.ounols.kr/%EC%97%94%EC%A7%84-%EA%B5%AC%EC%A1%B0" 
           class="section-subheading btn btn-outline-primary">구조 살펴보기 →</a>
      </div>
    </div>
  </div>
</div>

---

## 주요 기능 요약

<div id="featureCarousel" class="carousel carousel-dark slide mb-5" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#featureCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="렌더링"></button>
    <button type="button" data-bs-target="#featureCarousel" data-bs-slide-to="1" aria-label="애니메이션"></button>
    <button type="button" data-bs-target="#featureCarousel" data-bs-slide-to="2" aria-label="프리팹 & 씬"></button>
    <button type="button" data-bs-target="#featureCarousel" data-bs-slide-to="3" aria-label="커스텀 스크립트"></button>
    <button type="button" data-bs-target="#featureCarousel" data-bs-slide-to="4" aria-label="크로스 플랫폼"></button>
  </div>
  <div class="carousel-inner">

    <div class="carousel-item active" data-bs-interval="5000">
      <img src="assets/img/portfolio/01-full.jpg" class="d-block mx-auto" alt="렌더링">
      <div class="carousel-caption d-none d-md-block">
        <h5>렌더링</h5>
        <p><b>PBR</b>, <b>프레임버퍼</b>, <b>디퍼드 렌더링</b> 기반 구현</p>
        <a href="https://ounols.kr/posts/CSEngine-%EB%A0%8C%EB%8D%94%EB%A7%81" class="btn btn-info">자세히 보기 →</a>
      </div>
    </div>

    <div class="carousel-item" data-bs-interval="5000">
      <img src="assets/img/timeline/1.jpg" class="d-block mx-auto" alt="애니메이션">
      <div class="carousel-caption d-none d-md-block">
        <h5>애니메이션</h5>
        <p><b>스켈레탈 스킨닝</b>, <b>타임라인 애니메이션</b> 지원</p>
        <a href="https://ounols.kr/posts/CSEngine-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98" class="btn btn-info">자세히 보기 →</a>
      </div>
    </div>

    <div class="carousel-item" data-bs-interval="5000">
      <img src="assets/img/timeline/1.jpg" class="d-block mx-auto" alt="프리팹 & 씬">
      <div class="carousel-caption d-none d-md-block">
        <h5>프리팹 & 씬</h5>
        <p><b>객체 복제</b>, <b>프리팹 시스템</b>, <b>씬 파일 직렬화</b> 지원</p>
        <a href="https://pofo.ounols.kr/%ED%8C%A9%EB%A7%A8-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85" class="btn btn-info">자세히 보기 →</a>
      </div>
    </div>

    <div class="carousel-item" data-bs-interval="5000">
      <img src="assets/img/timeline/1.jpg" class="d-block mx-auto" alt="커스텀 스크립트">
      <div class="carousel-caption d-none d-md-block">
        <h5>커스텀 스크립트</h5>
        <p><b>Squirrel Script</b> 기반, <b>런타임 스크립팅</b> 및 컴파일</p>
        <a href="https://pofo.ounols.kr/%ED%8C%A9%EB%A7%A8-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85" class="btn btn-info">자세히 보기 →</a>
      </div>
    </div>

    <div class="carousel-item" data-bs-interval="5000">
      <img src="assets/img/timeline/1.jpg" class="d-block mx-auto" alt="크로스 플랫폼">
      <div class="carousel-caption d-none d-md-block">
        <h5>크로스 플랫폼</h5>
        <p><b>Windows</b>, <b>Linux</b>, <b>Android</b>, <b>macOS</b>, <b>WebGL</b> 등 지원</p>
        <a href="https://pofo.ounols.kr/%ED%8C%A9%EB%A7%A8-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85" class="btn btn-info">자세히 보기 →</a>
      </div>
    </div>

  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#featureCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">이전</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#featureCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">다음</span>
  </button>
</div>


---

## 데모 & 프로토타입

<div class="row d-flex justify-content-center">
  <div class="col-sm-6">
      <div class="team-member">
      <img class="mx-auto rounded-circle" src="assets/img/timeline/4.jpg" alt="">
      <h3>팩맨 프로토타입</h3>
      <p class="text-muted">FSM 기반 고스트 AI 및 길찾기 시스템 테스트</p>
      <a href="https://pofo.ounols.kr/%ED%8C%A9%EB%A7%A8-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85" class="section-subheading btn btn-primary">팩맨 데모 보기</a>
      </div>
  </div>

  <div class="col-sm-6">
      <div class="team-member">
      <img class="mx-auto rounded-circle" src="assets/img/timeline/5.jpg" alt="">
      <h3>모여다오 프로젝트</h3>
      <p class="text-muted">NFT 컨셉 기반 3D 씬 활용</p>
      <a href="https://pofo.ounols.kr/moyodao-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8" class="section-subheading btn btn-primary">모여다오 데모 보기</a>
      </div>
  </div>
</div>

---

## 개발 환경 & 기술 스택

<div class="tech-stack py-4">
  <div class="row text-center">
    <div class="col-md-3 col-sm-6 mb-4">
      <div class="tech-item">
        <i class="fas fa-code fa-2x mb-2"></i>
        <h5>언어 / 빌드</h5>
        <p>C++14 이상, CMake 3.15 이상, MSVC/GCC/Clang</p>
      </div>
    </div>
    <div class="col-md-3 col-sm-6 mb-4">
      <div class="tech-item">
        <i class="fas fa-desktop fa-2x mb-2"></i>
        <h5>그래픽 API</h5>
        <p>OpenGL Core 3.3+, ES 3.0+, GLSL</p>
      </div>
    </div>
    <div class="col-md-3 col-sm-6 mb-4">
      <div class="tech-item">
        <i class="fas fa-mobile-alt fa-2x mb-2"></i>
        <h5>타겟 플랫폼</h5>
        <p>x86_64, ARM (v7/v8)</p>
      </div>
    </div>
    <div class="col-md-3 col-sm-6 mb-4">
      <div class="tech-item">
        <i class="fas fa-puzzle-piece fa-2x mb-2"></i>
        <h5>종속성</h5>
        <p>GLEW, GLFW, stb_image, IMGUI, Squirrel, ZIP 라이브러리 등</p>
      </div>
    </div>
  </div>
</div>

---

## ✅ 개발 현황 및 계획

진행 중인 작업, 구현 예정 기능, TODO 리스트가 별도 페이지에 정리되어 있음  
👉 [개발 현황 & TODO](https://pofo.ounols.kr/CSEngine) *(메인 페이지 내 링크 포함)*

