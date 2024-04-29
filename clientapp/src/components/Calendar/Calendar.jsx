import "./Calendar.css";

import React from "react";
import { Carousel, Row, Col } from "react-bootstrap";
import { eachDayOfInterval, startOfYear, endOfYear, format } from "date-fns";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const getDatesBetween = (startDate, endDate) => {
  return eachDayOfInterval({ start: startDate, end: endDate });
};

const findCurrentDateChunkIndex = (chunks, targetDate) => {
  for (let i = 0; i < chunks.length; i++) {
    if (
      chunks[i].some(
        (date) => date.toDateString() === targetDate.toDateString()
      )
    ) {
      return i;
    }
  }
  return -1; // If not found, though this should logically not happen if dates are correct
};

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const startDate = new Date(2020, 0, 1); // January 1, 2020
const endDate = new Date(2027, 11, 31); // December 31, 2025
const currentDate = new Date();

const allDatesBetweenDate1AndDate2 = getDatesBetween(
  startOfYear(startDate),
  endOfYear(endDate)
);

const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

// ------------------------------------- FUNCTIONAL COMPONENT ----------------------------------

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const datesInChunks = chunkArray(allDatesBetweenDate1AndDate2, 9);
  const navigate = useNavigate();

  // Find the index of the chunk that includes today's date
  const currentDateIndex = findCurrentDateChunkIndex(
    datesInChunks,
    currentDate
  );

  // State to manage the active slide index
  const [activeIndex, setActiveIndex] = useState(currentDateIndex);

  const setQueryParams = (userId, date) => {
    const searchParams = new URLSearchParams();
    searchParams.set("userId", userId);
    searchParams.set("date", date);
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <>
      {useSelector((state) => state.login.value) && (
        <div>
          <div className="text-center">
            <h3 className="m-3">
              {selectedDate
                ? selectedDate.toDateString() === currentDate.toDateString()
                  ? "Today"
                  : `${selectedDate.getDate()} ${
                      Months[selectedDate.getMonth()]
                    } ${selectedDate.getFullYear()}`
                : "Select a date"}
            </h3>
          </div>
          <div className="text-center">
            <Carousel
              activeIndex={activeIndex}
              interval={null}
              className="carousel-dates"
              onSelect={setActiveIndex}
            >
              {datesInChunks.map((datesChunk, index) => (
                <Carousel.Item key={index}>
                  <Row className="dates-container">
                    {datesChunk.map((date, idx) => (
                      <Col key={idx} className="date-item">
                        <div
                          className={`d-flex flex-column date-to-select ${
                            selectedDate &&
                            date.toDateString() === selectedDate.toDateString()
                              ? "selected-date"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedDate(date);
                            // console.log(format(date, 'yyyy-MM-dd'))
                            setQueryParams(
                              1,
                              format(date, "yyyy-MM-dd").toString()
                            );
                          }}
                        >
                          <div>
                            <p>{weekDays[date.getDay()]}</p>
                          </div>
                          <div className="circle-container">
                            <div className="circle">
                              <p className="date-to-center">{date.getDate()}</p>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
};

export default Calendar;
