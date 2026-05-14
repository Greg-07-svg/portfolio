# portfolio · R³ Vector Space

Interactive 3D portfolio built with Three.js. Vectors radiate from the origin in R³ space — each endpoint is a clickable node that reveals info about me.

## How to run

**Just double-click `index.html`.** No server needed. (Requires internet for the Three.js CDN scripts.)

### Without internet
Open `index.html` in a browser that has already cached the CDN scripts, or download Three.js r128 locally and update the script `src` attributes in `index.html`.

## Project structure

```
portfolio/
├── index.html    loads everything
├── style.css     all visual styles
├── main.js       Three.js scene, logic, and your content
└── README.md     this file
```

## Customize

Edit the `DATA` object at the top of `main.js` — change the name, add/remove vectors, update content and colors.
