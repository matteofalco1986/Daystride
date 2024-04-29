import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../redux/actions";

export const NavLinks = ({ isMoved, setIsMoved }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("AuthToken");
    dispatch(LoginUser(false));
    navigate("/login");
  };

  return (
    <ul className={"nav-links"}>
      <li>
        <NavLink to="/home" className="nav-link-no-boot">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/newhabit" className="nav-link-no-boot">
          Add Habit
        </NavLink>
      </li>
      <li>
        <NavLink to="/moodcalendar" className="nav-link-no-boot">
          How do I feel
        </NavLink>
      </li>
      <li>
        <NavLink to="/quotes" className="nav-link-no-boot">
          Inspire me
        </NavLink>
      </li>
      {useSelector((state) => state.login.value) ? (
        <li>
          <NavLink
            to="/login"
            className="nav-link-no-boot"
            onClick={handleLogout}
          >
            Logout
          </NavLink>
        </li>
      ) : (
        <>
          <li>
            <NavLink to="/login" className="nav-link-no-boot">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className="nav-link-no-boot">
              Register
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};
