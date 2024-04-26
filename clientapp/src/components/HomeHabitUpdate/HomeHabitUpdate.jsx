import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Endpoint } from "../../data/data";
import {
  PlusCircleFill,
  DashCircleFill,
  Trash3Fill,
  Save2Fill,
} from "react-bootstrap-icons";
import "./HomeHabitUpdate.css";
import { fetchAntiForgeryToken } from "../../data/data";

export const HomeHabitUpdate = () => {
  const navigate = useNavigate();
  const usersactivity = useParams();
  const [habit, setHabit] = useState({});
  let [improvement, setImprovement] = useState(
    habit?.currentCount == null ? 0 : habit.currentCount
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    habit.currentCount = improvement;
    UpdateActivityDetails(Endpoint, usersactivity.elementId, habit);
    navigate("/home");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    DeleteActivity(
      `${Endpoint}/api/usersactivities/${usersactivity.elementId}`
    );
    navigate("/home");
  };

  const UpdateActivityDetails = async (url, id, updatedObject) => {
    try {
      const res = await fetch(url + "/api/usersactivities/" + id, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedObject),
      });
      if (!res.ok) {
        throw new Error("Failed to update activity");
      }
      const data = await res.json();
      console.log("User activity updated successfully", data);
    } catch (err) {
      console.error("Error updating user activity: ", err);
    }
  };

  const GetActivityDetails = async (url, id) => {
    try {
      const res = await fetch(url + "/api/usersactivities/" + id, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Fetch failed");
      }
      const data = await res.json();
      //   console.log(data);
      setHabit(data);
    } catch (err) {
      console.error("Error", err);
    }
  };

  const DeleteActivity = async (url, id) => {
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete resource");
      }
      console.log("Resource deleted");
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    GetActivityDetails(Endpoint, usersactivity.elementId);
    setImprovement(habit?.currentCount == null ? 0 : +habit.currentCount);
    console.log("ciao");
  }, []);

  useEffect(() => {
    habit.currentCount = improvement;
  }, [improvement]);

  return (
    <>
      <div className="main-container">
        <div className="activity-outer-bar">
          <div
            className="activity-inner-bar"
            style={{
              backgroundColor: `${habit.color}`,
              width: `${
                ((improvement == null ? 0 : improvement) * 100) / habit.goal
              }%`,
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="habit-name">{habit.activityName}</p>
              </div>
              <div className="d-flex align-items-center units-container">
                {improvement > 0 && (
                  <DashCircleFill
                    className="adjuster"
                    onClick={() => setImprovement(--improvement)}
                  />
                )}
                <p>{improvement} </p>/
                <p>
                  {habit.goal} {habit.unit}
                </p>
                {improvement < +habit.goal && (
                  <PlusCircleFill
                    className="adjuster"
                    onClick={() => {
                      setImprovement(++improvement);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5 save-changes-container gap-5">
        <div className="d-flex justify-content-between">
          <Link className="btn-save-changes" onClick={handleSubmit}>
            <Save2Fill className="trash me-2" />
            Save changes
          </Link>
        </div>
        <div className="d-flex justify-content-between">
          <Link className="delete-p" onClick={handleDelete}>
            <Trash3Fill className="trash me-2" />
            Delete
          </Link>
        </div>
      </div>
    </>
  );
};
