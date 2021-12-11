import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkStyle = ({ isActive }) => {
    return isActive
      ? "text-indigo-900 font-bold px-2"
      : "text-indigo-900 font-medium px-2";
  };
  return (
    <nav className="m-4 mb-0 px-4 bg-indigo-50 rounded-xl flex items-center h-16">
      <NavLink className="font-logo text-2xl font-bold pr-4 uppercase" to="/">
        <span className="text-orange-500">P</span>
        <span className="text-amber-500">O</span>
        <span className="text-yellow-500">P</span>
        <span className="text-lime-500">S</span>
        <span className="text-green-500">I</span>
        <span className="text-emerald-500">C</span>
        <span className="text-teal-500">L</span>
        <span className="text-cyan-500">E</span>
      </NavLink>

      <ul className="flex">
        <li>
          <NavLink className={linkStyle} to="/">
            Etusivu
          </NavLink>
        </li>
        <li>
          <NavLink className={linkStyle} to="/about">
            Tietoa
          </NavLink>
        </li>
      </ul>
      <ul className="ml-auto">
        <li>
          <NavLink className={linkStyle} to="/settings">
            Asetukset
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
