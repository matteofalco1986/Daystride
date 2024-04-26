import "./HomeHabits.css";
import { Endpoint } from "../../data/data";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { UnauthorizedAccess } from "../UnauthorizedAccess/UnauthorizedAccess";

const HomeHabits = ({
  selectedDate,
  setSelectedDate,
  userId,
  setUserId,
  habits,
  setHabits,
}) => {
  const navigate = useNavigate();
  const GetByDate = async (url, id, date) => {
    try {
      const res = await fetch(
        url +
          "/api/usersactivities" +
          `/byDate?userId=${id}&date=${format(date, "yyyy-MM-dd")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 401) {
        navigate("/home");
        return;
      }
      if (!res.ok) {
        setHabits([]);
        throw new Error("No activity found");
        // console.log(habits)
      }
      const data = await res.json();
      console.log(data);

      setHabits(data);
    } catch (err) {
      console.error("Error", err);
    }
  };

  useEffect(() => {
    if (userId && selectedDate) {
      GetByDate(Endpoint, userId, selectedDate);
    }
  }, [userId, selectedDate]);

  return (
    <>
      {useSelector((state) => state.login.value) ? (
        <>
          {" "}
          {habits?.length === 0 && (
            <div className="d-flex justify-content-center mt-5 no-activities-container">
              <div>
                <p className="no-activities">Nessuna attività da mostrare</p>
              </div>
            </div>
          )}
          <div className="habits-container">
            {habits?.length > 0 &&
              habits?.map((habit, index) => {
                return (
                  <div
                    key={index}
                    className="habit-container-bar"
                    onClick={() => {
                      console.log(habit.id);
                      navigate(`usersactivities/${habit.id}`);
                    }}
                  >
                    <div
                      className="habit-fill-bar"
                      style={{
                        backgroundColor: `${habit.color}`,
                        width: `${
                          ((habit.currentCount == null
                            ? 0
                            : habit.currentCount) *
                            100) /
                          habit.goal
                        }%`,
                      }}
                    ></div>
                    <p className="habit-text">{habit.activityName}</p>
                    <p className="score-text">
                      {habit.currentCount === null ? 0 : habit.currentCount} /{" "}
                      {habit.goal} {habit.unitName}
                    </p>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <UnauthorizedAccess />
      )}
    </>
  );
};

export default HomeHabits;
