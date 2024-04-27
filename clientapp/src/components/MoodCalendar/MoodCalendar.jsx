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
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UnauthorizedAccess } from "../UnauthorizedAccess/UnauthorizedAccess";
import { useSelector } from "react-redux";

export const MoodCalendar = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [moods, setMoods] = useState([]);
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    GetMoodEvents();
    setShow(false);
    window.location.reload();
  };
  const handleShow = () => setShow(true);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    handleShow();
    console.log(arg.dateStr);
  };

  const GetMoodEvents = async () => {
    try {
      const res = await fetch(`${Endpoint}/api/moodevents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
      });
      if (res.status === 401) {
        return;
      }
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

  const CreateMoodEvent = async (url, data) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 401) {
        return;
      }
      if (!res.ok) {
        throw new Error("Failed to Create MoodEvent");
      }

      const resData = await res.json();
      // setCreatedData(resData);
      console.log("Mood event created");
    } catch (err) {
      console.error("Error while making POST request:", err);
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
    <>
      {useSelector((state) => state.login.value) ? (
        <>
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
                      CreateMoodEvent(`${Endpoint}/api/moodevents`, {
                        userId: 1,
                        moodId: 7,
                        date: selectedDate,
                      });
                      handleClose();
                    }}
                  />
                  <EmojiTearFill
                    className="emoji"
                    onClick={() => {
                      CreateMoodEvent(`${Endpoint}/api/moodevents`, {
                        userId: 1,
                        moodId: 5,
                        date: selectedDate,
                      });
                      handleClose();
                    }}
                  />
                  <EmojiFrownFill
                    className="emoji"
                    onClick={() => {
                      CreateMoodEvent(`${Endpoint}/api/moodevents`, {
                        userId: 1,
                        moodId: 6,
                        date: selectedDate,
                      });
                      handleClose();
                    }}
                  />
                  <EmojiNeutralFill
                    className="emoji"
                    onClick={() => {
                      CreateMoodEvent(`${Endpoint}/api/moodevents`, {
                        userId: 1,
                        moodId: 4,
                        date: selectedDate,
                      });
                      handleClose();
                    }}
                  />
                  <EmojiSmileFill
                    className="emoji"
                    onClick={() => {
                      CreateMoodEvent(`${Endpoint}/api/moodevents`, {
                        userId: 1,
                        moodId: 3,
                        date: selectedDate,
                      });
                      handleClose();
                    }}
                  />
                  <EmojiLaughingFill
                    className="emoji"
                    onClick={() => {
                      CreateMoodEvent(`${Endpoint}/api/moodevents`, {
                        userId: 1,
                        moodId: 2,
                        date: selectedDate,
                      });
                      handleClose();
                    }}
                  />
                  <EmojiGrinFill
                    className="emoji"
                    onClick={() => {
                      CreateMoodEvent(`${Endpoint}/api/moodevents`, {
                        userId: 1,
                        moodId: 1,
                        date: selectedDate,
                      });
                      handleClose();
                    }}
                  />
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </>
      ) : (
        <UnauthorizedAccess />
      )}
    </>
  );
};
