// import { MyNavbar } from "../MyNavbar/MyNavbar";
import { NavLinks } from "../NavLinks/NavLinks";
import "./MainHeader.css";

export const MainHeader = ({ drawerIsOpen, setDrawerIsOpen, openDrawer, isMoved, setIsMoved }) => {
  return (
    <>
      <div className="main-header">
        <button
          className="main-navigation__menu-btn"
          onClick={() => {
            openDrawer();
            setIsMoved(true);
          }}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">DAYSTRIDE</h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </div>
    </>
  );
};
