import "./MoodCalendar.css";
import {
  EmojiFrownFill,
  EmojiAngryFill,
  EmojiSmileFill,
  EmojiLaughingFill,
  EmojiTearFill,
  EmojiNeutralFill,
  EmojiSunglassesFill,
  EmojiGrinFill,
} from "react-bootstrap-icons";

// Calendar.js
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";
import { Endpoint } from "../../data/data";
import { Modal, Button } from "react-bootstrap";

export const MoodCalendar = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [moods, setMoods] = useState([]);
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [moodId, setMoodId] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    handleShow();
    console.log(arg.dateStr);
  };

  const GetMoodEvents = async () => {
    try {
      const res = await fetch(`${Endpoint}/api/moodevents`);
      if (!res.ok) {
        throw new Error("Failed to retrieve mood events");
      }
      const data = await res.json();
      setMoods(data);
      console.log(data);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const generateEventsData = () => {
    const generatedEvents = [];
    moods.forEach((item) => {
      const event = {
        title: item.mood,
        date: item.date,
      };
      generatedEvents.push(event);
    });
    return generatedEvents;
  };

  useEffect(() => {
    GetMoodEvents();
  }, []);

  useEffect(() => {
    const generatedEvents = generateEventsData();
    setEvents(generatedEvents);
  }, [moods]);
  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Modal.Title>How do you feel?</Modal.Title>
          <div className="d-flex justify-content-between emoji-container">
            <EmojiAngryFill
              className="emoji"
              onClick={() => {
                setMoodId(7);
                handleClose();
              }}
            />
            <EmojiTearFill
              className="emoji"
              onClick={() => {
                setMoodId(5);
                handleClose();
              }}
            />
            <EmojiFrownFill
              className="emoji"
              onClick={() => {
                setMoodId(6);
                handleClose();
              }}
            />
            <EmojiNeutralFill
              className="emoji"
              onClick={() => {
                setMoodId(4);
                handleClose();
              }}
            />
            <EmojiSmileFill
              className="emoji"
              onClick={() => {
                setMoodId(3);
                handleClose();
              }}
            />
            <EmojiLaughingFill
              className="emoji"
              onClick={() => {
                setMoodId(2);
                handleClose();
              }}
            />
            <EmojiGrinFill
              className="emoji"
              onClick={() => {
                setMoodId(1);
                handleClose();
              }}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
