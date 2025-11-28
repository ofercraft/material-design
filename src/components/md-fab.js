class MD_FAB extends HTMLElement {
    static get observedAttributes() {
        return ["icon", "size"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" rel="stylesheet" />

            <style>
                :host {
                    --fab-bg: var(--color-primary, #6750a4);
                    --fab-fg: var(--color-on-primary, #ffffff);
                    --fab-hover: var(--color-primary-hover, #7d67c6);
                    --fab-shadow: 0 6px 18px rgba(0,0,0,0.18);

                    display: inline-flex;
                }

                .fab {
                    background: var(--fab-bg);
                    color: var(--fab-fg);
                    border-radius: 50%;
                    box-shadow: var(--fab-shadow);

                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;

                    transition: background 0.25s ease, transform 0.2s ease;
                    user-select: none;
                }

                .fab:hover {
                    background: var(--fab-hover);
                }

                /* Icon */
                .fab-icon {
                    font-family: "Material Symbols Rounded";
                    font-weight: normal;
                    font-style: normal;
                    font-size: var(--icon-size);
                    line-height: 1;
                    display: inline-block;
                }

                /* Sizes */
                :host([size="small"]) .fab {
                    width: 40px;
                    height: 40px;
                    --icon-size: 20px;
                    border-radius: 12px; /* Only small is circular */
                }

                :host([size="medium"]) .fab {
                    width: 56px;
                    height: 56px;
                    --icon-size: 28px;
                    border-radius: 16px; /* MD3 medium FAB corners */
                }

                :host([size="large"]) .fab {
                    width: 96px;
                    height: 96px;
                    --icon-size: 40px;
                    border-radius: 28px; /* MD3 large FAB corners */
                }

            </style>

            <div class="fab">
                <span class="fab-icon"></span>
            </div>
        `;
    }

    connectedCallback() {
        this.update();
    }

    attributeChangedCallback() {
        this.update();
    }

    update() {
        const icon = this.getAttribute("icon") || "add";
        this.shadowRoot.querySelector(".fab-icon").textContent = icon;
    }
}

customElements.define("md-fab", MD_FAB);

export default MD_FAB;
