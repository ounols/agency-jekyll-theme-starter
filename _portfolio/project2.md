---
title: "Unreal 기반 전투기 워게임 시뮬레이터"
subtitle: 전장 에디터부터 시뮬레이션까지, 5인 정예 인원으로 진행한 전투기 워게임 B2B 외주 프로젝트
# image: assets/img/projects/flight-project/0_Thumnail.webp
# alt:

caption:
  title: "[외주] 전투기 워게임"
  subtitle: Unreal 기반 전투기 워게임 시뮬레이터
  thumbnail: assets/img/projects/flight-project/0_Thumnail.webp
---

<div class="wg">

<!-- ───────── HERO ───────── -->
<section class="wg-hero">
  <img class="wg-hero-img" src="assets/img/projects/flight-project/0_Thumnail.webp" alt="전투기 워게임 시뮬레이터 (대체 이미지)">
  <div class="wg-hero-body">
    <p class="wg-eyebrow">2025 ~ 2026 · 5인 정예 외주 · 에디터 · 시뮬레이션 설계 및 구현</p>
    <h3 class="wg-hero-title">전장을 직접 편집하고,<br>그대로 시뮬레이션하는 전투기 워게임</h3>
    <p class="wg-hero-desc">UMG 에디터에서 시나리오와 스펙을 지정하면, JSBSim 항공역학과 Cesium 실제 지형 위에서 Behavior Tree 기반 AI 전투기가 임무를 수행합니다. 저는 에디터와 시뮬레이션, 그리고 그 밑바탕인 <b>오브젝트 직렬화 프레임워크</b>를 맡았습니다.</p>
    <div class="wg-chips">
      <span>Unreal C++</span><span>UMG</span><span>Behavior Tree</span><span>JSBSim</span><span>Cesium</span><span>AI 에이전트</span>
    </div>
  </div>
</section>

<!-- ───────── PART 1 ───────── -->
<header class="wg-part" style="--c:#4A90D9">
  <span>PART 1</span>
  <h2>Unreal을 깊이 이해하고 설계하기</h2>
</header>

<h3>기반 · 바뀌는 요구사항에 흔들리지 않는 구조</h3>

<div class="wg-split">
  <figure class="wg-figure">
    <img src="assets/img/projects/flight-project/10_editor_system_architecture.svg" alt="에디터 및 시뮬레이터 아키텍처">
  </figure>
  <div>
    <p>기능 요구사항이 계속 바뀌는 B2B 프로젝트라, 화면이 바뀌어도 데이터가 흔들리지 않도록 MVC를 변형한 <b>MVC + Observer</b> 구조로 설계했습니다.</p>
    <ul class="wg-dots">
      <li><b>Model → View 단방향</b>으로 UI 변경이 로직에 번지지 않음</li>
      <li><b>Delegate · Bridge</b>로 UMG Widget과 World의 의존 분리</li>
      <li>에디터의 데이터 트리가 곧 <b>저장 파일 구조</b> — 신기능을 추가해도 직렬화가 자동으로 따라옴</li>
    </ul>
  </div>
</div>

<h3>사례 · 생성 순서 문제를 생성 규약으로</h3>

