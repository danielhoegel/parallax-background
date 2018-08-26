# Parallax Background

## Usage
### 1. Import the `/js/parallax.js` file into your project

#### HTML:
```html
<script src="/js/parallax.js"></script>
```

#### Node:
```javascript
import '/js/parallax.js';
```

### 2. Add the class `parallax` to the element with the background image and set the background-attachment to fixed
```html
<div class="my-element parallax"></div>
<style>
  .my-element {
    background-image: url('...');
    background-size: cover;
    background-attachment: fixed;
    padding: 100px;
  }
</style>
```
