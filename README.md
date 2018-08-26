# Parallax Background
Add a parallax scrolling effect to html elements with a backround image.

## Usage
### 1. Import the `/dist/parallax.css.js` file into your project

#### HTML:
```html
<script src="/dist/parallax.min.js"></script>
```

#### Node:
```javascript
import '/dist/parallax.min.js';
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

Optionally you can also import `/dist/parallax.min.css` to implement the following properties:
```css
.parallax {
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
}
```


#### HTML Import:
```html
<link rel="stylesheet" href="/dist/parallax.min.css" />
```

#### Node:
```javascript
import '/dist/parallax.min.css';
```
