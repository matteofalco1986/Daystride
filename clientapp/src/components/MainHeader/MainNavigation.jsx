import "./MainNavigation.css";
import { NavLinks } from "../NavLinks/NavLinks";
import { SideDrawer } from "../SideDrawer/SideDrawer";
import { MainHeader } from "./MainHeader";
import { useState } from "react";
import { Backdrop } from "../UIElements/Backdrop";

export const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isMoved, setIsMoved] = useState(false);

  const openDrawer = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };

  const props = {
    drawerIsOpen,
    setDrawerIsOpen,
    openDrawer,
    closeDrawer,
    isMoved,
    setIsMoved,
  };

  return (
    <>
      {drawerIsOpen ? (
        <>
          <SideDrawer
            show={drawerIsOpen}
            onClick={() => {
              closeDrawer();
            }}
          >
            <nav className="main-navigation__drawer-nav">
              <NavLinks {...props} />
            </nav>
          </SideDrawer>
          <Backdrop {...props} />
        </>
      ) : null}
      <MainHeader {...props} />
    </>
  );
};
