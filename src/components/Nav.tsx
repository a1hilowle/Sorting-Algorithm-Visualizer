import { useContext } from "react";
import { Algo, Context } from "./utils/AlgoContext";

const Nav = () => {
  const { sort, settings, setSettings, newArray, isSorting } = useContext(Context);

  const onArrayChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSettings((c) => ({ ...c, arrayLen: +e.target.value * 5 }));
  };
  const onDelayChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSettings((c) => ({ ...c, delay: +e.target.value }));
  };

  const onAlgoChange = (type: Algo) => {
    setSettings((c) => ({ ...c, algoType: type }));
  };

  return (
    <nav className="w-screen bg-gray-300 grid grid-flow-row">
      <div className="flex items-center justify-center w-full my-4 gap-6">
        <button
          className={`border border-teal-100 shadow-md py-2 px-4 transition-all active:scale-95 ${settings.algoType === "merge sort" && "text-purple-700"}`}
          onClick={() => onAlgoChange("merge sort")}
          disabled={isSorting}
        >
          Merge Sort
        </button>

        <button
          className={`border border-teal-100 shadow-md py-2 px-4 transition-all active:scale-95 ${settings.algoType === "insertion sort" && "text-purple-700"}`}
          onClick={() => onAlgoChange("insertion sort")}
          disabled={isSorting}
        >
          Insertion Sort
        </button>

        <button
          className={`border border-teal-100 shadow-md py-2 px-4 transition-all active:scale-95 ${settings.algoType === "quick sort" && "text-purple-700"}`}
          onClick={() => onAlgoChange("quick sort")}
          disabled={isSorting}
        >
          Quick Sort
        </button>

        <button
          className={`border border-teal-100 shadow-md py-2 px-4 transition-all active:scale-95 ${settings.algoType === "bubble sort" && "text-purple-700"}`}
          onClick={() => onAlgoChange("bubble sort")}
          disabled={isSorting}
        >
          Bubble Sort
        </button>

        <button
          className={`border border-teal-100 shadow-md py-2 px-4 transition-all active:scale-95 ${settings.algoType === "heap sort" && "text-purple-700"}`}
          onClick={() => onAlgoChange("heap sort")}
          disabled={isSorting}
        >
          Heap Sort
        </button>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => sort(settings.algoType)}
          disabled={isSorting}
        >
          {isSorting ? "Sorting..." : "Sort"}
        </button>
        <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800" onClick={newArray}>
          New Array
        </button>
      </div>

      <div className="flex flex-col items-center w-full pb-5">
        <label htmlFor="items_amount">Array Length: {settings.arrayLen}</label>
        <input
          type="range"
          name="items_amount"
          id="items_amount"
          className="w-full max-w-2xl"
          value={settings.arrayLen / 5}
          min={2}
          max={20}
          onChange={onArrayChange}
        />
        <label htmlFor="delay">Delay: {settings.delay}</label>
        <input
          type="range"
          name="delay"
          id="delay"
          className="w-full max-w-2xl"
          min={1}
          value={settings.delay}
          max={100}
          onChange={onDelayChange}
        />
      </div>
    </nav>
  );
};

export default Nav;
