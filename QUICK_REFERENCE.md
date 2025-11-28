# Quick Reference Guide

## 🚀 Quick Start Commands

```powershell
# Install dependencies
npm install

# Build the package
npm run build

# Initialize Git
git init
git add .
git commit -m "Initial commit"

# Push to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/material-design-components.git
git branch -M main
git push -u origin main

# Publish to npm
npm login
npm publish --access public
```

---

## 📦 Package Structure

```
material_design/
├── src/
│   ├── components/
│   │   ├── md-button.js       # Material Design button
│   │   ├── md-fab.js          # Floating Action Button
│   │   ├── md-fab-menu.js     # FAB menu
│   │   └── md-slider.js       # Slider component
│   ├── utils/
│   │   └── color_generator.js # Material You color generator
│   └── index.js               # Main entry point
├── dist/                      # Built files (generated)
├── package.json              # Package configuration
├── rollup.config.js          # Build configuration
├── README.md                 # Documentation
├── LICENSE                   # MIT License
├── .gitignore               # Git ignore rules
├── .npmignore               # npm ignore rules
└── demo.html                # Demo page
```

---

## 🎨 Component Quick Reference

### md-button
```html
<md-button type="filled|tonal|outlined|text|elevated|toggle" 
           size="extra-small|small|medium|large|extra-large"
           shape="square|round"
           selected>
  Button Text
</md-button>
```

### md-fab
```html
<md-fab icon="icon_name" 
        size="small|medium|large">
</md-fab>
```

### md-fab-menu
```html
<md-fab-menu fab-icon="menu">
  <button icon="icon_name">Label</button>
</md-fab-menu>
```

### md-slider
```html
<md-slider min="0" 
           max="100" 
           value="50"
           vertical>
</md-slider>
```

---

## 🎯 Installation Methods

### From npm (after publishing)
```bash
npm install @ofercraft/material-design
```

### From GitHub
```bash
npm install github:ofercraft/material-design
```

### Direct in HTML
```html
<script type="module">
  import 'https://unpkg.com/@ofercraft/material-design';
</script>
```

---

## 🌈 Theming

### JavaScript
```javascript
import { MaterialYouColorGenerator } from '@ofercraft/material-design';

const theme = new MaterialYouColorGenerator('#6750A4', { dark: false });
theme.applyToDocument();
```

### CSS Variables
```css
:root {
  --color-primary: #6750a4;
  --color-on-primary: #ffffff;
  --color-secondary: #625b71;
  --color-surface: #fffbfe;
  --color-background: #fffbfe;
  --color-outline: #79747e;
}
```

---

## 📝 Version Management

```powershell
# Patch: 1.0.0 → 1.0.1 (bug fixes)
npm version patch

# Minor: 1.0.0 → 1.1.0 (new features)
npm version minor

# Major: 1.0.0 → 2.0.0 (breaking changes)
npm version major

# Then publish
npm run build
npm publish
git push && git push --tags
```

---

## 🔗 Important Links

After setup, your package will be available at:

- **GitHub**: `https://github.com/ofercraft/material-design`
- **npm**: `https://www.npmjs.com/package/@ofercraft/material-design`
- **unpkg CDN**: `https://unpkg.com/@ofercraft/material-design`

---

## ✅ Pre-Publish Checklist

- [ ] Updated `package.json` with your GitHub username
- [ ] Ran `npm install`
- [ ] Ran `npm run build` successfully
- [ ] Created GitHub repository
- [ ] Pushed code to GitHub
- [ ] Logged into npm with `npm login`
- [ ] Chosen unique package name
- [ ] Ready to run `npm publish --access public`

---

## 🆘 Common Issues

**Problem**: Package name already exists  
**Solution**: Use scoped package `@ofercraft/material-design`

**Problem**: Build fails  
**Solution**: Run `npm install` to ensure dependencies are installed

**Problem**: Can't push to GitHub  
**Solution**: Check remote URL with `git remote -v`

**Problem**: npm publish fails  
**Solution**: Make sure you're logged in with `npm login`
