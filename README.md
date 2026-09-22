# Sorting Algorithm Visualizer

A browser-based sorting visualizer built with React and TypeScript. The original bar-chart interface is preserved, and all five algorithm buttons now run complete, animated implementations.

**[Try the live demo](https://a1hilowle.github.io/Sorting-Algorithm-Visualizer/)**

## Features

- Watch values move through **Merge, Insertion, Quick, Bubble, and Heap Sort**.
- Highlight the values involved in the current comparison, swap, or write.
- Change the array length from 10 to 100 values.
- Adjust animation delay from 1 to 100 milliseconds, including while sorting.
- Generate a fresh random array at any time with **New Array**.
- Switch algorithms and compare how they sort a new array.

| Algorithm | Average time | Worst time | Extra space |
| --- | --- | --- | --- |
| Merge Sort | O(n log n) | O(n log n) | O(n) |
| Insertion Sort | O(n²) | O(n²) | O(1) |
| Quick Sort | O(n log n) | O(n²) | O(log n) average |
| Bubble Sort | O(n²) | O(n²) | O(1) |
| Heap Sort | O(n log n) | O(n log n) | O(1) |

The animation is intended for learning rather than benchmarking execution speed. Duplicate values are supported.

## Run locally

Requires Node.js 20.19+ or 22.12+ and npm.

```bash
git clone https://github.com/a1hilowle/Sorting-Algorithm-Visualizer.git
cd Sorting-Algorithm-Visualizer
npm ci
npm run dev
```

Open the local URL printed by Vite. To validate changes:

```bash
npm test
npm run build
npm run preview
```

## How it works

The sorting functions in `src/sorting.ts` take a copy of the current array and produce a list of comparisons, swaps, and writes. A shared playback controller in `src/components/utils/AlgoContext.tsx` applies those operations to React state, highlights the active bars, and handles cancellation when a new array or array size is chosen. The visual interface is in `src/components/Nav.tsx` and `src/components/Main.tsx`.

`src/sorting.test.ts` checks every algorithm with empty, single-value, duplicate, reversed, and sorted inputs. The app runs entirely in the browser; it needs no account or database.

## Deployment

GitHub Actions runs the tests and production build on each push to `main`, then publishes the static `dist` folder to GitHub Pages. The Vite base path matches this repository's Pages URL.

## What changed from the original project

The original design remains in place. This update completes the previously empty Quick, Bubble, and Heap Sort paths, moves animation updates into React state so regeneration safely stops old animations, adds a New Array button, updates the build tooling to Vite, and adds automated correctness tests and a live deployment workflow.
