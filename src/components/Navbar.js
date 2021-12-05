import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b p-4 flex">
      <span className="font-bold pr-4">App</span>

      <ul className="flex">
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive ? "font-bold px-2" : " px-2";
            }}
            to="/"
          >
            Etusivu
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive ? "font-bold px-2" : " px-2";
            }}
            to="/about"
          >
            Tietoa
          </NavLink>
        </li>
      </ul>

      <ul className="flex ml-auto">
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive ? "font-bold px-2" : " px-2";
            }}
            to="/settings"
          >
            Asetukset
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
