import { useEffect, useState } from "react";

const features = [
  {
    title: "毫秒級極速回應",
    description:
      "無需等待。傳送訊息的瞬間，翻譯結果已準備就緒，讓跨國溝通跟平時聊天一樣流暢無阻。",
    icon: (
      <path
        d="M13 10V3L4 14h7v7l9-11h-7z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    ),
  },
  {
    title: "AI 語境分析",
    description:
      "會根據前後文自動判斷口吻。無論是正式商用信件、還是朋友間的口語玩笑，都能精準傳達。",
    icon: (
      <path
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    ),
  },
  {
    title: "圖片與菜單翻譯",
    description:
      "出國旅遊看不懂日文菜單？直接拍照傳給小幫手，AI 自動辨識文字並回傳翻譯結果。",
    icon: (
      <>
        <path
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </>
    ),
  },
  {
    title: "隱私與安全",
    description:
      "採用企業級加密傳輸。翻譯完成後，資料不落地即刻銷毀，保護您的商業機密與個人隱私。",
    icon: (
      <path
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    ),
  },
];

const supportedModels = [
  "OpenAI",
  "Google Gemini",
  "DeepL"
];

const pricingMetrics = [
  {
    id: "01",
    label: "免費版",
    value: "100 則 / 日",
    detail: "給個人與小團隊的零門檻起點",
  },
  {
    id: "02",
    label: "企業版",
    value: "客製配額",
    detail: "依團隊規模、流量與串接需求彈性擴充",
  },
  {
    id: "03",
    label: "回覆速度",
    value: "0.5 秒內",
    detail: "像對話一樣即時，不打斷工作節奏",
  },
];

const demoMessages = [
  {
    source: "幫我翻譯這段文字給日本客戶：「我們預計下週三會將樣品寄出，請查收。」",
    translation: "「来週の水曜日にサンプルを発送する予定ですので、ご査収のほどよろしくお願いいたします。」",
  },
  {
    source: "幫我翻譯成日文：「報價單已更新，請確認最新版本，如有問題歡迎隨時聯繫。」",
    translation: "「見積書を更新いたしましたので、最新版をご確認ください。ご不明点がございましたら、いつでもご連絡ください。」",
  },
  {
    source: "翻譯給日本合作夥伴：「感謝您昨日的會議，附件是整理後的重點與後續時程。」",
    translation: "「昨日はお打ち合わせのお時間をいただき、ありがとうございました。添付に要点を整理した資料と今後のスケジュールをお送りします。」",
  },
  {
    source: "幫我用正式日文表達：「目前工廠正在安排生產，若有提前完成會第一時間通知您。」",
    translation: "「現在、工場にて生産手配を進めております。前倒しで完了した場合は、早急にご連絡いたします。」",
  },
  {
    source: "請翻譯這句給日本客戶：「若您方便，我們想安排下週五下午進行線上簡報。」",
    translation: "「ご都合がよろしければ、来週金曜日の午後にオンラインでご説明の機会をいただければと存じます。」",
  },
];

function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);
  const [showTranslatedMessage, setShowTranslatedMessage] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealDelay = 1400;
    const rotateDelay = 4200;

    setShowTranslatedMessage(false);

    const revealTimer = window.setTimeout(() => {
      setShowTranslatedMessage(true);
    }, revealDelay);

    const rotateTimer = window.setTimeout(() => {
      setActiveDemoIndex((currentIndex) => (currentIndex + 1) % demoMessages.length);
    }, rotateDelay);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(rotateTimer);
    };
  }, [activeDemoIndex]);

  const activeDemoMessage = demoMessages[activeDemoIndex];

  useEffect(() => {
    const chatBody = document.querySelector(".chat-body");

    if (chatBody) {
      chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    }
  }, [activeDemoIndex, showTranslatedMessage]);

  return (
    <div className="site-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <div className="grid-overlay" />

      <nav className={`navbar ${navScrolled ? "scrolled" : ""}`}>
        <div className="container nav-inner">
          <a href="#top" className="brand">
            <span className="brand-mark">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </span>
            <span>AI翻譯小幫手</span>
          </a>

          <div className="nav-links">
            <a href="#features">特色功能</a>
            <a href="#how-it-works">使用方式</a>
            <a href="#pricing">方案</a>
          </div>

          <a href="#cta" className="button button-ghost">
            免費加入
          </a>
        </div>
      </nav>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <div className="pill">
              <span className="pill-dot" />
              最新：增加AI上下文感知系統，翻譯更精準！
            </div>
            <h1>
              跨越語言<span className="hero-title-nowrap">藩籬，</span>
              <br />
              只需一個 <span>Line</span> <span className="hero-title-nowrap hero-title-accent">訊息。</span>
            </h1>
            <p className="hero-text">
              結合頂尖 AI 技術，為您提供即時、精準的雙向翻譯。無需下載新 App，
              在您最熟悉的 Line 聊天室中，隨時隨地與世界對話。
            </p>
            <div className="hero-actions">
              <a href="#cta" className="button button-primary">
                立即加入好友
              </a>
              <a href="#how-it-works" className="button button-secondary">
                了解運作方式
              </a>
            </div>
            <div className="social-proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>王</span>
                <span>林</span>
                <span>陳</span>
              </div>
              <p>
                超過 <strong>10,000+</strong> 活躍用戶正在使用
              </p>
            </div>
          </div>

          <div className="phone-scene">
            <div className="phone-glow" />
            <div className="phone-frame">
              <div className="phone-notch" />
              <div className="phone-header">
                <span className="back-arrow">‹</span>
                <div className="assistant-avatar">
                  <span>AI</span>
                  <i />
                </div>
                <div>
                  <h3>AI翻譯小幫手</h3>
                  <p>線上</p>
                </div>
              </div>

              <div className="chat-body">
                <div className="date-badge">今天</div>

                <div className="message-row user-row demo-message" key={`user-${activeDemoIndex}`}>
                  <div className="message user-message">
                    {activeDemoMessage.source}
                  </div>
                </div>

                <div className="message-row assistant-row reply-row" key={`assistant-${activeDemoIndex}`}>
                  <div className="mini-avatar">AI</div>
                  <div
                    className={`message assistant-message ${showTranslatedMessage ? "translated-message" : "typing"}`}
                  >
                    {showTranslatedMessage ? (
                      <strong>
                        {activeDemoMessage.translation}
                      </strong>
                    ) : (
                      <>
                        <span />
                        <span />
                        <span />
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="phone-input">
                <button type="button">+</button>
                <div className="input-shell">輸入訊息...</div>
                <button type="button">🎙</button>
              </div>
            </div>

            {/* <div className="floating-card stats-card">
              <span className="flag">🇯🇵</span>
              <div>
                <p>精準度</p>
                <strong>99.9%</strong>
              </div>
            </div>

            <div className="floating-card speed-card">
              <span className="icon">⚡</span>
              <div>
                <p>反應時間</p>
                <strong>&lt; 0.5s</strong>
              </div>
            </div> */}
          </div>
        </section>

        <section className="logo-strip">
          <div className="container">
            <p className="eyebrow">支援多種最頂尖 AI 模型</p>
            <div className="logo-row">
              {supportedModels.map((model) => (
                <div className="logo-chip" key={model}>
                  <span className="logo-dot" />
                  {model}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="section container">
          <div className="section-heading reveal">
            <p className="section-kicker">Core Features</p>
            <h2>不只是翻譯，是你的語言大腦</h2>
            <p>
              打破傳統生硬的機翻，我們懂你的語境、你的專業名詞，甚至你的幽默感。
            </p>
          </div>

          <div className="feature-grid">
            {features.slice(0, 3).map((feature, index) => (
              <article
                className="feature-card reveal"
                key={feature.title}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    {feature.icon}
                  </svg>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}

            <article className="feature-card feature-wide reveal">
              <div className="feature-wide-copy">
                <span className="tag">自動偵測語言</span>
                <h3>你說中文，他看懂英文</h3>
                <p>
                  不需要手動切換語言設定。小幫手會自動偵測您輸入的語言，並翻譯成目標語言。支援全球超過
                  50 種主流語言互翻。
                </p>
              </div>
              <div className="translate-stack">
                <div>&quot;안녕하세요!&quot;</div>
                <span>↓</span>
                <div className="accent">&quot;你好！&quot;</div>
              </div>
            </article>

            <article className="feature-card reveal">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  {features[3].icon}
                </svg>
              </div>
              <h3>{features[3].title}</h3>
              <p>{features[3].description}</p>
            </article>
          </div>
        </section>

        <section id="how-it-works" className="section steps-section">
          <div className="timeline-line" aria-hidden="true" />
          <div className="steps-shell">
            <div className="steps-heading reveal">
              <p className="section-kicker">How it works</p>
              <h2>三秒鐘，啟動你的專屬翻譯官</h2>
            </div>

            <div className="steps-stack">
              <div className="step-item reveal">
                <div className="step-copy align-right">
                  <div>
                    <h3>1. 加入官方帳號</h3>
                    <p>點擊按鈕或掃描 QRCode，將 AI翻譯小幫手 加入您的 Line 好友名單。</p>
                  </div>
                </div>
                <div className="step-node">1</div>
                <div className="step-visual align-left">
                  <div className="step-card">
                    <div className="qr-box" aria-hidden="true" />
                    <div>
                      <p className="step-label">@aitranslator</p>
                      <p className="muted">掃描以加入好友</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="step-item reverse reveal">
                <div className="step-copy align-left">
                  <div>
                    <h3>2. 貼上或輸入文字</h3>
                    <p>在聊天室中，直接打字或將需要翻譯的外文段落貼上。甚至可以傳送語音訊息。</p>
                  </div>
                </div>
                <div className="step-node">2</div>
                <div className="step-visual align-right">
                  <div className="step-card step-card-message">
                    <div className="chat-bubble user">
                      Let&apos;s schedule a meeting for tomorrow at 2 PM.
                    </div>
                  </div>
                </div>
              </div>

              <div className="step-item reveal">
                <div className="step-copy align-right">
                  <div>
                    <h3>3. 瞬間獲得翻譯</h3>
                    <p>AI 將立即理解語境，為您推播最自然、道地的翻譯結果。直接複製即可使用。</p>
                  </div>
                </div>
                <div className="step-node step-node-active">3</div>
                <div className="step-visual align-left">
                  <div className="step-card step-card-result">
                    <div className="chat-bubble assistant">我們安排明天下午兩點開會吧。</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="section container pricing-section">
          <div className="pricing-card reveal">
            <p className="section-kicker">Simple Pricing</p>
            <h2>先免費上手，再視需求升級</h2>
            <p>
              每日 100 則免費翻譯額度，適合個人與小團隊試用。未來可升級進階方案，取得更高額度與 API 串接。
            </p>
            <div className="pricing-metrics">
              {pricingMetrics.map((metric) => (
                <article className="pricing-metric" key={metric.label}>
                  <span className="pricing-metric-id">{metric.id}</span>
                  <p className="pricing-metric-label">{metric.label}</p>
                  <strong>{metric.value}</strong>
                  <span className="pricing-metric-detail">{metric.detail}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="section container cta-section">
          <div className="cta-card reveal">
            <h2>準備好無國界溝通了嗎？</h2>
            <p>
              現在加入，立即享有每日 100 則免費翻譯額度。無需信用卡，馬上體驗未來科技。
            </p>
            <a href="/" className="button button-primary large">
              免費加入 Line 官方帳號
            </a>
            <span className="cta-meta">LINE ID: @aitranslator</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="brand">
              <span className="brand-mark small">AI</span>
              <span>AI翻譯小幫手</span>
            </div>
            <p>專為亞洲用戶打造的頂尖 AI 翻譯體驗，無縫整合您的日常通訊。</p>
          </div>

          <div>
            <h3>產品</h3>
            <a href="#features">功能特色</a>
            <a href="#pricing">方案定價</a>
            <a href="#cta">API 串接</a>
          </div>

          <div>
            <h3>資源</h3>
            <a href="#how-it-works">使用教學</a>
            <a href="#cta">常見問題</a>
            <a href="#cta">隱私權政策</a>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© 2026 AI Translator Helper. All rights reserved.</p>
          <div>
            <a href="#top">Twitter</a>
            <a href="#top">GitHub</a>
            <a href="#cta">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
