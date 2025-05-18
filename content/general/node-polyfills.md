---
title: "Node Polyfills in Modern Web Development"
description: "Understanding when (and when not) to use Node polyfills in modern web applications"
date: 2025-05-18
tags: ["node", "polyfills", "web3", "development"]
---

# The issue

The frontend application I worked on relied heavily on the web3Auth client side library for web3 wallet generation. While tasked with setting it up, simply following the documentation was not enough, and I soon discovered the world of Node polyfills.

Following the docuemntation to the letter, the application kept logging things like:

```
ReferenceError: process is not defined
ReferenceError: global is not defined
ReferenceError: buffer is not defined
```

This is where the documentation fell short, failing to mention the need for Node polyfills in a browser environment. (The documentation has thankfully been updated since then. At least falling down this rabbit hole was a good learning experience.)

# What is a Polyfill?

A polyfill is a piece of code (or plugin) that provides a browser-native implementation of a feature that is not natively supported by the browser. In the context of modern web development, polyfills are used to ensure browsers can use a feature that is not natively supported by the browser, such as Node.js core modules.

# Node Polyfills in Modern Web Development

Node polyfills are becoming increasingly unnecessary in modern web development, with browser APIs and modern development practices eliminating many historical dependencies. However, there are still specific scenarios where you might encounter them, particularly in certain Web3 development contexts or when using specific libraries that still require modules such as:

- Buffer
- Global
- Crypto
- Process

While implementing these polyfills is possible, the downside is that they will increase the bundle size of your application, slowing down your application and increasing your build time.

In my case, the library plus the polyfills increased the build time a very noticeable amount, which in turn slowed down the entire development process. This is something I always noticed, causing me to periodically check for newer versions of the library or research ways to remove the library from the frontend application entirely. Ultimately, newer versions required less polyfills, but eventually our team managed to remove the library from the frontend application entirely, managing the wallet creation process in a separate backend application (This was a good and happy day for me!) while maintaining the same functionality and user experience.

It is therefore important to only implement the polyfills that are actually needed, or to find alternatives that are not as heavy or dependent on Node.js, in order to maintain a performant application.

If they are needed, there are a few ways to implement them.

As of Nuxt 3.10, there is experimental support for polyfilling key Node.js built-ins on the client side, similar to how Nitro handles this on the server when deploying to non-Node environments. This means you can:

1. Import Node.js built-ins directly in your client-side code:

```ts
import { Buffer } from "node:buffer";
import process from "node:process";
```

2. Or create global polyfills through a Nuxt plugin:

```ts
// plugins/node.client.ts
import { Buffer } from "node:buffer";
import process from "node:process";

globalThis.Buffer = Buffer;
globalThis.process = process;

export default defineNuxtPlugin({});
```

Other solutions include using vite-plugin-node-polyfills, or more manual methods of bundling the polyfills into a single file.
