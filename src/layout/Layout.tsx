import { NavLink, Outlet } from "react-router-dom";
import { menuList } from "../router/menu";
import "./Layout.css";

export default function Layout() {
  return (
    <>
      <header>
        <h1>💻 DB 성능 튜닝 & 비교 강의 데모</h1>
      </header>

      <nav>
        {menuList.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              isActive ? "nav-btn active" : "nav-btn"
            }
          >
            {menu.label}
          </NavLink>
        ))}
      </nav>

      <section className="content">
        <Outlet />
      </section>
    </>
  );
}
