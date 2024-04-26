import { Nav, Navbar } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../redux/actions";
import "./MyNavbar.css";

export const MyNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("AuthToken");
    dispatch(LoginUser(false));
    navigate("/login");
  };

  return (
    <Navbar expand="sm">
      <Container>
        <Navbar.Brand>DAYSTRIDE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className="d-flex">
              <Link to="/home" className="nav-link">
                Home
              </Link>
              <Link to="/newhabit" className="nav-link">
                Add Habit
              </Link>
              <Link to="/moodcalendar" className="nav-link">
                How do I feel
              </Link>
            </div>

            <div className="d-flex">
              {useSelector((state) => state.login.value) ? (
                <>
                  <Link to="/login" className="nav-link" onClick={handleLogout}>
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
