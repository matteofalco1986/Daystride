import "./Backdrop.css";
export const Backdrop = ({ closeDrawer }) => {
  return <div className="backdrop" onClick={closeDrawer}></div>;
};
