import "./HabitsList.css";
import { useState, useEffect } from "react";
import { Endpoint } from "../../data/data";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UnauthorizedAccess } from "../UnauthorizedAccess/UnauthorizedAccess";
import { useNavigate } from "react-router-dom";

export const HabitsList = ({ categoryProps, typeProps }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  const GetActivities = async () => {
    try {
      const res = await fetch(Endpoint + "/api/activities", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
      });
      if (res.status === 401) {
        navigate("/home");
        return;
      }
      if (!res.ok) {
        throw new Error("Response not ok");
      }
      const data = await res.json();
      console.log(data);
      setIsLoading(false);
      setActivities(data);
    } catch (err) {
      console.error("There was an error in fetching the data", err);
    }
  };

  useEffect(() => {
    GetActivities();
  }, []);

  return (
    <>
      {useSelector((state) => state.login.value) ? (
        <>
          {isLoading ? (
            <Spinner animation="grow" variant="danger" />
          ) : (
            activities
              ?.filter((activity) => activity.typeId === typeProps)
              .filter((a) => a.categoryId === categoryProps.id)
              .map((activity) => {
                return (
                  <div key={activity.id}>
                    <Link to={`/newhabit/${activity.id}`}>
                      {activity.activityName}
                    </Link>
                  </div>
                );
              })
          )}
        </>
      ) : (
        <>
          <UnauthorizedAccess />
        </>
      )}
    </>
  );
};
