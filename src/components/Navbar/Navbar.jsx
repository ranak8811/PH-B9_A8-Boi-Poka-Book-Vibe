import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const links = (
    <div className="lg:space-x-4 flex flex-col lg:flex-row">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/listedBooks"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Listed Books
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/pagesToRead"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Pages to Read
        </NavLink>
      </li>
    </div>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl">
          Book Vibe
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end space-x-4">
        <a className="btn bg-[#23BE0A] text-white">Sign in</a>
        <a className="btn bg-[#59C6D2] text-white">Sign up</a>
      </div>
    </div>
  );
};

export default Navbar;
