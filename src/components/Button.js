export default function Button({onClick, children}) {
  return (
    <button
      className="bg-indigo-50 active:bg-white font-bold border border-indigo-900/20 text-indigo-800 ease-in-out duration-100 rounded-xl active:rounded-md active:rounded py-2 px-4 shadow shadow-indigo-900/20"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
