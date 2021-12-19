import { useEffect, useRef, useState } from "react";

export default function ListHeading({
  name,
  listId,
  dragHandleProps,
  onDelete,
  onListRename,
}) {
  const menuRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * Handle list rename.
   */
  const handleListRename = () => {
    const newName = prompt("Rename list", name) || "";
    setIsMenuOpen(false);

    if (newName !== "") {
      onListRename(listId, newName);
    }
  };

  /**
   * Close the menu when clicking outside the menu.
   * @param {PointerEvent} event
   */
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="group flex relative">
      <h5
        className="pt-3 pb-2 px-4 w-full font-bold text-indigo-900 rounded-md cursor-pointer"
        {...dragHandleProps}
      >
        {name}
      </h5>

      <button
        className="mt-3 mr-3 group-hover:opacity-100 transition ease-in-out delay-100 w-6 h-6 rounded bg-white/60 hover:bg-white"
        onClick={() => setIsMenuOpen(true)}
      >
        <span className="sr-only">Open list actions</span>
        <div className="flex gap-[2px] p-1 justify-center">
          <div className="w-1 h-1 bg-slate-500 rounded-full" />
          <div className="w-1 h-1 bg-slate-500 rounded-full" />
          <div className="w-1 h-1 bg-slate-500 rounded-full" />
        </div>
      </button>

      {isMenuOpen ? (
        <div
          ref={menuRef}
          className="flex flex-col border border-indigo-900/10 px-2 py-3 rounded-lg absolute bg-white w-28 top-[46px] right-0 z-50 shadow-xl shadow-indigo-800/20"
        >
          <button
            className="py-2 px-3 rounded-lg font-medium text-left hover:bg-gray-100"
            onClick={handleListRename}
          >
            Rename
          </button>
          <button
            className="py-2 px-3 rounded-lg font-medium text-left hover:bg-gray-100"
            onClick={async () => {
              const confirm = window.confirm(
                "This action will delete tasks. Are you sure?",
              );
              setIsMenuOpen(false);

              if (confirm) {
                onDelete(listId);
              }
            }}
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}
