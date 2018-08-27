# Parallax Background
Add a parallax scrolling effect to html elements with a backround image.

**DEMO**: https://danielhoegel.github.io/parallax-background/

## Usage
### 1. Import the `/dist/parallax.min.js` file into your project

```html
<script src="/dist/parallax.min.js"></script>
```

### 2. Add the class `parallax` to the element with the background image
```html
<div class="my-element parallax"></div>
<style>
  .my-element {
    background-image: url('...');
    background-size: cover;
    padding: 100px;
  }
</style>
```

### 3. (optional) Import the `/dist/polyfill.min.js` file **before** the `parallax.min.js` file to add ES5 polyfills
```html
<script src="/dist/polyfill.min.js"></script>
```
Used polyfills:
- document.**querySelector**
- document.**querySelectorAll**
- NodeList.prototype.**forEach**
