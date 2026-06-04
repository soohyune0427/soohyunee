const { useState, useEffect, useRef } = React;

/* ----------------------------------------------------------------- *
 *  PORTFOLIO DATA — edit freely
 * ----------------------------------------------------------------- */
const PROFILE = {
  name: "이수현",
  birth: "1999",
  headlineTop: "NO PAIN",
  headlineBottom: "NO GAIN",
  tagline: "고객의 목소리를 데이터로 읽는 사람",
  intro:
    "4년 넘게 카드사 인바운드 상담 현장에서 고객의 목소리를 직접 들었습니다. 이제 그 경험을 데이터와 대시보드로 확장하며, 부동산·마케팅 도메인에서 새로운 길을 만들어 가고 있습니다.",
  email: "dollsoohyune@naver.com",
  instagram: "@heimish_soohyune",
  status: "UT파트너스 인턴 예정",
  affiliation: "한국부동산마케팅협회 교육생",
};

const CAREER = [
  {
    period: "2026 —",
    now: true,
    role: "한국부동산마케팅협회 교육생",
    org: "UT파트너스 인턴 예정",
    note: "데이터 기반 부동산 마케팅으로 영역 확장",
  },
  {
    period: "2년 1개월",
    role: "인바운드 상담사",
    org: "우리카드",
    note: "고객 응대 · VOC 처리 · 상담 품질 관리",
  },
  {
    period: "2년",
    role: "인바운드 상담사",
    org: "신한카드",
    note: "고객 응대 · 민원 대응 · 상담 매뉴얼 숙지",
  },
];

const PROJECTS = [
  {
    n: "01",
    title: "청약 대시보드",
    sub: "공공데이터 포털 활용",
    desc: "공공데이터 포털 API를 연동해 청약 정보를 한눈에 보는 분석 대시보드를 구성했습니다.",
    tags: ["공공데이터 API", "데이터 시각화"],
    url: "https://cheongak-dashboard-opal.vercel.app",
    slot: "proj-cheongak",
  },
  {
    n: "02",
    title: "VOC 수집·분석 대시보드",
    sub: "Google Workspace 연동",
    desc: "GWS 메일 데이터를 연동해 고객의 소리(VOC)를 자동으로 수집·분류·분석합니다.",
    tags: ["GWS 연동", "VOC 분석"],
    url: "https://mail-dashboard-blue-six.vercel.app",
    slot: "proj-voc",
  },
  {
    n: "03",
    title: "AI 정보 영상 자동화",
    sub: "샘플 영상",
    desc: "AI를 활용해 정보성 영상을 자동으로 제작하는 파이프라인 샘플입니다.",
    tags: ["AI 자동화", "콘텐츠 제작"],
    url: "https://drive.google.com/file/d/1PXnduKbS5jprw10sApuuXbk7xlxVui1a/view?usp=sharing",
    slot: "proj-ai",
  },
];

/* ----------------------------------------------------------------- *
 *  TWEAKS
 * ----------------------------------------------------------------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
  accent: ["#7B6CD9", "#EFEBFB", "#544A9E"],
  korFont: "Pretendard",
  density: "regular",
  uppercaseName: false,
}; /*EDITMODE-END*/

const ACCENT_OPTIONS = [
  ["#7B6CD9", "#EFEBFB", "#544A9E"], // lavender (default)
  ["#9B8AE6", "#F1ECFC", "#6A5BC0"], // soft lilac
  ["#6E73D6", "#EBEDFB", "#4A4FAE"], // periwinkle
  ["#8E6FD0", "#F0EAFB", "#634AA0"], // amethyst
];

const FONT_OPTIONS = ["Pretendard", "Gowun Dodum", "IBM Plex Sans KR"];

function applyTheme(t) {
  const root = document.documentElement;
  const [accent, soft, deep] = t.accent;
  root.style.setProperty("--accent", accent);
  root.style.setProperty("--accent-soft", soft);
  root.style.setProperty("--accent-ink", deep);
  root.style.setProperty("--kor-font", `"${t.korFont}"`);
  const pad =
    t.density === "compact" ? "0.82" : t.density === "comfy" ? "1.18" : "1";
  root.style.setProperty("--density", pad);
}

/* ----------------------------------------------------------------- *
 *  SECTIONS
 * ----------------------------------------------------------------- */