<ol class="wg-timeline">
  <li style="--c:#E5534B">
    <span class="wg-tl-label">증상</span>
    <p>전장 파일을 불러와 오브젝트를 만들면, <b>생성자에서 초기화한 값과 참조가 의도와 다르게 바뀌어</b> 있었습니다.</p>
  </li>
  <li style="--c:#F5A623">
    <span class="wg-tl-label">원인 추적</span>
    <p>직렬화 흐름을 따라가 보니 Unreal은 <b>Native C++ 생성자 → Blueprint → Property(에디터에 적용한 값)</b> 순서로 값을 덮어씁니다. 생성자 시점에는 최종 데이터가 아직 준비되지 않은 상태였습니다.</p>
  </li>
  <li style="--c:#50B87A">
    <span class="wg-tl-label">해결</span>
    <p>생성 관련 가상함수를 <b>Init · Link · Ready 3단계</b>로 분리하고, Property 적용이 모두 끝난 뒤 순서대로 호출하도록 전장 오브젝트 공통 규약으로 만들었습니다.</p>
    <figure class="wg-figure">
      <img src="assets/img/projects/flight-project/11_construction_order.svg" alt="Unreal 생성 순서 문제와 3단계 분리">
    </figure>
    <div class="wg-phases">
      <div style="--c:#4A90D9"><b>Init</b><span>자기 데이터만으로 초기화</span></div>
      <div style="--c:#50B87A"><b>Link</b><span>ID 참조를 실제 액터 · 데이터와 연결</span></div>
      <div style="--c:#F5A623"><b>Ready</b><span>파생 데이터 계산, BT · UMG 연결</span></div>
    </div>
  </li>
  <li style="--c:#4A90D9">
    <span class="wg-tl-label">확장 · 링크</span>
    <p>전투기는 소속 편대와 교전 목표를, 편대는 임무 경로를 참조합니다. 로드 순서는 보장되지 않기 때문에, <b>각 단계를 전장 전체에 일괄 적용</b>하고 모두 끝나야 다음 단계로 넘어가게 했습니다. Link 시점엔 모든 대상이 이미 Init을 마쳤으므로 <b>로드 순서와 무관하게 항상 같은 결과</b>가 나옵니다.</p>
    <figure class="wg-figure">
      <img src="assets/img/projects/flight-project/12_link_phase.svg" alt="3단계 분리를 활용한 오브젝트 링크">
    </figure>
  </li>
</ol>

<h3>그 외 사용한 Unreal 기능</h3>

<div class="wg-tools">
  <div><i class="fa-solid fa-table-columns"></i><b>UMG</b><span>시나리오 · 스펙 편집 에디터 UI 전반</span></div>
  <div><i class="fa-solid fa-brain"></i><b>Behavior Tree</b><span>AI 전투기 의사결정, Ready 이후 안전하게 동작</span></div>
  <div><i class="fa-solid fa-location-crosshairs"></i><b>Cesium</b><span>통합 지오레퍼런싱, 위경도 ↔ Unreal 좌표 호환</span></div>
  <div><i class="fa-solid fa-jet-fighter"></i><b>JSBSim</b><span>항공역학 시뮬레이션 연동</span></div>
  <div><i class="fa-solid fa-sun"></i><b>Material</b><span>위성사진 명도 기반 노멀 생성 쉐이더</span></div>
  <div><i class="fa-solid fa-server"></i><b>설계 방향</b><span>데디케이티드 서버(예정)까지 고려</span></div>
</div>

<!-- ───────── PART 2 ───────── -->
<header class="wg-part" style="--c:#50B87A">
  <span>PART 2</span>
  <h2>AI 에이전트를 경제적으로 쓰기</h2>
</header>

<p class="wg-lead">설계 파트를 제외한 전장 오브젝트의 움직임과 활동은 AI 에이전트와 함께 개발했습니다.<br>목표는 AI에게 일을 맡기는 것이 아니라, <b>AI가 적은 토큰으로 정확하게 일할 수 있는 환경을 먼저 만드는 것</b>이었습니다.</p>

<div class="wg-principle">
  <div class="wg-principle-head"><span>원칙 1</span><h4>작게 나눈다</h4></div>
  <div class="wg-vs">
    <div class="wg-vs-before"><em>문제 되었던 방식</em>움직임 · 활동 로직이 액터에 섞여 있어, AI가 매번 큰 범위를 읽어야 함</div>
    <div class="wg-vs-after"><em>이렇게 했습니다</em>움직임 · 활동을 <b>Controller 컴포넌트</b>로 분리해 AI가 다룰 범위를 작게 유지</div>
  </div>
</div>

