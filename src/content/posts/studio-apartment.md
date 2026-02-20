---
title: Studio Apartment - Design Studio Website
featuredImage: /posts/studio-apartment/hero6.png
featuredImageWidth: 1536
featuredImageHeight: 797
imgClass: object-left-top
excerpt: Built a design studio portfolio website using Jekyll and CSS Grid, generating case studies from Markdown files with responsive image loading for optimal performance.
---

My brother asked me to help build the website for his design studio. We’d previously built his personal portfolio using Jekyll, so we recycled that codebase to create [studioapt.co](https://studioapt.co).

Generating the case studies from Markdown files allowed us to paste text and make edits without having to maintain (or look at) too much HTML, and responsive image loading features like `srcset` and `sizes` helped us ensure that images would be as crisp as possible without overloading mobile devices. When we previously built Gage’s personal portfolio, I used Masonry.js for the home page grid layout, but since the adoption of CSS Grid across browsers, I was able to replace Masonry.js with CSS Grid for better performance and a smoother visual effect on resize.

<img alt="Studio Apartment website screenshot" src="/posts/studio-apartment/33.png" />
