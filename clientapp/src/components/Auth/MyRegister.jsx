import "./Auth.css";
import { Form, FormLabel } from "react-bootstrap";
import { Endpoint } from "../../data/data";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LoginUser } from "../../redux/actions";
import { Link } from "react-router-dom";

export const MyRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    Email: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    Register();
  };
  const Register = async () => {
    try {
      const res = await fetch(Endpoint + "/api/Account/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        throw new Error("Registration failed");
      }
      // const data = await res.json();
      // console.log(data);
      console.log('registration successful')
      navigate("/login");
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };
  return (
    <>
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="username-container">
            <FormLabel>Username</FormLabel>
            <Form.Control
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="password-container">
            <FormLabel>Password</FormLabel>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="username-container">
            <FormLabel>Email</FormLabel>
            <Form.Control
              type="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="submit-register-button">
            <Button type="submit" className="btn btn-register">
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
