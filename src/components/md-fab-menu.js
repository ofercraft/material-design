class FabMenu extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="fab.css">
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" rel="stylesheet" />
            <style>
                @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded");

                .material-symbols-rounded {
                    font-family: "Material Symbols Rounded";
                    font-weight: normal;
                    font-style: normal;
                    font-size: 24px;
                    line-height: 1;
                    letter-spacing: normal;
                    text-transform: none;
                    display: inline-block;
                    white-space: nowrap;
                    word-wrap: normal;
                    direction: ltr;
                }
            </style>
            <div class="fab-container">
                <div class="fab">
                    <span class="fab-icon material-symbols-rounded"></span>
                    <span class="fab-x material-symbols-rounded">close</span>
                </div>

                <div class="md-fab-menu"></div>
            </div>
        `;
    }

    connectedCallback() {
        this.renderFabIcon();
        this.renderMenuItems();
        this.attachEvents();
        this.applyDynamicHover();
        requestAnimationFrame(() => {
            this.removeAttribute("hidden");
        });
    }
    applyDynamicHover() {
        const styles = getComputedStyle(this);
        const menuBg = styles.getPropertyValue("--color-primary").trim();

        if (!menuBg) return;

        const hoverColor = this.computeHoverColor(menuBg);

        this.shadowRoot.host.style.setProperty("--md-hover", hoverColor);
    }

    renderFabIcon() {
        const iconName = this.getAttribute("fab-icon") || "edit";
        this.shadowRoot.querySelector(".fab-icon").textContent = iconName;
    }

    renderMenuItems() {
        const slotNodes = Array.from(this.children);
        const menu = this.shadowRoot.querySelector(".md-fab-menu");

        menu.innerHTML = "";

        this.items = slotNodes
            .filter(el => el.tagName.toLowerCase() === "button")
            .map(btn => ({
                icon: btn.getAttribute("icon"),
                label: btn.textContent.trim()
            }));

        menu.innerHTML = this.items
            .map(
                item => `
                <div class="fab-item" data-icon="${item.icon}">
                    <span class="item-icon material-symbols-rounded">${item.icon}</span>
                    ${item.label}
                </div>
            `
            )
            .join("");
    }

    attachEvents() {
        const fab = this.shadowRoot.querySelector(".fab");
        const menu = this.shadowRoot.querySelector(".md-fab-menu");

        fab.addEventListener("click", () => {
            fab.classList.toggle("open");
            menu.classList.toggle("open");
        });

        this.shadowRoot.querySelectorAll(".fab-item").forEach(item => {
            item.addEventListener("click", () => {
                const icon = item.getAttribute("data-icon");

                this.dispatchEvent(
                    new CustomEvent("fabmenu:select", {
                        detail: { icon },
                        bubbles: true,
                        composed: true
                    })
                );

                fab.classList.remove("open");
                menu.classList.remove("open");
            });
        });
    }

    computeHoverColor(base) {
        try {
            const color = CSSStyleValue.parse("color", base);
            const lch = color.to("lch");

            let [l, c, h] = [lch.l, lch.c, lch.h];

            if (l < 60) {
                // dark → lighten
                l = Math.min(95, l + 12);
            } else {
                // light → darken
                l = Math.max(20, l - 12);
            }

            const newColor = new Color("lch", [l, c, h]);
            return newColor.toString(); // e.g. "rgb(230 170 240)"
        } catch (e) {
            console.warn("LCH not supported, fallback to safe darkening.");

            // Fallback: subtract brightness safely
            const hex = base.replace("#", "");
            const num = parseInt(hex, 16);
            const r = (num >> 16) & 255;
            const g = (num >> 8) & 255;
            const b = num & 255;

            const darker = (v) => Math.max(0, v - 20);

            return `rgb(${darker(r)} ${darker(g)} ${darker(b)})`;
        }
    }


}

customElements.define("md-fab-menu", FabMenu);

export default FabMenu;
