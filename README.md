# Material Design 3 Web Components

A lightweight, modern Material Design 3 (Material You) web components library built with native Web Components API.

## Features

- 🎨 **Material You theming** with dynamic color generation
- 🧩 **Native Web Components** - works with any framework (React, Vue, Angular, Svelte, etc.)
- 🎯 **Zero dependencies** for runtime
- 🌈 **Customizable themes** with CSS variables
- 📦 **Tree-shakeable** ES modules
- ♿ **Accessible** components following Material Design guidelines

## Components

- **md-button** - Material Design buttons with multiple variants (filled, tonal, outlined, text, elevated, toggle)
- **md-fab** - Floating Action Buttons in small, medium, and large sizes
- **md-fab-menu** - Expandable FAB menu with custom items
- **md-slider** - Interactive sliders with horizontal and vertical orientations

## Installation

```bash
npm install @feldm/material-design-components
```

## Usage

### Using with a bundler (Vite, Webpack, etc.)

```javascript
// Import all components
import '@feldm/material-design-components';

// Or import specific components
import '@feldm/material-design-components/components/md-button.js';
import '@feldm/material-design-components/components/md-fab.js';

// Import color generator utility
import { MaterialYouColorGenerator } from '@feldm/material-design-components';

// Apply custom theme
const colorGen = new MaterialYouColorGenerator('#6750A4', { dark: false });
colorGen.applyToDocument();
```

### Using directly in HTML

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import 'https://unpkg.com/@feldm/material-design-components/dist/index.esm.js';
  </script>
</head>
<body>
  <!-- Use components -->
  <md-button type="filled">Click me</md-button>
  <md-fab icon="add" size="medium"></md-fab>
</body>
</html>
```

## Component Examples

### Button

```html
<!-- Filled button (default) -->
<md-button type="filled">Filled Button</md-button>

<!-- Tonal button -->
<md-button type="tonal">Tonal Button</md-button>

<!-- Outlined button -->
<md-button type="outlined">Outlined Button</md-button>

<!-- Text button -->
<md-button type="text">Text Button</md-button>

<!-- Elevated button -->
<md-button type="elevated">Elevated Button</md-button>

<!-- Toggle button -->
<md-button type="toggle">Toggle Button</md-button>

<!-- Button with icon -->
<md-button type="filled">
  <span slot="icon">favorite</span>
  Like
</md-button>

<!-- Sizes -->
<md-button size="small">Small</md-button>
<md-button size="medium">Medium</md-button>
<md-button size="large">Large</md-button>
```

### Floating Action Button (FAB)

```html
<!-- Small FAB -->
<md-fab icon="edit" size="small"></md-fab>

<!-- Medium FAB (default) -->
<md-fab icon="add" size="medium"></md-fab>

<!-- Large FAB -->
<md-fab icon="navigation" size="large"></md-fab>
```

### FAB Menu

```html
<md-fab-menu fab-icon="menu">
  <button icon="share">Share</button>
  <button icon="print">Print</button>
  <button icon="save">Save</button>
</md-fab-menu>

<script>
document.querySelector('md-fab-menu').addEventListener('fabmenu:select', (e) => {
  console.log('Selected:', e.detail.icon);
});
</script>
```

### Slider

```html
<!-- Horizontal slider -->
<md-slider min="0" max="100" value="50"></md-slider>

<!-- Vertical slider -->
<md-slider min="0" max="100" value="75" vertical></md-slider>

<script>
const slider = document.querySelector('md-slider');
slider.addEventListener('input', (e) => {
  console.log('Current value:', slider.value);
});
slider.addEventListener('change', (e) => {
  console.log('Final value:', slider.value);
});
</script>
```

## Theming

### Using the Color Generator

The package includes a Material You color generator that creates complete color schemes from a seed color:

```javascript
import { MaterialYouColorGenerator } from '@feldm/material-design-components';

// Create a light theme
const lightTheme = new MaterialYouColorGenerator('#6750A4', { dark: false });
lightTheme.applyToDocument();

// Create a dark theme
const darkTheme = new MaterialYouColorGenerator('#6750A4', { dark: true });
darkTheme.applyToDocument();

// Get CSS variables object
const cssVars = lightTheme.getCssVars();
console.log(cssVars);
// {
//   '--color-primary': '#...',
//   '--color-on-primary': '#...',
//   ...
// }
```

### Manual Theming with CSS Variables

All components use CSS custom properties for theming. You can customize them:

```css
:root {
  /* Primary colors */
  --color-primary: #6750a4;
  --color-on-primary: #ffffff;
  --color-primary-container: #eaddff;
  --color-on-primary-container: #21005d;
  
  /* Secondary colors */
  --color-secondary: #625b71;
  --color-on-secondary: #ffffff;
  --color-secondary-container: #e8def8;
  --color-on-secondary-container: #1d192b;
  
  /* Surface colors */
  --color-surface: #fffbfe;
  --color-on-surface: #1d1b20;
  
  /* Background colors */
  --color-background: #fffbfe;
  --color-on-background: #1d1b20;
  
  /* Outline */
  --color-outline: #79747e;
}
```

## Browser Support

- Chrome/Edge 54+
- Firefox 63+
- Safari 10.1+
- All modern browsers with Web Components support

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

feldm