<div class="wg-principle">
  <div class="wg-principle-head"><span>원칙 2</span><h4>규약은 미리 알려준다</h4></div>
  <div class="wg-vs">
    <div class="wg-vs-before"><em>문제 되었던 방식</em>AI가 직렬화 · 오브젝트 조회 방식을 알아내려고 코드베이스를 매번 탐색</div>
    <div class="wg-vs-after"><em>이렇게 했습니다</em>직렬화 컴포넌트를 받아오는 방식 · 오브젝트를 불러오는 방식을 <b>스킬 프롬프트</b>로, 의도와 제약은 <b>주석</b>으로 정리</div>
  </div>
</div>

<figure class="wg-figure">
  <img src="assets/img/projects/flight-project/13_component_controller.svg" alt="컴포넌트 Controller 구조와 AI 에이전트용 규약">
</figure>

<div class="wg-principle">
  <div class="wg-principle-head"><span>원칙 3</span><h4>필요한 것만, 시간 순서대로 보여준다</h4></div>
  <div class="wg-vs">
    <div class="wg-vs-before"><em>문제 되었던 방식</em>프레임 단위 로그 전체를 그대로 붙여넣고, 반복할 때마다 다시 전송</div>
    <div class="wg-vs-after"><em>이렇게 했습니다</em>시뮬레이션이 시작되면 <b>임무 시나리오 단계부터 시간순으로 필터링한 로그</b>만 출력해 에이전트 루프에 전달</div>
  </div>
</div>

<figure class="wg-figure">
  <img src="assets/img/projects/flight-project/14_agent_loop.svg" alt="시간순 필터링 로그 기반 AI 에이전트 루프">
</figure>

<p>AI 에이전트는 이 로그를 읽고 실제 같은 움직임이 될 때까지 Controller를 고치는 루프를 반복했습니다. 시간 순서가 유지된 핵심 이벤트만 받기 때문에 인과관계를 바로 파악할 수 있었고, 로그를 무작정 붙여 돌리는 것보다 <b>훨씬 적은 토큰</b>으로 같은 비용에 더 많이 반복할 수 있었습니다.</p>

</div>

