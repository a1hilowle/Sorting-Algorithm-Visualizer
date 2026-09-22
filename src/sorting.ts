export const algorithmNames = ["Bubble Sort", "Insertion Sort", "Merge Sort", "Quick Sort", "Heap Sort"] as const;
export type Algorithm = (typeof algorithmNames)[number];

export type Step =
  | { type: "compare"; indices: [number, number] }
  | { type: "swap"; indices: [number, number] }
  | { type: "write"; index: number; value: number };

export function generateSteps(input: number[], algorithm: Algorithm): Step[] {
  const values = [...input];
  const steps: Step[] = [];
  const compare = (a: number, b: number) => steps.push({ type: "compare", indices: [a, b] });
  const swap = (a: number, b: number) => {
    if (a === b) return;
    [values[a], values[b]] = [values[b], values[a]];
    steps.push({ type: "swap", indices: [a, b] });
  };
  const write = (index: number, value: number) => {
    values[index] = value;
    steps.push({ type: "write", index, value });
  };

  if (algorithm === "Bubble Sort") {
    for (let end = values.length - 1; end > 0; end--) {
      let changed = false;
      for (let index = 0; index < end; index++) {
        compare(index, index + 1);
        if (values[index] > values[index + 1]) {
          swap(index, index + 1);
          changed = true;
        }
      }
      if (!changed) break;
    }
  } else if (algorithm === "Insertion Sort") {
    for (let index = 1; index < values.length; index++) {
      let current = index;
      while (current > 0) {
        compare(current - 1, current);
        if (values[current - 1] <= values[current]) break;
        swap(current - 1, current);
        current--;
      }
    }
  } else if (algorithm === "Merge Sort") {
    const merge = (start: number, end: number): void => {
      if (end - start < 2) return;
      const middle = Math.floor((start + end) / 2);
      merge(start, middle);
      merge(middle, end);
      const left = values.slice(start, middle);
      const right = values.slice(middle, end);
      let a = 0;
      let b = 0;
      let output = start;
      while (a < left.length && b < right.length) {
        compare(start + a, middle + b);
        write(output++, left[a] <= right[b] ? left[a++] : right[b++]);
      }
      while (a < left.length) write(output++, left[a++]);
      while (b < right.length) write(output++, right[b++]);
    };
    merge(0, values.length);
  } else if (algorithm === "Quick Sort") {
    const quick = (low: number, high: number): void => {
      if (low >= high) return;
      const pivot = values[high];
      let boundary = low;
      for (let index = low; index < high; index++) {
        compare(index, high);
        if (values[index] <= pivot) swap(boundary++, index);
      }
      swap(boundary, high);
      quick(low, boundary - 1);
      quick(boundary + 1, high);
    };
    quick(0, values.length - 1);
  } else {
    const heapify = (size: number, root: number): void => {
      let largest = root;
      const left = root * 2 + 1;
      const right = left + 1;
      if (left < size) {
        compare(left, largest);
        if (values[left] > values[largest]) largest = left;
      }
      if (right < size) {
        compare(right, largest);
        if (values[right] > values[largest]) largest = right;
      }
      if (largest !== root) {
        swap(root, largest);
        heapify(size, largest);
      }
    };
    for (let root = Math.floor(values.length / 2) - 1; root >= 0; root--) heapify(values.length, root);
    for (let end = values.length - 1; end > 0; end--) {
      swap(0, end);
      heapify(end, 0);
    }
  }
  return steps;
}

export function applyStep(values: number[], step: Step): number[] {
  if (step.type === "compare") return values;
  const next = [...values];
  if (step.type === "swap") {
    const [a, b] = step.indices;
    [next[a], next[b]] = [next[b], next[a]];
  } else {
    next[step.index] = step.value;
  }
  return next;
}