function Hero({ uppercaseName }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <header className="hero">
      <div className="hero__grid">
        <div className="hero__main">
          <p className="kicker" data-reveal>
            <span className="kicker__dot" />
            PORTFOLIO · 2026
          </p>
          <h1 className="headline" data-reveal>
            <span className="headline__line">{PROFILE.headlineTop}</span>
            <span className="headline__line headline__accent">
              {PROFILE.headlineBottom}
            </span>
          </h1>
          <div className="hero__id" data-reveal>
            <span
              className="hero__name"
              style={{
                textTransform: uppercaseName ? "uppercase" : "none",
                letterSpacing: uppercaseName ? "0.12em" : "0",
              }}
            >
              {PROFILE.name}
            </span>
            <span className="hero__birth">{PROFILE.birth}</span>
          </div>
          <p className="hero__tagline" data-reveal>
            {PROFILE.tagline}
          </p>
          <p className="hero__intro" data-reveal>
            {PROFILE.intro}
          </p>
          <div className="hero__meta" data-reveal>
            <button className="chip chip--btn" onClick={copy}>
              <span className="chip__label">EMAIL</span>
              <span className="chip__value">
                {copied ? "복사됨 ✓" : PROFILE.email}
              </span>
            </button>
            <span className="chip">
              <span className="chip__label">STATUS</span>
              <span className="chip__value">{PROFILE.status}</span>
            </span>
          </div>
        </div>

        <div className="hero__aside" data-reveal>
          <div className="portrait">
            <image-slot
              id="profile-photo"
              shape="rounded"
              radius="22"
              placeholder="프로필 사진을 끌어다 놓으세요"
              style={{ width: "100%", height: "100%" }}
            ></image-slot>
          </div>
          <div className="portrait__tag">
            <span>{PROFILE.affiliation}</span>
          </div>
        </div>
      </div>
      <div className="hero__scroll" data-reveal>
        <span>SCROLL</span>
        <span className="hero__scrollline" />
      </div>
    </header>
  );
}

function SectionLabel({ index, children }) {
  return (
    <div className="seclabel" data-reveal>
      <span className="seclabel__idx">{index}</span>
      <span className="seclabel__txt">{children}</span>
      <span className="seclabel__rule" />
    </div>
  );
}

function Career() {
  return (
    <section className="section" id="career">
      <SectionLabel index="01">경력</SectionLabel>
      <div className="career__head" data-reveal>
        <p className="career__lede">
          카드사 인바운드 상담 <strong>4년+</strong>의 현장 경험.
        </p>
      </div>
      <ol className="timeline">
        {CAREER.map((c, i) => (
          <li className="tl" key={i} data-reveal>
            <div className="tl__period">
              {c.now && <span className="tl__live" />}
              {c.period}
            </div>
            <div className="tl__node" />
            <div className="tl__body">
              <h3 className="tl__role">{c.role}</h3>
              <p className="tl__org">{c.org}</p>
              <p className="tl__note">{c.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Projects() {
  return (
    <section className="section" id="work">
      <SectionLabel index="02">프로젝트</SectionLabel>
      <div className="projects">
        {PROJECTS.map((p) => (
          <a
            className="pcard"
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            key={p.n}
            data-reveal
          >
            <div className="pcard__thumb">
              <image-slot
                id={p.slot}
                shape="rect"
                placeholder="스크린샷 끌어다 놓기"
                style={{ width: "100%", height: "100%" }}
              ></image-slot>
              <span className="pcard__n">{p.n}</span>
            </div>
            <div className="pcard__info">
              <p className="pcard__sub">{p.sub}</p>
              <h3 className="pcard__title">{p.title}</h3>
              <p className="pcard__desc">{p.desc}</p>
              <div className="pcard__tags">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <span className="pcard__link">
                바로가기
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M4 11L11 4M11 4H5M11 4V10"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <footer className="footer" id="contact">
      <SectionLabel index="03">학력 · 연락처</SectionLabel>
      <div className="footer__grid">
        <div className="footer__col" data-reveal>
          <p className="footer__k">학력</p>
          <p className="footer__v">여주대학교 약손미용과 졸업</p>
        </div>
        <div className="footer__col" data-reveal>
          <p className="footer__k">소속</p>
          <p className="footer__v">{PROFILE.affiliation}</p>
          <p className="footer__sub">{PROFILE.status}</p>
        </div>
        <div className="footer__col" data-reveal>
          <p className="footer__k">연락처</p>
          <button className="footer__email" onClick={copy}>
            {copied ? "복사됨 ✓" : PROFILE.email}
          </button>
          <a
            className="footer__ig"
            href={`https://instagram.com/${PROFILE.instagram.replace(/^@/, "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.7" />
              <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
              <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
            </svg>
            {PROFILE.instagram}
          </a>
        </div>
      </div>
      <div className="footer__cta" data-reveal>
        <span className="footer__big">{PROFILE.name}</span>
        <span className="footer__year">© 2026</span>
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------------- *
 *  TWEAKS PANEL
 * ----------------------------------------------------------------- */
function Tweaks({ t, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection label="컬러" />
      <TweakColor
        label="포인트 컬러"
        value={t.accent}
        options={ACCENT_OPTIONS}
        onChange={(v) => setTweak("accent", v)}
      />
      <TweakSection label="타이포그래피" />
      <TweakSelect
        label="한글 폰트"
        value={t.korFont}
        options={FONT_OPTIONS}
        onChange={(v) => setTweak("korFont", v)}
      />
      <TweakToggle
        label="이름 대문자"
        value={t.uppercaseName}
        onChange={(v) => setTweak("uppercaseName", v)}
      />
      <TweakSection label="레이아웃" />
      <TweakRadio
        label="여백 밀도"
        value={t.density}
        options={["compact", "regular", "comfy"]}
        onChange={(v) => setTweak("density", v)}
      />
    </TweaksPanel>
  );
}

/* ----------------------------------------------------------------- *
 *  APP
 * ----------------------------------------------------------------- */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => applyTheme(t), [t]);
  return (
    <div className="page">
      <Hero uppercaseName={t.uppercaseName} />
      <main className="container">
        <Career />
        <Projects />
        <Footer />
      </main>
      <Tweaks t={t} setTweak={setTweak} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
