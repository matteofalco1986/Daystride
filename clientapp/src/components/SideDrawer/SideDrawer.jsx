import React from "react";
import { CSSTransition } from "react-transition-group";
import "./SideDrawer.css";
import { useEffect } from "react";

export const SideDrawer = (props) => {
  return (
    <aside
      className="side-drawer outside"
      onClick={props.onClick}
    >
      {props.children}
    </aside>
  );
};
