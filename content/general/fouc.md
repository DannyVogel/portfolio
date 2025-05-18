---
title: "Flash of Unstyled Content (FOUC)"
description: "Understanding Flash of Unstyled Content (FOUC) and how to avoid it"
date: 2025-05-18
tags: ["performance", "development", "scripts", "css", "FOUC"]
---

# The issue

There I was, happily programming away when I noticed a previously non-existent flash when first loading my application. Essentially things would load correctly but then the app would flash right at the end of the loading process. The issue with this particular bug was that I did not notice it immediately, which meant I was unsure what was causing it. Thats when I discovered the very appropriately named FOUC (I like to pronounce it "Fook", to reflect my feelings during the time I had to deal with it).

# What is FOUC?

FOUC stands for "flash of unstyled content". It occurs when a webpage briefly displays its content with either default styles, specific styles, or no styles at all before the other styles are applied, often due to the browser rendering the page before all resources, including CSS, are fully loaded. In my case, it really was just a flash, and not of unstyled content, as the styles had correctly loaded and remained after the flash.

# How to avoid FOUC

The best way to avoid FOUC is to ensure that all styles are loaded before the page is displayed, and in the correct order.

This is sometimes easier said than done, and in my case, after lots of digging and debugging, the issue was that the styles were being loaded in a script, which was not being executed until after the page was displayed (set to load onNuxtReady, so essentialy once the client had fully loaded). And on top of that, it was a script that I incorrectly assumed did not need, and therefore would not inject, any CSS, which is why I initially ignored it.

All in all, a good example of why testing is important every step of the way, and to be aware of exactly what you're bringing in to your project.
