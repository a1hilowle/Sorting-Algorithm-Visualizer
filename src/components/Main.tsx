import { useContext } from "react";
import { Context, ItemsContext } from "./utils/AlgoContext";

const Main = () => {
  const { items } = useContext(ItemsContext);
  const { settings } = useContext(Context);

  return (
    <section className="row-span-5 p-4">
      <div className="flex w-full h-full items-end bg-gray-100 rounded border">
        {items.map((item, idx) => (
          <div
            key={`${item}-${settings.arrayLen}-${idx}`}
            className="flex-1 bg-blue-500 mx-px"
            style={{
              height: `${item / 7}%`,
            }}
            id={`${idx}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Main;
