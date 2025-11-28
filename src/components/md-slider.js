class MDSlider extends HTMLElement {
    static get observedAttributes() {
        return ["value", "min", "max", "vertical"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    /* Colors */
                    --slider-track-color: var(--color-surface-variant, #e0dcf5);
                    --slider-track-active-color: var(--color-primary, #6750a4);
                    --slider-handle-color: var(--color-primary, #6750a4);

                    /* Geometry */
                    --slider-track-thickness: 20px;
                    --slider-handle-thickness: 4px;   /* line thickness */
                    --slider-handle-length: 40px;     /* line length */

                    /* Overall size */
                    --slider-width: 200px;
                    --slider-height: 40px;

                    --slider-radius: 999px;
                    --slider-transition: 120ms ease-out;

                    display: inline-flex;
                    touch-action: none;
                }

                .container {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: var(--slider-width);
                    height: var(--slider-height);
                }

                :host([vertical]) .container {
                    width: var(--slider-height);
                    height: var(--slider-width);
                }

                /* TRACK – always fully rounded */
                .track {
                    position: relative;
                    background: var(--slider-track-color);
                    border-radius: var(--slider-radius);
                    width: 100%;
                    height: var(--slider-track-thickness);
                }

                :host([vertical]) .track {
                    width: var(--slider-track-thickness);
                    height: 100%;
                }

                /* FILLED PART – rectangle, not rounded */
                .track-fill {
                    position: absolute;
                    background: var(--slider-track-active-color);
                    /* rounded on the left only (top-left & bottom-left) */
                    border-radius: var(--slider-radius) 0 0 var(--slider-radius);
                    left: 0;
                    top: 0;
                    width: 0;
                    height: 100%;
                }


                /* vertical fill from bottom */
                :host([vertical]) .track-fill {
                    left: 0;
                    bottom: 0;
                    top: auto;
                    width: 100%;
                    height: 0;
                    border-radius: 0 0 var(--slider-radius) var(--slider-radius);
                }


                /* HANDLE = line */
                .handle {
                    position: absolute;
                    background: var(--slider-handle-color);
                    border-radius: 999px;
                    cursor: pointer;
                    transition: background var(--slider-transition), transform var(--slider-transition);
                    transform: translate(-50%, -50%); /* horizontal default */
                }

                /* horizontal: vertical line centered on track */
                :host(:not([vertical])) .handle {
                    width: var(--slider-handle-thickness);
                    height: var(--slider-handle-length);
                    top: 50%;
                }

                /* vertical: horizontal line; bottom aligns with fill top */
                :host([vertical]) .handle {
                    height: var(--slider-handle-thickness);
                    width: var(--slider-handle-length);
                    left: 50%;
                    transform: translate(-50%, 0); /* center X only */
                }

                .handle:active {
                    transform: translate(-50%, -50%) scale(1.05);
                }

                :host([vertical]) .handle:active {
                    transform: translate(-50%, 0) scale(1.05);
                }
            </style>

            <div class="container">
                <div class="track">
                    <div class="track-fill"></div>
                </div>
                <div class="handle"></div>
            </div>
        `;

        this.track = this.shadowRoot.querySelector(".track");
        this.trackFill = this.shadowRoot.querySelector(".track-fill");
        this.handleEl = this.shadowRoot.querySelector(".handle");

        this._onPointerMove = this._onPointerMove.bind(this);
        this._onPointerUp = this._onPointerUp.bind(this);
    }

    connectedCallback() {
        if (!this.hasAttribute("min")) this.setAttribute("min", "0");
        if (!this.hasAttribute("max")) this.setAttribute("max", "100");
        if (!this.hasAttribute("value")) this.setAttribute("value", "0");

        this.handleEl.addEventListener("mousedown", e => this._startDrag(e));
        this.track.addEventListener("mousedown", e => this._startDrag(e));
        this.handleEl.addEventListener("touchstart", e => this._startDrag(e), { passive: false });
        this.track.addEventListener("touchstart", e => this._startDrag(e), { passive: false });

        this.updateLayout();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal === newVal) return;
        if (!this.trackFill || !this.handleEl) return;
        this.updateLayout();
    }

    // ------- public API -------

    get value() {
        return parseFloat(this.getAttribute("value") || "0");
    }
    set value(v) {
        const clamped = Math.min(this.max, Math.max(this.min, v));
        this.setAttribute("value", clamped);
        this.dispatchEvent(new Event("input"));
    }

    get min() {
        return parseFloat(this.getAttribute("min") || "0");
    }

    get max() {
        return parseFloat(this.getAttribute("max") || "100");
    }

    get vertical() {
        return this.hasAttribute("vertical");
    }

    // ------- layout -------

    updateLayout() {
        const range = this.max - this.min || 1;
        const percent = (this.value - this.min) / range;
        const epsilon = 0.02; // ~2% of the range

        if (!this.vertical) {
            // HORIZONTAL: flatten left end while slider is near 0
            if (percent <= epsilon) {
                this.track.style.borderRadius = `0 var(--slider-radius) var(--slider-radius) 0`;
            } else {
                this.track.style.borderRadius = `var(--slider-radius)`;
            }
        } else {
            // VERTICAL: flatten bottom end while slider is near 0
            if (percent <= epsilon) {
                this.track.style.borderRadius = `var(--slider-radius) var(--slider-radius) 0 0`;
            } else {
                this.track.style.borderRadius = `var(--slider-radius)`;
            }
        }

        if (!this.vertical) {
            const leftPct = percent * 100;

            this.trackFill.style.width = `${leftPct}%`;
            this.trackFill.style.height = "100%";

            this.handleEl.style.left = `${leftPct}%`;
            this.handleEl.style.top = "50%";
        } else {
            let bottomPct = percent * 100;

            // Regular case: fill grows inside track
            // At 100%, we want the fill to extend ABOVE the rounded top
            if (percent >= 0.999) {
                this.trackFill.style.height = `calc(100% + var(--slider-handle-thickness))`;
            } else {
                this.trackFill.style.height = `${bottomPct}%`;
            }
            this.trackFill.style.width = "100%";

            this.handleEl.style.bottom = `${bottomPct}%`;
            this.handleEl.style.left = "50%";
        }
    }

    // ------- pointer logic -------

    _startDrag(e) {
        e.preventDefault();

        document.addEventListener("mousemove", this._onPointerMove);
        document.addEventListener("mouseup", this._onPointerUp);
        document.addEventListener("touchmove", this._onPointerMove, { passive: false });
        document.addEventListener("touchend", this._onPointerUp);

        this._updateFromEvent(e);
    }

    _onPointerMove(e) {
        e.preventDefault();
        this._updateFromEvent(e);
    }

    _onPointerUp() {
        document.removeEventListener("mousemove", this._onPointerMove);
        document.removeEventListener("mouseup", this._onPointerUp);
        document.removeEventListener("touchmove", this._onPointerMove);
        document.removeEventListener("touchend", this._onPointerUp);

        this.dispatchEvent(new Event("change"));
    }

    _updateFromEvent(e) {
        const rect = this.track.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        let percent;

        if (!this.vertical) {
            percent = (clientX - rect.left) / rect.width;
        } else {
            // bottom = 0, top = 1
            percent = (rect.bottom - clientY) / rect.height;
        }

        percent = Math.min(1, Math.max(0, percent));
        const range = this.max - this.min || 1;
        this.value = this.min + percent * range;
        this.updateLayout();
    }
}

customElements.define("md-slider", MDSlider);

export default MDSlider;
