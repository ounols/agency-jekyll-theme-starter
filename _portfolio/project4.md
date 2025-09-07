---
title: "Smart Worktainment System - B2B 게임 프로젝트"
subtitle: H 자동차 기업의 스마트 팩토리 작업자 효율 향상 게이미피케이션 시스템
#image: assets/img/portfolio/h-1.png
alt: 
caption:
  title: "[회사] Smart Worktainment"
  subtitle: H사 스마트 팩토리 게이미피케이션 프로젝트
  thumbnail: assets/img/portfolio/h.png
---

## 프로젝트 소개

<div class="d-flex justify-content-center align-items-center gap-3 flex-nowrap">
  <img class="img-fluid" src="assets/img/portfolio/h-1.png" alt="" style="max-height: 300px; max-width: 45%; object-fit: contain; flex-shrink: 1;">
  <img class="img-fluid" src="assets/img/portfolio/h-3.png" alt="" style="max-height: 300px; max-width: 45%; object-fit: contain; flex-shrink: 1;">
</div>

H 자동차 기업의 차량 조립 공정에서 작업자의 업무 효율을 증진시키기 위한 게이미피케이션 개발 프로젝트입니다. 작업자가 열심히 일할수록 더 많은 보상을 받고, 수집한 재료로 다양한 차량을 제작하며 재미를 느낄 수 있는 선순환 구조를 구축했습니다.

-----

## 시스템 구성

<img class="img-fluid d-block mx-auto" src="assets/img/portfolio/h-2.png" alt="">

<ul class="text-left mb-1" style="padding-left:1em;">
  <li>
    <b>셀 디스플레이</b>: 조립공정 셀의 데스크탑에서 실행되는 클라이언트
  </li>
  <li class="mt-2">
    <b>모바일 앱</b>: Android/iOS 지원, 개인 차량 커스터마이징
  </li>
  <li class="mt-2">
    <b>관리자 웹</b>: 보상 기준 설정 및 게임 운영 관리
  </li>
  <li class="mt-2">
    <b>실시간 연동</b>: 공장 관리 시스템과 연동하여 실제 작업 결과 반영
  </li>
</ul>

-----

## 담당 파트

<div class="container">
  <div class="media mb-4 align-items-start text-left">
    <div class="media-body">
      <h3 class="text-left">백엔드 시스템</h3>
      <ul class="text-left mb-1" style="padding-left:1em;">
        <li>
          <b>서버 아키텍처 설계</b>: 공기업 Spring Boot 기반 게임 서버 구축
        </li>
        <li class="mt-2">
          <b>실시간 데이터 처리</b>: 공장 시스템과의 API 연동 및 데이터 동기화
        </li>
        <li class="mt-2">
          <b>DB의 Batch 로직 구현</b>: Tibero 기반의 데이터를 Batch를 통해 정리 후 여러 프로젝트에 적용 및 기여
        </li>
        <li class="mt-2">
          <b>게임 로직 서버</b>: 보상 계산, 크래프팅, 차량 조립 시스템 구현
        </li>
      </ul>
    </div>
  </div>

  <div class="media mb-4 align-items-start text-left">
    <div class="media-body">
      <h3 class="text-left">클라이언트 렌더링 최적화</h3>
      <ul class="text-left mb-1" style="padding-left:1em;">
        <li>
          <b>커스텀 오클루전 컬링 시스템</b>: Unity 기본 청크 시스템의 바이너리 탐색 방식을 대체하여 CPU 오버헤드 대폭 감소
        </li>
        <li class="mt-2">
          <b>구역별 로딩 최적화</b>: 콜리전 및 시점 트리거 기반으로 필요한 청크만 선별적 로딩하여 메모리 사용량 최적화
        </li>
        <li class="mt-2">
          <b>GPU 인스턴싱 적용</b>: 중복되는 3D 오브젝트(차량 부품, 환경 요소)에 대한 GPU Instancing으로 드로우콜 최적화
        </li>
        <li class="mt-2">
          <b>동적 LOD 시스템</b>: 카메라 거리에 따른 자동 디테일 조절로 렌더링 성능 향상
        </li>
      </ul>
    </div>
  </div>

  <div class="media mb-4 align-items-start text-left">
    <div class="media-body">
      <h3 class="text-left">CI/CD 및 배포 자동화</h3>
      <ul class="text-left mb-1" style="padding-left:1em;">
        <li>
          <b>폐쇄망에서의 CI/CD 적용</b>: H사 폐쇄망에 적용된 VM 인스턴싱과 CI/CD를 적용하여 공정에서 실제 작업중인 작업자의 스마트폰 앱까지 배포 자동화 적용
        </li>
        <li class="mt-2">
          <b>무중단 업데이트</b>: 생산라인 중단 없이 시스템 업데이트 가능한 배포 전략
        </li>
      </ul>
    </div>
  </div>