<style>
.wg { color: #c9d1d9; }
.wg h3 { font-size: 1.2rem; margin: 2.5rem 0 1rem; }
.wg h4 { font-size: 1.05rem; margin: 0; color: #f0f6fc; }
.wg p { line-height: 1.75; }

/* hero */
.wg-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: 1.75rem;
  align-items: center;
}
.wg-hero-img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 14px;
  border: 1px solid #30363d;
}
.wg-eyebrow { font-size: 0.82rem; color: #8b949e; margin-bottom: 0.4rem; }
.wg-hero-title { font-size: 1.55rem !important; line-height: 1.4; margin: 0 0 0.8rem !important; }
.wg-hero-desc { font-size: 0.95rem; margin-bottom: 1rem; }
.wg-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.wg-chips span {
  font-size: 0.78rem;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  border: 1px solid #30363d;
  background: #161b22;
  color: #c9d1d9;
}
.wg-note { font-size: 0.82rem; color: #8b949e; margin: 0.8rem 0 2rem; }

/* guide */
.wg-guide { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; margin-bottom: 1rem; }
.wg-guide-card {
  padding: 1.2rem 1.3rem;
  border-radius: 14px;
  background: #161b22;
  border: 1px solid #30363d;
  border-left: 4px solid var(--c);
}
.wg-guide-no { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; color: var(--c); }
.wg-guide-card h4 { margin: 0.3rem 0 0.4rem; }
.wg-guide-card p { margin: 0; font-size: 0.9rem; color: #8b949e; line-height: 1.6; }

/* part header */
.wg-part { margin: 4rem 0 1.5rem; padding-bottom: 0.9rem; border-bottom: 2px solid var(--c); }
.wg-part span { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.14em; color: var(--c); }
.wg-part h2 { margin: 0.2rem 0 0 !important; }

/* figure */
.wg-figure { margin: 1rem 0 1.5rem; }
.wg-figure img { width: 100%; border-radius: 12px; border: 1px solid #30363d; display: block; }

/* split */
.wg-split { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 1.5rem; align-items: center; }
.wg-split .wg-figure { margin: 0; }
.wg-dots { padding-left: 1.1em; margin: 0; }
.wg-dots li { margin-bottom: 0.5rem; line-height: 1.65; }

/* timeline */
.wg-timeline { list-style: none; padding: 0; margin: 0; position: relative; }
.wg-timeline::before {
  content: "";
  position: absolute;
  left: 7px; top: 8px; bottom: 8px;
  width: 2px;
  background: #30363d;
}
.wg-timeline > li { position: relative; padding: 0 0 1.6rem 2.2rem; }
.wg-timeline > li::before {
  content: "";
  position: absolute;
  left: 0; top: 4px;
  width: 16px; height: 16px;
  border-radius: 50%;
  background: #0d1117;
  border: 3px solid var(--c);
}
.wg-tl-label { display: inline-block; font-size: 0.82rem; font-weight: 700; color: var(--c); margin-bottom: 0.3rem; }
.wg-timeline p { margin: 0; }

.wg-phases { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.7rem; }
.wg-phases div {
  padding: 0.75rem 0.9rem;
  border-radius: 10px;
  background: #161b22;
  border: 1px solid #30363d;
  border-top: 3px solid var(--c);
}
.wg-phases b { display: block; color: var(--c); }
.wg-phases span { font-size: 0.85rem; color: #8b949e; line-height: 1.5; }

/* tools */
.wg-tools { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.8rem; }
.wg-tools div {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 0.7rem;
  align-items: center;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  background: #161b22;
  border: 1px solid #30363d;
}
.wg-tools i { grid-row: span 2; font-size: 1.15rem; color: #8b949e; width: 1.4rem; text-align: center; }
.wg-tools b { color: #f0f6fc; font-size: 0.95rem; }
.wg-tools span { font-size: 0.82rem; color: #8b949e; line-height: 1.45; }

/* part 2 */
.wg-lead { font-size: 1rem; }
.wg-principle { margin: 1.6rem 0 1rem; }
.wg-principle-head { display: flex; align-items: baseline; gap: 0.7rem; margin-bottom: 0.7rem; }
.wg-principle-head span {
  font-size: 0.75rem; font-weight: 700;
  padding: 0.15rem 0.6rem; border-radius: 999px;
  color: #7ee2a8; background: rgba(80, 184, 122, 0.15); border: 1px solid rgba(80, 184, 122, 0.5);
}
.wg-vs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.8rem; }
.wg-vs > div { padding: 0.9rem 1.1rem; border-radius: 12px; font-size: 0.92rem; line-height: 1.6; }
.wg-vs em { display: block; font-style: normal; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; margin-bottom: 0.3rem; }
.wg-vs-before { background: #161b22; border: 1px dashed #30363d; color: #8b949e; }
.wg-vs-before em { color: #8b949e; }
.wg-vs-after { background: rgba(80, 184, 122, 0.08); border: 1px solid rgba(80, 184, 122, 0.45); color: #c9d1d9; }
.wg-vs-after em { color: #7ee2a8; }

/* takeaway */
.wg-takeaway {
  margin: 3.5rem 0 0;
  padding: 1.5rem 1.75rem;
  border-left: 4px solid #F5A623;
  background: #161b22;
  border-radius: 0 12px 12px 0;
  color: #f0f6fc;
  font-size: 1.05rem;
  line-height: 1.8;
}

@media (max-width: 767px) {
  .wg-hero, .wg-split, .wg-guide, .wg-vs { grid-template-columns: 1fr; }
  .wg-tools { grid-template-columns: 1fr; }
  .wg-phases { grid-template-columns: 1fr; }
  .wg-hero-title { font-size: 1.3rem !important; }
}
@media (min-width: 768px) and (max-width: 991px) {
  .wg-tools { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>
