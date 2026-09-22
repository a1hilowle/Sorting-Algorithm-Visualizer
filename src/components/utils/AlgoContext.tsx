import { createContext, useEffect, useRef, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";
import { applyStep, generateSteps, type Step } from "../../sorting";

export type Algo = "merge sort" | "insertion sort" | "quick sort" | "bubble sort" | "heap sort";
type Settings = { algoType: Algo; arrayLen: number; delay: number };
const initialSettings: Settings = { algoType: "merge sort", arrayLen: 25, delay: 15 };
const randomArray = (length: number) => Array.from({ length }, () => Math.floor(Math.random() * 480) + 60);
const labels = {
  "merge sort": "Merge Sort",
  "insertion sort": "Insertion Sort",
  "quick sort": "Quick Sort",
  "bubble sort": "Bubble Sort",
  "heap sort": "Heap Sort",
} as const;

type SettingsContext = {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
  sort: (algorithm: Algo) => void;
  newArray: () => void;
  isSorting: boolean;
};
type Items = { items: number[]; activeIndices: number[] };

export const Context = createContext<SettingsContext>({
  settings: initialSettings,
  setSettings: () => undefined,
  sort: () => undefined,
  newArray: () => undefined,
  isSorting: false,
});
export const ItemsContext = createContext<Items>({ items: [], activeIndices: [] });

export default function AlgoContext({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(initialSettings);
  const [items, setItems] = useState(() => randomArray(initialSettings.arrayLen));
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const delay = useRef(settings.delay);
  const generation = useRef(0);
  delay.current = settings.delay;

  const stop = () => {
    generation.current++;
    window.clearTimeout(timer.current);
    setIsSorting(false);
    setActiveIndices([]);
  };

  const newArray = () => {
    stop();
    setItems(randomArray(settings.arrayLen));
  };

  useEffect(() => {
    stop();
    setItems(randomArray(settings.arrayLen));
    return () => window.clearTimeout(timer.current);
  }, [settings.arrayLen]);

  const sort = (algorithm: Algo) => {
    if (isSorting) return;
    const steps = generateSteps(items, labels[algorithm]);
    if (steps.length === 0) return;
    const run = ++generation.current;
    let values = [...items];
    let index = 0;
    setIsSorting(true);
    const next = () => {
      if (run !== generation.current) return;
      if (index >= steps.length) {
        setIsSorting(false);
        setActiveIndices([]);
        return;
      }
      const step: Step = steps[index++];
      values = applyStep(values, step);
      setItems(values);
      setActiveIndices(step.type === "write" ? [step.index] : step.indices);
      timer.current = window.setTimeout(next, delay.current);
    };
    next();
  };

  return <ItemsContext.Provider value={{ items, activeIndices }}>
    <Context.Provider value={{ settings, setSettings, sort, newArray, isSorting }}>{children}</Context.Provider>
  </ItemsContext.Provider>;
}
