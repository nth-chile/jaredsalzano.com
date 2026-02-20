---
title: fs-shows - Concert Streaming Library
featuredImage: /posts/fs-shows/fs-shows-4.png
imgClass: object-bottom-left
excerpt: A flexible npm library that generates a browsing and streaming experience from a remote filesystem, using filename conventions to organize concerts.
---

As a jam band fan, I’ve always used apps like [Relisten](https://relisten.net/) to listen to concerts. When I was learning to code and needed something to build, I made something similar—several iterations, over the years, depending on the tech or concepts I was curious about at the time.

Our band records every show we play and makes them available for streaming. I wanted my personal storage location to double as a host for streaming so I didn’t have to manually publish them. With a structured filename format like `/{date}-{trackNumber}-{name}@{venue}.mp3`, [fs-shows](https://github.com/nth-chile/fs-shows/) is able to generate a browsing and streaming experience from a remote filesystem. There’s an additional benefit to this—it encourages me to name my files properly, which I’ve failed to do in the past and lost track of what was what.

I built it as a library (and published it on npm) so it’s flexible, modular, and extensible. It uses backend adapters to work with your storage service of choice. It also works well on mobile, which is important for any music player.

[See plans for improvements](https://github.com/nth-chile/fs-shows/issues).