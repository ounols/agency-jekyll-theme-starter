---
title: CSEngine - 자체 개발 크로스 플랫폼 3D 게임 엔진
subtitle: subtitle lorem ipsum dolor sit amet consectetur.
image: assets/img/portfolio/01-full.jpg
alt: Shirts on a hanger

caption:
  title: CSEngine
  subtitle: 자체 개발 크로스 플랫폼 실시간 3D 게임 엔진
  thumbnail: assets/img/portfolio/01-thumbnail.jpg
---
## 간단 소개

|||
|:------:|:------:|
| ![](assets/img/timeline/1.jpg){:.mx-auto .rounded-circle} | **C++ & OpenGL 기반의<br/> 개인 개발 3D 게임 엔진** |
| ![](assets/img/timeline/2.jpg){:.mx-auto .rounded-circle} | **크로스 플랫폼 지원** |
| ![](assets/img/timeline/3.jpg){:.mx-auto .rounded-circle} | **엔진의 모듈화 구조** |
{:.col-lg-8 .mx-auto}

---

## 프로젝트 구조

### **개발 배경 & 의도**  
게임 엔진을 직접 만들어 본 경험, 기술 성장 및 자기 주도 개발의 동기를 소개  
👉 [왜 엔진을 만들게 되었나요?](https://velog.io/@ounols/Cpp%EB%A1%9C-%EC%A0%9C%EC%9E%91%ED%95%98%EB%8A%94-%ED%81%AC%EB%A1%9C%EC%8A%A4%ED%94%8C%EB%9E%AB%ED%8F%BC-%EA%B2%8C%EC%9E%84%EC%97%94%EC%A7%84-%EC%A0%9C%EC%9E%91%EA%B8%B0)

### **엔진 아키텍처**  
모듈 기반 구조 (렌더러, 애니메이터, 씬/프리팹, 스크립트, 플랫폼 핸들링 등) 로직  
👉 [자세한 구조 보기](https://pofo.ounols.kr/%EC%97%94%EC%A7%84-%EA%B5%AC%EC%A1%B0)

---

## 주요 기능 요약

| ![](assets/img/timeline/1.jpg){:.mx-auto .rounded-circle} | ![](assets/img/timeline/1.jpg){:.mx-auto .rounded-circle} | ![](assets/img/timeline/1.jpg){:.mx-auto .rounded-circle} | ![](assets/img/timeline/1.jpg){:.mx-auto .rounded-circle} | ![](assets/img/timeline/1.jpg){:.mx-auto .rounded-circle} |
|------|------|------|------|------|
| **렌더링**{:.h2} | **애니메이션** | **프리팹 & 씬** | **커스텀 스크립트** | **크로스 플랫폼** |
{:.img-fluid .d-block .mx-auto}

| 기능 | 설명 |
|------|------|
| **렌더링** | PBR, 프레임버퍼, 디퍼드 렌더링 기반 구현<br>👉 [렌더링 세부](https://pofo.ounols.kr/%EB%A0%8C%EB%8D%94%EB%A7%81) |
| **애니메이션** | 스켈레탈 스킨닝, 타임라인 애니메이션 지원<br>👉 [애니메이션 세부](https://pofo.ounols.kr/%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98) |
| **프리팹 & 씬** | 객체 복제, 프리팹 시스템, 씬 파일 직렬화 지원<br>👉 [프리팹/씬 설명](https://pofo.ounols.kr/%ED%94%84%EB%A6%AC%ED%8C%B9-%EC%94%AC-%EA%B0%9C%EB%85%90) |
| **커스텀 스크립트** | Squirrel Script 기반, 런타임 스크립팅 및 컴파일<br>👉 [스크립팅 세부](https://pofo.ounols.kr/%EC%BB%A4%EC%8A%A4%ED%85%80-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8) |
| **크로스 플랫폼** | Windows, Linux, Android, macOS, WebGL 등 지원<br>👉 [플랫폼 지원](https://pofo.ounols.kr/%ED%81%AC%EB%A1%9C%EC%8A%A4-%ED%94%8C%EB%9E%AB%ED%8F%BC) |

---

## 🎮 데모 & 프로토타입

- **팩맨 프로토타입**: FSM 기반 고스트 AI 및 길찾기 시스템 테스트  
  👉 [팩맨 데모](https://pofo.ounols.kr/%ED%8C%A9%EB%A7%A8-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85)
- **모여다오 프로젝트**: NFT 컨셉 기반 3D 씬 활용  
  👉 [모여다오 데모](https://pofo.ounols.kr/moyodao-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8)

---

## ⚙️ 개발 환경 & 기술 스택

- **언어 / 빌드**: C++14+, CMake 3.15+, MSVC/GCC/Clang  
- **그래픽 API**: OpenGL Core 3.3+, ES 3.0+, GLSL  
- **타겟 플랫폼**: x86_64, ARM (v7/v8)  
- **종속성**: GLEW, GLFW, stb_image, IMGUI, Squirrel, ZIP 라이브러리 등 :contentReference[oaicite:2]{index=2}  

---

## ✅ 개발 현황 및 계획

진행 중인 작업, 구현 예정 기능, TODO 리스트가 별도 페이지에 정리되어 있음  
👉 [개발 현황 & TODO](https://pofo.ounols.kr/CSEngine) *(메인 페이지 내 링크 포함)*

---

## ✅ 요약 & 링크 모음

- **메인 페이지**: 엔진 개괄 & 깃허브 링크 🌐  
  https://pofo.ounols.kr/CSEngine  
- **핵심 문서**:  
  - 개발 계기 → [여기](https://pofo.ounols.kr/%EC%96%B4%EB%96%B4%EA%B2%8C-%EC%97%94%EC%A7%84%EC%9D%84-%EB%A7%8C%EB%93%A4%EA%B2%8C-%EB%90%98%EC%97%88%EB%82%98%EC%9A%94)  
  - 구조 → [여기](https://pofo.ounols.kr/%EC%97%94%EC%A7%84-%EA%B5%AC%EC%A1%B0)  
  - 기능별 상세 → 렌더링 / 애니메이션 / 프리팹·씬 / 스크립트 / 크로스 플랫폼 (각각 링크 포함)  
  - 데모 → [팩맨](https://pofo.ounols.kr/%ED%8C%A9%EB%A7%A8-%ED%94%84%EB%A1%AC%ED%86%A0%ED%83%80%EC%9E%85), [모여다오](https://pofo.ounols.kr/moyodao-%ED%94%84%EB%A1%AC%EC%A0%9D%ED%8A%B8)

---

## 📌 사용 가이드

1. **한눈 요약**: 이 문서를 통해 프로젝트의 핵심을 빠르게 전달  
2. **상세 탐색**: 관심 있는 부분은 개별 링크 클릭해 깊이 탐색  
3. **GitHub**: 개발 완료 코드, 빌드 스크립트, 의존성 확인  

---

*(이 문서는 면접, 데모 시연, 채용 포트폴리오 등에서 **쉽고 직관적인 개요 + 상세 링크** 조합으로 활용하기 적합합니다.)*
