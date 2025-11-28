export class MaterialYouColorGenerator {
    constructor(seedColor = "#6750A4", options = {}) {
        this.seed = this.parseColor(seedColor);
        this.dark = options.dark || false;

        this.tones = this.generateTonalPalette(this.seed);
        this.scheme = this.generateScheme(this.tones, this.dark);
    }

    applyToDocument(target = document.documentElement) {
        const vars = this.schemeToCssVars(this.scheme);
        for (const key in vars) {
            target.style.setProperty(key, vars[key]);
        }

        target.style.background = vars["--color-background"];
        target.style.color = vars["--color-on-background"];
    }

    getCssVars() {
        return this.schemeToCssVars(this.scheme);
    }

    // -----------------------------
    // Material You Tonal Palettes
    // -----------------------------
    generateTonalPalette(rgb) {
        const [h, s, l] = this.rgbToHsl(...rgb);
        const palette = {};

        for (let tone = 0; tone <= 100; tone += 5) {
            palette[tone] = this.hslToHex(h, s, tone / 100);
        }
        return palette;
    }

    // -----------------------------
    // UPDATED SCHEME (Your rules)
    // -----------------------------
    generateScheme(tones, dark) {
        if (dark) {
            return {
                "--color-primary": tones[65],              // seed-like, bright
                "--color-primary-hover": tones[45],
                "--color-on-primary": tones[20],

                "--color-primary-container": tones[30],
                "--color-on-primary-container": tones[90],

                "--color-secondary": tones[30],
                "--color-on-secondary": "#ffffff",

                "--color-background": this.generateDarkBackgroundColor(tones[80]),

                "--color-on-background": tones[90],

                "--color-surface": tones[10],
                "--color-on-surface": tones[90],

                "--color-outline": tones[40]
            };
        }

        // LIGHT THEME
        return {
            "--color-primary": tones[30],               // darker than seed
            "--color-primary-hover": tones[55],         // slightly lighter
            "--color-on-primary": tones[100],

            "--color-primary-container": tones[90],
            "--color-on-primary-container": tones[10],

            "--color-secondary": tones[60],
            "--color-on-secondary": tones[100],

            "--color-background": tones[99],
            "--color-on-background": tones[10],

            "--color-surface": tones[100],
            "--color-on-surface": tones[10],

            "--color-outline": tones[50]
        };
    }

    schemeToCssVars(scheme) {
        return scheme;
    }

    // -----------------------------
    // Color Math
    // -----------------------------
    parseColor(hex) {
        hex = hex.replace("#", "");
        return [
            parseInt(hex.substring(0, 2), 16),
            parseInt(hex.substring(2, 4), 16),
            parseInt(hex.substring(4, 6), 16)
        ];
    }

    rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        let h, s;
        let l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r: h = ((g - b) / d) + (g < b ? 6 : 0); break;
                case g: h = ((b - r) / d) + 2; break;
                case b: h = ((r - g) / d) + 4; break;
            }
            h *= 60;
        }

        return [h, s, l];
    }

    hslToHex(h, s, l) {
        h /= 360;

        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        const r = Math.round(hue2rgb(p, q, h + 1/3) * 255);
        const g = Math.round(hue2rgb(p, q, h) * 255);
        const b = Math.round(hue2rgb(p, q, h - 1/3) * 255);

        return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
    }




    generateDarkBackgroundColor(seedHex) {
        const [r, g, b] = this.parseColor(seedHex);
        let [h, s, l] = this.rgbToHsl(r, g, b);

        // Strong desaturation (neutral-like)
        s *= 0.10;   // 10% saturation

        // Deep dark tone
        l = 0.10;    // 10% lightness

        return this.hslToHex(h, s, l);
    }


}
