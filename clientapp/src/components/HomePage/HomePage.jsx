import "./HomePage.css"
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Endpoint } from "../../data/data";
import { Spinner } from "react-bootstrap";
import Calendar from "../Calendar/Calendar";
import HomeHabits from "../HomeHabits/HomeHabits";
import MyFooter from "../Footer/MyFooter"
import { fetchAntiForgeryToken } from "../../data/data";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const HomePage = () => {
  const [userId, setUserId] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [habits, setHabits] = useState([]);
  const props = {userId, setUserId, selectedDate, setSelectedDate, habits, setHabits}

  return (
    <div className="main-backdrop">
      <div>
        <Calendar {...props}/>
        <HomeHabits {...props}/>
        <MyFooter />
      </div>
    </div>
  );
};


