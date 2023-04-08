<h1 align="center">
  <a href="https://lime7.github.io/greens">Greens Project</a>
</h1>

> Green is a test landing page for ordering organic products. <br/>
> In the future, this is a multi-page online store <br/>
> with an application for mobile devices.

## Technologies:

- Tailwind CSS
- HTML / SCSS / Javascript
- Webpack 5

## Plugins:

- [fslightbox](https://fslightbox.com/)
- [gsap](https://greensock.com/gsap/)
- [swiper](https://swiperjs.com/)

## Design:

- [figma](https://www.figma.com/)


## Example code:

<p><strong>HTML:</strong></p>

```html
<picture>
  <source
    srcset="<%=require('../images/webp/img-1.webp')%>"
    type="image/webp"
  >
  <source
    srcset="<%=require('../images/img-1.png')%>"
    type="image/png"
  >
  <img
    src="<%=require('../images/img-1.png')%>"
    alt=""
    class="
      select-none
      max-w-full
      lg:max-w-auto
      lg:animate-move-bounce-y
    "
  >
</picture>
```

```html
<h6
  class="
    gs_reveal
    text-sm
    sm:text-base
    sm:leading-tight
    md:text-xl
    md:leading-tight
    lg:text-2xl
    lg:leading-7
    font-medium
    lg:font-semibold
    uppercase
    tracking-[2px]
    text-white
    mb-2
    md:mb-4
    lg:mb-6
  ">
    100% Organic Products
</h6>
```

<p><strong>SCSS:</strong></p>

```scss
@apply text-dark;
```

```scss
background-color: theme('colors.orange.600');
```

## Installation

Clone this repo and npm install.

```bash
npm i
```

## Usage

### Development server

```bash
npm start
```

You can view the development server at `localhost:8080`.

### Production build

```bash
npm run build
```


