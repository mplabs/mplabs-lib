# mplabs-lib

A monorepo of modern, ergonomic wrappers for essential web APIs, focused on performance and usability. Each package provides a simplified, event-driven, and TypeScript-friendly interface for working with browser observers.

## Packages

### [`@mplabs/intersection-observer`](./packages/intersection-observer)
A better IntersectionObserver API. Observe when elements enter or leave the viewport with a callback or event listener approach.

- **Features:**
  - Simple API for observing intersections
  - Use as callback or event listener
  - TypeScript support
- **Example:**
  ```js
  import { intersectionObserver } from '@mplabs/intersection-observer';
  const node = document.getElementById('my-node');
  intersectionObserver(node, {
    callback: ({ entry }) => {
      // Handle intersection
    }
  });
  // Or as event listener
  node.addEventListener('intersection', (event) => {
    const { entry } = event.detail;
    // Handle intersection
  });
  ```

### [`@mplabs/mutation-observer`](./packages/mutation-observer)
A better MutationObserver API. Observe DOM mutations with a callback or event listener.

- **Features:**
  - Simple API for observing DOM changes
  - Use as callback or event listener
  - TypeScript support
- **Example:**
  ```js
  import { mutationObserver } from '@mplabs/mutation-observer';
  const node = document.getElementById('my-node');
  mutationObserver(node, {
    callback: ({ entry }) => {
      // Handle mutation
    }
  });
  // Or as event listener
  node.addEventListener('mutation', (event) => {
    const { entry } = event.detail;
    // Handle mutation
  });
  ```

### [`@mplabs/resize-observer`](./packages/resize-observer)
A better ResizeObserver API. Observe element resizes with a callback or event listener.

- **Features:**
  - Simple API for observing element size changes
  - Use as callback or event listener
  - TypeScript support
- **Example:**
  ```js
  import { resizeObserver } from '@mplabs/resize-observer';
  const node = document.getElementById('my-node');
  resizeObserver(node, {
    callback: ({ entry }) => {
      // Handle resize
    }
  });
  // Or as event listener
  node.addEventListener('resize', (event) => {
    const { entry } = event.detail;
    // Handle resize
  });
  ```

## Monorepo Structure
- `packages/` – Each observer tool as a separate package
- Shared configuration and scripts at the root

## License
ISC