import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkStyle = ({ isActive }) => {
    const active = "font-bold bg-white hover:bg-white";

    return `${
      isActive
        ? active
        : "font-medium hover:bg-indigo-900/5 active:bg-indigo-900/10"
    } text-indigo-900 px-3 py-2 transition-colors duration-200 rounded-lg`;
  };

  return (
    <nav className="mx-4 px-4 bg-indigo-50 rounded-xl flex items-center h-16">
      <NavLink
        className="font-logo text-2xl text-indigo-800 font-bold pr-4 uppercase"
        to="/"
      >
        POPSICLE
      </NavLink>

      <ul className="flex gap-1">
        <li>
          <NavLink className={linkStyle} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={linkStyle} to="/info">
            Info
          </NavLink>
        </li>
      </ul>
      <ul className="ml-auto">
        <li>
          <NavLink className={linkStyle} to="/settings">
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
