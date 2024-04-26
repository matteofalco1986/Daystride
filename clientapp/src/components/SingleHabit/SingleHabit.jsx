import "./SingleHabit.css";
import { Endpoint } from "../../data/data";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CloudArrowUpFill } from "react-bootstrap-icons";
import { fetchAntiForgeryToken } from "../../data/data";

export const SingleHabit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState("");
  const [titleActivity, setTitleActivity] = useState([]);
  const [goalPeriodTypes, setGoalPeriodTypes] = useState([]);
  const [activityTypes, setactivityTypes] = useState([]);
  const [colors, setColors] = useState([]);
  const [units, setUnits] = useState([]);
  const [timeRanges, setTimeRanges] = useState([]);
  const [activity, setActivity] = useState("");
  const [activityName, setActivityName] = useState("");
  const [activityType, setActivityType] = useState("");
  const [color, setColor] = useState("");
  const [goalTypeId, setGoalTypeId] = useState("");
  const [unit, setUnit] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [formData, setFormData] = useState({
    userId: 1,
    typeId: "",
    categoryId: "",
    colorId: "",
    goal: 0,
    goalPeriodTypeId: "",
    unitId: "",
    timeRangeId: "",
    startDate: "",
    endDate: null,
    activityName: "",
    reminderMessage: "",
  });

  const handleInputChange = (prop, value) => {
    setFormData({
      ...formData,
      [prop]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateMultipleHabits(`${Endpoint}/api/usersactivities`, formData);
    console.log("Form-data: ", formData);
    navigate('/home');
  };

  const GetActivityById = async (id) => {
    try {
      const res = await fetch(Endpoint + "/api/activities/" + id, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
        }
      });
      if (!res.ok) {
        throw new Error("Response not ok");
      }
      const data = await res.json();
      console.log(data);
      setIsLoading(false);
      setActivity(data);
      setTitleActivity(data);
    } catch (err) {
      console.error("There was an error in fetching the data", err);
    }
  };
  const GetCategories = async () => {
    try {
      const res = await fetch(Endpoint + "/api/activitycategories/", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
        }
      });
      if (!res.ok) {
        throw new Error("Response not ok");
      }
      const data = await res.json();
      console.log(data);
      setIsLoading(false);
      setCategories(data);
    } catch (err) {
      console.error("There was an error in fetching the data", err);
    }
  };
  const GetGoalPeriodTypes = async () => {
    try {
      const res = await fetch(Endpoint + "/api/goalperiodtypes/", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
        }
      });
      if (!res.ok) {
        throw new Error("Response not ok");
      }
      const data = await res.json();
      console.log(data);
      setGoalPeriodTypes(data);
    } catch (err) {
      console.error("There was an error in fetching the data", err);
    }
  };
  const GetActivityTypes = async () => {
    try {
      const res = await fetch(Endpoint + "/api/activitytypes/", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
        }
      });
      if (!res.ok) {
        throw new Error("Response not ok");
      }
      const data = await res.json();
      console.log(data);
      setactivityTypes(data);
    } catch (err) {
      console.error("There was an error in fetching the data", err);
    }
  };
  const GetColors = async () => {
    try {
      const res = await fetch(Endpoint + "/api/colors/", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
        }
      });
      if (!res.ok) {
        throw new Error("Response not ok");
      }
      const data = await res.json();
      console.log(data);
      setColors(data);
    } catch (err) {
      console.error("There was an error in fetching the data", err);
    }
  };
  const GetUnits = async () => {
    try {
      const res = await fetch(Endpoint + "/api/units/", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
        }
      });
      if (!res.ok) {
        throw new Error("Response not ok");
      }
      const data = await res.json();
      console.log(data);
      setUnits(data);
    } catch (err) {
      console.error("There was an error in fetching the data", err);
    }
  };
  const GetTimeRanges = async () => {
    try {
      const res = await fetch(Endpoint + "/api/timeranges/", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
        }
      });
      if (!res.ok) {
        throw new Error("Response not ok");
      }
      const data = await res.json();
      console.log(data);
      setTimeRanges(data);
    } catch (err) {
      console.error("There was an error in fetching the data", err);
    }
  };

  const GetActivities = async () => {
    try {
      const res = await fetch(Endpoint + "/api/activities/", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
        }
      });
      if (!res.ok) {
        throw new Error("Response not ok");
      }
      const data = await res.json();
      console.log(data);
      setActivities(data);
    } catch (err) {
      console.error("There was an error in fetching the data", err);
    }
  };

  const CreateHabit = async (url, data) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to Create UsersActivity");
      }

      const resData = await res.json();
      // setCreatedData(resData);
      console.log("Post request successful!");
    } catch (err) {
      console.error("Error while making POST request:", err);
    }
  };

  const CreateMultipleHabits = async (url, data) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to Create UsersActivity");
      }

      const resData = await res.json();
      // setCreatedData(resData);
      console.log("Post request successful!");
    } catch (err) {
      console.error("Error while making POST request:", err);
    }
  };

  useEffect(() => {
    GetActivities();
    GetCategories();
    GetTimeRanges();
    GetColors();
    GetUnits();
    GetActivityTypes();
    GetGoalPeriodTypes();
    GetActivityById(params.elementId);
  }, []);

  useEffect(() => {
    setFormData({ ...formData, categoryId: activity.categoryId });
  }, [activity]);

  return (
    <div className="activity-page">
      <div className="activity-title-container">
        <h2>
          {activityName == "" ? titleActivity.activityName : activityName}
        </h2>

        <Dropdown
          className="select-activityName"
          id="select-activityName"
          onSelect={(eventkey) => setActivityName(eventkey)}
        >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {activityName == "" ? titleActivity.activityName : activityName}
          </Dropdown.Toggle>{" "}
          <Dropdown.Menu>
            {activities?.map((a) => {
              return (
                <Dropdown.Item
                  eventKey={a.activityName}
                  onClick={() => {
                    formData.activityName = a.activityName;
                    console.log(formData);
                  }}
                >
                  {a.activityName}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <input
        type="number"
        name="categoryId"
        defaultValue={activity.categoryId}
        onChange={(e) => {
          setFormData({ ...formData, categoryId: e.target.value });
        }}
        hidden
      />
      <div className="activity-type-container">
        <h4>Habit Type</h4>

        <Dropdown
          className="select-type"
          id="select-type"
          onSelect={(eventkey) => setActivityType(eventkey)}
        >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {activityTypes[activityType - 1]?.activityTypeName}
          </Dropdown.Toggle>{" "}
          <Dropdown.Menu>
            {activityTypes?.map((type) => {
              return (
                <Dropdown.Item
                  eventKey={type.id}
                  onClick={() => {
                    formData.typeId = type.id;
                    console.log(formData);
                  }}
                >
                  {type.activityTypeName}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="activity-colors-container">
        <h4>Color</h4>

        <Dropdown
          className="select-color"
          id="select-color"
          onSelect={(eventkey) => setColor(eventkey)}
        >
          {" "}
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            style={{ backgroundColor: colors[color - 1]?.colorCode }}
          ></Dropdown.Toggle>{" "}
          <Dropdown.Menu>
            {colors?.map((c) => {
              return (
                <Dropdown.Item
                  className="single-color"
                  eventKey={c.id}
                  style={{ backgroundColor: c.colorCode }}
                  onClick={() => {
                    formData.colorId = c.id;
                    console.log(formData);
                  }}
                ></Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="goal-wide-container">
        <div className="goal-container">
          <div className="label-values-container">
            <h4>Goal</h4>
            <Form.Control
              type="number"
              placeholder="1"
              min="0"
              max="30000"
              value={parseInt(formData.goal)}
              onChange={(e) => {
                handleInputChange("goal", parseInt(e.target.value));
              }}
              required
            />
          </div>
          <div className="goal-dropdowns">
            <h4>Unit</h4>
            <Dropdown
              className="select-unit"
              id="select-unit"
              onSelect={(eventkey) => setUnit(eventkey)}
            >
              {" "}
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="goal-toggle"
              >
                {units[unit - 1]?.unitName}
              </Dropdown.Toggle>{" "}
              <Dropdown.Menu>
                {units?.map((unit) => {
                  return (
                    <Dropdown.Item
                      className="units"
                      eventKey={unit.id}
                      onClick={() => {
                        formData.unitId = unit.id;
                        console.log(formData);
                      }}
                    >
                      {unit.unitName}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="goal-dropdowns">
            <h4>Frequency</h4>
            <Dropdown
              className="select-goalType"
              id="select-goalType"
              onSelect={(eventkey) => setGoalTypeId(eventkey)}
            >
              {" "}
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="goal-toggle"
              >
                {goalPeriodTypes[goalTypeId - 1]?.goalPeriodName}
              </Dropdown.Toggle>{" "}
              <Dropdown.Menu>
                {goalPeriodTypes?.map((gpt) => {
                  return (
                    <Dropdown.Item
                      className="goal-period-types"
                      eventKey={gpt.id}
                      onClick={() => {
                        formData.goalPeriodTypeId = gpt.id;
                        console.log(formData);
                      }}
                    >
                      {gpt.goalPeriodName}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
      </div>
      </div>
      <div className="time-range-dropdowns">
        <h4>Time of the day</h4>
        <Dropdown
          className="select-time-range"
          id="select-time-ramge"
          onSelect={(eventkey) => setTimeRange(eventkey)}
        >
          {" "}
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className="goal-toggle"
          >
            {timeRanges[timeRange - 1]?.timeRange1}
          </Dropdown.Toggle>{" "}
          <Dropdown.Menu>
            {timeRanges?.map((time) => {
              return (
                <Dropdown.Item
                  className="time-ranges"
                  eventKey={time.id}
                  onClick={() => {
                    formData.timeRangeId = time.id;
                    console.log(formData);
                  }}
                >
                  {time.timeRange1}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="mt-5 date-controls">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="text-center" style={{ textTransform: "uppercase" }}>
              Habit Term
            </h5>
            <div className="mb-3">
              <div className="d-flex flex-column align-items-center">
                <h6>Start</h6>
                <Form.Control
                  className="date-form"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => {
                    setFormData({ ...formData, startDate: e.target.value });
                  }}
                />
              </div>
              <div className="d-flex flex-column align-items-center">
                <h6>End</h6>
                <Form.Control
                  className="date-form"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => {
                    setFormData({ ...formData, endDate: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <a
              className="border-0 btn btn-submit-activity"
              onClick={handleSubmit}
            >
              <CloudArrowUpFill className="cloud" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
