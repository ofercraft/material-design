class MDButton extends HTMLElement {
    static get observedAttributes() {
        return ["type", "size", "shape", "selected"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" rel="stylesheet" />

            <style>
                :host {
                    --btn-bg: var(--color-primary, #6750a4);
                    --btn-fg: var(--color-on-primary, white);

                    --btn-bg-tonal: var(--color-secondary-container, #eaddff);
                    --btn-fg-tonal: var(--color-on-secondary-container, #21005d);

                    --btn-bg-text: transparent;
                    --btn-fg-text: var(--color-primary, #6750a4);

                    --btn-bg-outlined: transparent;
                    --btn-fg-outlined: var(--color-primary, #6750a4);
                    --btn-outline: 1px solid var(--color-outline, #79747e);

                    --btn-bg-elevated: var(--color-surface, #ffffff);
                    --btn-fg-elevated: var(--color-on-surface, #1d1b20);
                    --btn-shadow-elevated: 0 1px 2px rgba(0,0,0,0.3);

                    --radius: 20px;
                    --padding-h: 24px;
                    --height: 40px;
                    --font-size: 14px;

                    display: inline-flex;
                }

                button {
                    all: unset;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;

                    height: var(--height);
                    padding: 0 var(--padding-h);

                    background: var(--btn-bg);
                    color: var(--btn-fg);
                    border-radius: var(--radius);

                    font-family: Arial, sans-serif;
                    font-size: var(--font-size);
                    cursor: pointer;

                    border: none;
                    box-shadow: none;
                    transition: background 0.2s, box-shadow 0.2s, border-color 0.2s;
                }

                /* TYPES */
                :host([type="tonal"]) button {
                    background: var(--btn-bg-tonal);
                    color: var(--btn-fg-tonal);
                }

                :host([type="outlined"]) button {
                    background: var(--btn-bg-outlined);
                    color: var(--btn-fg-outlined);
                    border: var(--btn-outline);
                }

                :host([type="text"]) button {
                    background: var(--btn-bg-text);
                    color: var(--btn-fg-text);
                }

                :host([type="elevated"]) button {
                    background: var(--btn-bg-elevated);
                    color: var(--btn-fg-elevated);
                    box-shadow: var(--btn-shadow-elevated);
                }

                /* TOGGLE BUTTON */
                :host([type="toggle"][selected]) button {
                    background: var(--color-secondary, #625b71);
                    color: var(--color-on-secondary, white);
                }

                /* SHAPES */
                :host([shape="square"]) button {
                    border-radius: 8px;
                }

                :host([shape="round"]) button {
                    border-radius: 100px;
                }

                /* SIZES */
                :host([size="extra-small"]) {
                    --height: 28px;
                    --padding-h: 12px;
                    --font-size: 12px;
                }

                :host([size="small"]) {
                    --height: 32px;
                    --padding-h: 16px;
                    --font-size: 13px;
                }

                :host([size="medium"]) {
                    --height: 54px;
                    --padding-h: 16px;
                    --font-size: 14px;
                }

                :host([size="large"]) {
                    --height: 76px;
                    --padding-h: 40px;
                    --font-size: 16px;
                }

                :host([size="extra-large"]) {
                    --height: 100px;
                    --padding-h: 48px;
                    --font-size: 20px;
                }
                :host([type="filled"]) button,
                :host(:not([type])) button {
                    border-radius: 1000px; /* pill */
                }

                /* Icon */
                .icon {
                    font-family: "Material Symbols Rounded";
                    font-size: 20px;
                }

                .icon:empty,
                .icon:has(:empty) {
                    display: none;
                }
            </style>

            <button part="button">
                <span class="icon"><slot name="icon"></slot></span>
                <slot></slot>
            </button>
        `;
    }

    attributeChangedCallback() {
        this.update();
    }

    connectedCallback() {
        this.update();
    }

    update() {
        // toggle state for "toggle button"
        if (this.getAttribute("type") === "toggle") {
            this.addEventListener("click", () => {
                this.toggleAttribute("selected");
            });
        }
    }
}

customElements.define("md-button", MDButton);

export default MDButton;
