/**
 * <blueprint-generation>
 *
 * A dependency-free, brand-neutral generation moment.  Add this script to a
 * page, then use <blueprint-generation></blueprint-generation> where needed.
 */
class BlueprintGeneration extends HTMLElement {
  static get observedAttributes() {
    return ["user-name", "user-message", "first-line", "second-line", "autoplay"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  connectedCallback() {
    if (this.getAttribute("autoplay") !== "false") this.play();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this.render();
  }

  render() {
    const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    }[character]));
    const userName = escapeHtml(this.getAttribute("user-name") || "[name]");
    const userMessage = escapeHtml(this.getAttribute("user-message") || "Build my Blueprint!");
    const firstLine = escapeHtml(this.getAttribute("first-line") || "Reading your answers…");
    const secondLine = escapeHtml(this.getAttribute("second-line") || "Your Blueprint is taking shape…");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --yb-ink: #171717;
          --yb-muted: #5d5d5d;
          --yb-accent: #1685f8;
          --yb-surface: transparent;
          --yb-user-bubble: #ececec;
          display: block;
          min-height: 0;
          color: var(--yb-ink);
          background: transparent;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        * { box-sizing: border-box; }

        .generation {
          width: 100%;
          min-height: 0;
          margin: 0;
          /* Horizontal pad matches report column; tight bottom so report sits under status */
          padding: 0;
        }

        .user-row { display: flex; justify-content: flex-end; margin-bottom: clamp(1.6rem, 4vw, 2.4rem); }
        .user-bubble {
          max-width: min(86%, 22rem);
          padding: .72rem 1.05rem .78rem;
          border-radius: 1.45rem;
          background: var(--yb-user-bubble);
          color: var(--yb-ink);
          /* Match “Your Blueprint is taking shape…” */
          font-size: clamp(1rem, 2vw, 1.12rem);
          line-height: 1.35;
          letter-spacing: -.025em;
          opacity: 0;
          transform: translateY(8px);
        }

        .file-name {
          display: inline-flex;
          align-items: center;
          gap: .32rem;
          margin-bottom: .4rem;
          padding: .18rem .48rem;
          border-radius: .45rem;
          background: rgba(22, 133, 248, .12);
          color: #1170c9;
          font-size: .78em;
          font-weight: 600;
          line-height: 1.25;
        }
        .user-copy, .signature { display: block; }
        .signature { margin-top: .23rem; }

        .assistant-row { display: flex; align-items: flex-start; gap: .82rem; }
        .engine {
          position: relative;
          flex: 0 0 20px;
          width: 20px;
          height: 20px;
          margin-top: 3px;
          opacity: 0;
        }

        .halo, .halo::before, .halo::after, .core {
          position: absolute;
          inset: 50%;
          border-radius: 999px;
          transform: translate(-50%, -50%);
        }

        .halo {
          width: 12px;
          height: 12px;
          background: var(--yb-accent);
          box-shadow: 0 0 12px color-mix(in srgb, var(--yb-accent) 30%, transparent);
        }

        .halo::before, .halo::after {
          content: "";
          border: 1px solid color-mix(in srgb, var(--yb-accent) 55%, transparent);
          opacity: 0;
        }

        .halo::before { width: 20px; height: 20px; }
        .halo::after { width: 30px; height: 30px; }

        .core {
          width: 4px;
          height: 4px;
          background: #fff;
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--yb-accent) 62%, transparent);
        }

        .copy { position: relative; min-height: 1.5rem; padding-top: 0; }
        p { margin: 0; letter-spacing: -.025em; }
        .line {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          transform: translateY(6px);
          white-space: nowrap;
        }
        .first { font-size: clamp(1rem, 2vw, 1.12rem); color: var(--yb-ink); }
        .second { font-size: clamp(1rem, 2vw, 1.12rem); color: var(--yb-ink); font-weight: 650; }

        .is-playing .user-bubble { animation: yb-copy-in .38s cubic-bezier(.2,.8,.2,1) forwards; }
        .is-playing .engine { animation: yb-enter .22s ease-out .45s forwards, yb-engine-exit .25s ease-in 2.2s forwards; }
        .is-playing .halo { animation: yb-breathe 1.02s cubic-bezier(.45,0,.55,1) .5s 2 both; }
        .is-playing .halo::before { animation: yb-ring 1.02s cubic-bezier(.17,.67,.32,1.01) .54s 2 both; }
        .is-playing .halo::after { animation: yb-ring 1.02s cubic-bezier(.17,.67,.32,1.01) .66s 2 both; }
        .is-playing .core { animation: yb-core 1.02s ease-in-out .5s 2 both; }
        .is-playing .first { animation: yb-copy-in .4s cubic-bezier(.2,.8,.2,1) 2.42s forwards; }
        /* Second line is driven by the page when report build starts / finishes */
        .is-playing .second { opacity: 0; }

        @keyframes yb-enter { to { opacity: 1; } }
        @keyframes yb-engine-exit { to { opacity: 0; transform: scale(.78); } }
        @keyframes yb-breathe { 0%,100% { transform: translate(-50%,-50%) scale(.82); } 45% { transform: translate(-50%,-50%) scale(1.16); } }
        @keyframes yb-ring { 0% { opacity: .72; transform: translate(-50%,-50%) scale(.45); } 74%,100% { opacity: 0; transform: translate(-50%,-50%) scale(1.15); } }
        @keyframes yb-core { 0%,100% { transform: translate(-50%,-50%) scale(.8); } 46% { transform: translate(-50%,-50%) scale(1.32); } }
        @keyframes yb-copy-in { to { opacity: 1; transform: translateY(0); } }
        @keyframes yb-copy-out { to { opacity: 0; transform: translateY(-5px); } }

        @media (prefers-reduced-motion: reduce) {
          .engine { display: none; }
          .user-bubble, .second { opacity: 1; transform: none; }
          .first { display: none; }
        }
      </style>
      <section class="generation">
        <div class="user-row">
          <div class="user-bubble">
            <span class="file-name" aria-label="Personal blueprint file">📄 ${userName}.json</span>
            <span class="user-copy">${userMessage}</span>
            <span class="signature">– ${userName}</span>
          </div>
        </div>
        <div class="assistant-row" aria-live="polite" aria-atomic="true">
          <div class="engine" aria-hidden="true"><span class="halo"></span><span class="core"></span></div>
          <div class="copy">
            <p class="line first">${firstLine}</p>
            <p class="line second">${secondLine}</p>
          </div>
        </div>
      </section>
    `;
  }

  play() {
    const generation = this.shadowRoot.querySelector(".generation");
    generation.classList.remove("is-playing");
    // Restart keyframes cleanly whenever the component is shown again.
    void generation.offsetWidth;
    generation.classList.add("is-playing");
  }
}

customElements.define("blueprint-generation", BlueprintGeneration);
