---
title: Linode - Style Guide Website
featuredImage: /posts/linode/linode-colors.png
featuredImageWidth: 2376
featuredImageHeight: 1476
imgClass: object-center
excerpt: Created a style guide website documenting Linode's design system, providing developers and editors with copy-pasteable, zero-dependency code blocks for maintaining consistency across their pages.
---

Before its acquisition by Akamai, Linode was a cloud service provider offering a variety of developer-friendly back-end web services. I helped them create a site that documented their style guide, providing developers and non-technical editors with a reference as well as copy-pasteable, zero-dependency code blocks for use in their pages.

To provide HTML and CSS code blocks that editors could paste into any page without breaking the design, we couldn’t rely on utility classes like those in Tailwind CSS which handle cross-browser quirks behind the scenes, and we couldn’t assume the presence of a CSS reset like normalize.css. We included all necessary CSS rules directly in the code blocks, and we used prefixed class names to avoid conflicts.

The client suggested that we use Hugo to build the site. I gladly accepted the opportunity to learn a new static site generator I had been curious about, and I really enjoyed its approach to scaffolding static sites, creating reusable shortcodes, and its templating language.

This project laid the groundwork for a more scalable and consistent content strategy, reducing developer reliance and empowering non-technical editors to maintain design consistency across content.

<img alt="Linode logo" src="/posts/linode/linode-1.webp" />
