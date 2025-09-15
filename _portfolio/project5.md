---
title: "보훈 메타버스 - 대규모 배경 최적화"
subtitle: 모바일 웹 브라우저로 돌아가는 보훈 메타버스 프로젝트의 대규모 배경 최적화를 담당
# image: assets/img/portfolio/h-1.png
# alt: 

caption:
  title: "[회사] 보훈 메타버스"
  subtitle: 모바일 WebGL의 구동을 목표로 대규모 배경의 최적화
  thumbnail: assets/img/portfolio/b/b.png
---

## 프로젝트 소개

<div class="d-flex justify-content-center align-items-center gap-3 flex-nowrap">
  <img class="img-fluid" src="assets/img/portfolio/b/b-1.png" alt="" style="max-height: 300px; max-width: 45%; object-fit: contain; flex-shrink: 1;">
  <img class="img-fluid" src="assets/img/portfolio/b/b-2.png" alt="" style="max-height: 300px; max-width: 45%; object-fit: contain; flex-shrink: 1;">
</div>

보훈 메타버스 프로젝트에서 메타버스의 대규모 배경 제작 관련 팀에 속했었고, 그 곳에서 쉐이더 제작 및 최적화를 담당하였습니다.

<div class="project-links text-center mb-5">
  <a href="https://mpva.kr" target="_blank" class="section-subheading btn btn-outline-success m-2">
    <i class="fas fa-play"></i> 공식 홈페이지 (로그인 필요)
  </a>
</div>

-----

## 담당 파트

<div class="container">
  <div class="media mb-4 align-items-start text-left">
    <div class="media-body">
      <h3 class="text-left">배경 최적화</h3>
      <ul class="text-left mb-1" style="padding-left:1em;">
        <li>
          WebGL 모바일 타겟 최적화 (RAM 700MB 미만, 50fps 이상 목표)
        </li>
        <li class="mt-2">
          모델링 폴리곤 최적화: 60~80% 버텍스 수 감소로 50MB 메모리 절약
        </li>
        <li class="mt-2">
          WebGL용 커스텀 쉐이더 제작 및 최적화
        </li>
        <li class="mt-2">
          텍스쳐 최적화: 1024x1024 크기 제한 및 용량 최적화
        </li>
        <li class="mt-2">
          드로우콜 최적화: SRP 배칭, GPU 인스턴싱, 라이트맵 활용
        </li>
      </ul>
    </div>
  </div>
</div>

-----

## 프로젝트 특징

이 프로젝트는 **모바일 타겟으로 WebGL로 구동되는 웹 브라우저**에서 돌려야 한다는 특징을 가지고 있습니다.

<ul class="text-left mb-1" style="padding-left:1em;">
  <li>
    <b>타겟 플랫폼</b>: 모바일 웹 브라우저 (WebGL)
  </li>
  <li class="mt-2">
    <b>성능 목표</b>: RAM 700MB 미만, 50fps 이상 (iPhone SE3, 갤럭시 플립3 기준)
  </li>
  <li class="mt-2">
    <b>최적화 필요성</b>: 모바일 웹 환경의 제약으로 인한 대폭적인 성능 최적화 요구
  </li>
</ul>

-----

## 주요 최적화 작업

<div class="container">
  <div class="media mb-4 align-items-start text-left">
    <div class="media-body">
      <h3 class="text-left">모델링 폴리곤 최적화</h3>
      <ul class="text-left mb-1" style="padding-left:1em;">
        <li>
          <b>버텍스 수 감소</b>: 동상, 식생 등 시각적 차이가 적은 오브젝트 60~80% 최적화
        </li>
        <li class="mt-2">
          <b>작업 협업</b>: 건물 등 복잡한 모델링은 작업자와 협업하여 수정 진행
        </li>
        <li class="mt-2">
          <b>메모리 절약</b>: 약 50MB 메모리 사용량 감소 달성
        </li>
      </ul>
    </div>
  </div>

  <div class="media mb-4 align-items-start text-left">
    <div class="media-body">
      <h3 class="text-left">WebGL용 쉐이더 최적화</h3>
      <ul class="text-left mb-1" style="padding-left:1em;">
        <li>
          <b>데스크톱 전용 쉐이더 수정</b>: 식생 및 포스트 프로세싱 쉐이더 WebGL 호환 작업
        </li>
        <li class="mt-2">
          <b>연산 최적화</b>: 쉐이더 코드 단순화 및 성능 향상
        </li>
        <li class="mt-2">
          <b>URP DOTS 지원</b>: GPU 프로세싱 최적화를 위한 전처리기 및 uniform 변수 정리
        </li>
      </ul>
    </div>
  </div>

  <div class="media mb-4 align-items-start text-left">
    <div class="media-body">
      <h3 class="text-left">텍스쳐 최적화</h3>
      <ul class="text-left mb-1" style="padding-left:1em;">
        <li>
          <b>크기 제한</b>: 최대 1024x1024 크기로 통일
        </li>
        <li class="mt-2">
          <b>선별적 압축</b>: 원경, 디테일이 적은 오브젝트, 노멀맵 등 대상별 차등 최적화
        </li>
        <li class="mt-2">
          <b>용량 절약</b>: 4GB 초과 문제 해결을 통한 RAM 사용량 대폭 감소
        </li>
      </ul>
    </div>
  </div>

  <div class="media mb-4 align-items-start text-left">
    <div class="media-body">
      <h3 class="text-left">드로우콜 최적화</h3>
      <ul class="text-left mb-1" style="padding-left:1em;">
        <li>
          <b>배칭 전략</b>: 폴리곤 수에 따른 SRP 배칭과 GPU 인스턴싱 선택적 적용
        </li>
        <li class="mt-2">
          <b>쉐이더 수정</b>: 디테일이 많은 오브젝트의 GPU 인스턴싱 지원
        </li>
        <li class="mt-2">
          <b>그림자 최적화</b>: 실시간 그림자와 경량화 라이트맵의 혼합 사용
        </li>
        <li class="mt-2">
          <b>웹 환경 대응</b>: 데스크톱과 웹 빌드 간 드로우콜 차이 해결
        </li>
      </ul>
    </div>
  </div>
</div>