import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b-2 border-indigo-900/20 px-4 flex items-center h-16">
      <span className="font-bold pr-4">Popsicle</span>
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
      <ul class="ml-auto">
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