</div>

-----

## 핵심 게이미피케이션 요소

<div class="container">
  <div class="media mb-4 align-items-start text-left">
    <div class="media-body">
      <h3 class="text-left">성과 기반 보상 시스템</h3>
      <ul class="text-left mb-1" style="padding-left:1em;">
        <li>
          <b>작업 효율 측정</b>: 실시간 작업 데이터 기반 성과 평가
        </li>
        <li class="mt-2">
          <b>차등 보상</b>: 작업 품질과 속도에 따른 게임 내 보상 차등 지급
        </li>
        <li class="mt-2">
          <b>즉시 피드백</b>: 작업 완료 직후 시각적 보상 제공
        </li>
      </ul>
    </div>
  </div>

  <div class="media mb-4 align-items-start text-left">
    <div class="media-body">
      <h3 class="text-left">차량 수집 및 커스터마이징</h3>
      <ul class="text-left mb-1" style="padding-left:1em;">
        <li>
          <b>순차적 조립</b>: 실제 차량 조립과 유사한 단계별 부품 장착
        </li>
        <li class="mt-2">
          <b>다양한 등급</b>: 여러 등급의 부품과 차별화된 시각 효과
        </li>
        <li class="mt-2">
          <b>크래프팅 시스템</b>: 재료 조합을 통한 새로운 부품 획득
        </li>
      </ul>
    </div>
  </div>

  <div class="media mb-4 align-items-start text-left">
    <div class="media-body">
      <h3 class="text-left">글로벌 적용 사례</h3>
      <ul class="text-left mb-1" style="padding-left:1em;">
        <li>
          <b>싱가포르 스마트 팩토리</b>: 현지 문화와 랜드마크를 반영한 게임 맵 제작
        </li>
        <li class="mt-2">
          <b>현지화 대응</b>: 다국어 지원 및 지역별 맞춤 콘텐츠
        </li>
        <li class="mt-2">
          <b>확장성</b>: 다양한 공정라인에 적용 가능한 모듈형 설계
        </li>
      </ul>
    </div>
  </div>
</div>

-----

## 기술적 성과

<div class="container">
  <div class="media mb-4 align-items-start text-left">
    <div class="media-body">
      <h3 class="text-left">성능 최적화 결과</h3>
      <ul class="text-left mb-1" style="padding-left:1em;">
        <li>
          <b>렌더링 성능</b>: 커스텀 오클루전 컬링으로 CPU 사용률 40% 감소
        </li>
        <li class="mt-2">
          <b>메모리 효율</b>: 구역별 로딩으로 메모리 사용량 30% 최적화
        </li>
        <li class="mt-2">
          <b>GPU 성능</b>: 인스턴싱 적용으로 드로우콜 60% 감소
        </li>
        <li class="mt-2">
          <b>안정성</b>: 24/7 무중단 운영을 위한 견고한 시스템 구축
        </li>
      </ul>
    </div>
  </div>

  <div class="media mb-4 align-items-start text-left">
    <div class="media-body">
      <h3 class="text-left">산업용 특화 기술</h3>
      <ul class="text-left mb-1" style="padding-left:1em;">
        <li>
          <b>실시간 시스템 연동</b>: 생산라인과의 끊김없는 데이터 교환
        </li>
        <li class="mt-2">
          <b>장애 복구</b>: 자동 장애 감지 및 복구 시스템
        </li>
        <li class="mt-2">
          <b>확장 가능한 아키텍처</b>: 추가 공정라인 도입 시 손쉬운 확장
        </li>
      </ul>
    </div>
  </div>
</div>

-----

## 사용 기술

<ul class="text-left mb-1" style="padding-left:1em;">
  <li>
    <b>게임 엔진</b>: Unity 3D (커스텀 렌더링 파이프라인)
  </li>
  <li class="mt-2">
    <b>백엔드</b>: Node.js, Express, MySQL
  </li>
  <li class="mt-2">
    <b>플랫폼</b>: Windows (Cell Display), Android/iOS (Mobile)
  </li>
  <li class="mt-2">
    <b>최적화</b>: 커스텀 오클루전 컬링, GPU Instancing, 동적 LOD
  </li>
  <li class="mt-2">
    <b>배포</b>: Jenkins CI/CD, Docker, 무중단 배포
  </li>
  <li class="mt-2">
    <b>모니터링</b>: 실시간 성능 모니터링 및 장애 대응 시스템
  </li>
</ul>