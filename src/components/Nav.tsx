import { useContext } from "react";
import { Algo, Context } from "./utils/AlgoContext";

const Nav = () => {
  const { sort, settings, setSettings } = useContext(Context);

  const onArrayChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!setSettings) return;
    setSettings((c) => ({ ...c, arrayLen: +e.target.value * 5 }));
  };
  const onDelayChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!setSettings) return;
    setSettings((c) => ({ ...c, delay: +e.target.value }));
  };

  const onAlgoChange = (type: Algo) => {
    if (!setSettings) return;
    setSettings((c) => ({ ...c, algoType: type }));
    console.log("Selected algorithm:", type); // Log the new value directly
  };

  return (
    <nav className="w-screen bg-gray-300 grid grid-flow-row">
      <div className="flex items-center justify-center w-full my-4 gap-6">
        <button
          className={`border border-teal-100 shadow-md py-2 px-4 transition-all active:scale-95 ${settings.algoType === "merge sort" && "text-purple-700"}`}
          onClick={() => onAlgoChange("merge sort")}
        >
          Merge Sort
        </button>

        <button
          className={`border border-teal-100 shadow-md py-2 px-4 transition-all active:scale-95 ${settings.algoType === "insertion sort" && "text-purple-700"}`}
          onClick={() => onAlgoChange("insertion sort")}
        >
          Insertion Sort
        </button>

        <button
          className={`border border-teal-100 shadow-md py-2 px-4 transition-all active:scale-95 ${settings.algoType === "quick sort" && "text-purple-700"}`}
          onClick={() => onAlgoChange("quick sort")}
        >
          Quick Sort
        </button>

        <button
          className={`border border-teal-100 shadow-md py-2 px-4 transition-all active:scale-95 ${settings.algoType === "bubble sort" && "text-purple-700"}`}
          onClick={() => onAlgoChange("bubble sort")}
        >
          Bubble Sort
        </button>

        <button
          className={`border border-teal-100 shadow-md py-2 px-4 transition-all active:scale-95 ${settings.algoType === "heap sort" && "text-purple-700"}`}
          onClick={() => onAlgoChange("heap sort")}
        >
          Heap Sort
        </button>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => sort(settings.algoType)}
        >
          Sort
        </button>
      </div>

      <div className="flex flex-col items-center w-full pb-5">
        <label htmlFor="items_amount">Array Length: {settings.arrayLen}</label>
        <input
          type="range"
          name="items_amount"
          id="items_amount"
          className="w-full max-w-2xl"
          defaultValue={25}
          min={1}
          onChange={onArrayChange}
        />
        <label htmlFor="delay">Delay: {settings.delay}</label>
        <input
          type="range"
          name="delay"
          id="delay"
          className="w-full max-w-2xl"
          min={1}
          defaultValue={15}
          onChange={onDelayChange}
        />
      </div>
    </nav>
  );
};

export default Nav;
