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

export const MoodCalendar = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={[
        { title: "Event 1", date: "2024-04-28" },
        { title: "Event 2", date: "2024-04-29" },
        // Add more events as needed
      ]}
    />
  );
};
