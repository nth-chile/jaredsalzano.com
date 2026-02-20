---
title: Call & Response Music Practice Tool
featuredImage: /posts/music-practice/music-practice-big.png
featuredImageWidth: 1167
featuredImageHeight: 683
imgClass: object-center
excerpt: A Duolingo-style app that plays melodies for you to play back on your instrument, with automatic pitch detection and adaptive difficulty levels.
---

## What and why?

As an improvisational guitarist, I wanted to get better at playing what I heard in my head in real time. I’d seen videos of tabla and sitar players training with their teachers in a call-and-response style—the teacher sings a melody or rhythm, and the student plays it back. That kind of practice emphasizes listening and improvisation, both core aspects of Indian classical performance. I wondered if this type of practice would best train some of the conditional skills for improvising freely. I envisioned a Duolingo-style app that plays a melody without telling you what the notes are, listens while you play it back on your instrument of choice, and automatically adjusts to your ability, always providing the right amount of challenge.

## Before building

I wanted to avoid building something I wouldn’t use, so I started incorporating existing tools into my practice routine that were close to what I wanted, to see if they stuck and if, after a while, I wanted something more. When that did happen, I decided to explore a proof of concept.

I wasn’t sure if I’d be able to create a reliable melody detection algorithm that balanced quick responsiveness with the ability to distinguish the user’s intended note from noise, so I focused on that first.

## Pitch detection algorithm

I found a [library](https://github.com/peterkhayes/pitchfinder) that converts a mic stream into an integer representing a hertz value, which I could map to a note.

I filtered out low-amplitude noise, and surfaced a control allowing the user to adjust that amplitude. This is a commonly surfaced control, and I knew I needed to set mine high because NYC’s L train shakes my building.

To prevent the detected note from erratically changing in response to noise, I calculated the mode pitch per few hundred milliseconds. After tuning the sample rate and debounce rate, the algorithm was effectively able to focus on what the user was playing. It worked well! I knew that the slightest unreliability or clunkiness would frustrate the user (me), especially if it ruined their streak, but now I felt the concept was viable.

## Building the rest

Implementing melody (not just pitch) detection led to some interesting considerations, like letting the user play at their own tempo, regardless of the app’s playback tempo. And when generating a melody for the user to play, I realized it was important to avoid repeating notes and to ensure unique melodies, since repeating melodies could confuse users into thinking they got it wrong the first time. Then, I created a virtual instrument using an audio sprite and howler.js to play those melodies for the user.

Finally, I added levels that automatically changed based on the user’s success or failure streaks. I found a cool [React cookie library](https://www.npmjs.com/package/react-cookie) to persist the state to cookies.

Has it improved my ability to play what I hear in my head? Not sure, but I am slowly improving at the game. Check it out [here](https://music-practice.jaredsalzano.com/).