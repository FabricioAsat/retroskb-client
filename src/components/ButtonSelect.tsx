import { useState } from "react";
import { MangaState } from "../models/manga.model";

interface Props {
  selected: string;
  isDisabled: boolean;
  onAction: (state: MangaState) => void;
}

export const ButtonSelect = ({ selected, onAction, isDisabled }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  function openBox() {
    if (isDisabled) return;
    setIsOpen(true);
  }
  function closeBox() {
    if (isDisabled) return;
    setIsOpen(false);
  }
  function handleSelect(state: MangaState) {
    onAction(state);
    closeBox();
  }

  return (
    <div
      onMouseEnter={openBox}
      onMouseLeave={closeBox}
      className="relative w-full h-full"
    >
      <button
        disabled={isDisabled}
        type="button"
        className="p-2 w-full font-medium rounded-md border-2 cursor-pointer border-neutral-400 text-neutral-600 hover:text-neutral-800 hover:border-neutral-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Estado{" "}
        {selected && (
          <i className="font-semibold text-teal-600">"{selected}"</i>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full pt-2 w-full bg-transparent rounded-md">
          <div className="p-2 w-full rounded-md border-2 border-neutral-400 bg-neutral-100">
            {Object.values(MangaState).map((state) => (
              <span
                key={state}
                onClick={() => handleSelect(state)}
                className="block p-2 font-medium capitalize cursor-pointer text-neutral-600 hover:text-neutral-800"
              >
                {state}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
