import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Endpoint } from "../../data/data";
import { Spinner } from "react-bootstrap";
import { HabitsList } from "../HabitsList/HabitsList";
import "./NewHabit.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UnauthorizedAccess } from "../UnauthorizedAccess/UnauthorizedAccess";

export const NewHabit = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [typeId, setTypeId] = useState(1);

  const getActivityCategories = async () => {
    try {
      const res = await fetch(Endpoint + "/api/activitycategories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
      });
      if (res.status === 401) {
        return;
      }
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
  const getActivityTypes = async () => {
    try {
      const res = await fetch(Endpoint + "/api/activitytypes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
      });
      
      if (res.status === 401) {
        return;
      }
      if (!res.ok) {
        throw new Error("Response not ok");
      }
      const data = await res.json();
      console.log(data);
      setIsLoading(false);
      setTypes(data);
    } catch (err) {
      console.error("There was an error in fetching the data", err);
    }
  };

  useEffect(() => {
    getActivityTypes();
    getActivityCategories();
  }, []);

  return (
    <>
      {useSelector((state) => state.login.value) ? (
        <>
          <div>
            <div className="d-flex justify-content-center">
              {types?.map((type) => {
                return type.id === typeId ? (
                  <div key={types.id} className="mt-3">
                    <Button
                      variant="success"
                      className="btn-selected"
                      id={"btn-type-" + type.id}
                      onClick={() => setTypeId(type.id)}
                    >
                      {type.activityTypeName}
                    </Button>
                  </div>
                ) : (
                  <div key={types.id} className="mt-3" >
                    <Button
                      variant="light"
                      className="btn-not-selected"
                      id={"btn-type-" + type.id}
                      onClick={() => setTypeId(type.id)}
                    >
                      {type.activityTypeName}
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className="ms-4 mt-4">
              {typeId === 1 ? (
                isLoading ? (
                  <Spinner animation="grow" variant="danger" />
                ) : (
                  categories?.map((category) => {
                    return (
                      <div key={category.id}>
                        <h5 className="mb-4 mt-4">
                          {category.activityCategoryName}
                        </h5>
                        <div className="ms-2">
                          <HabitsList
                            categoryProps={category}
                            typeProps={typeId}
                          />
                        </div>
                      </div>
                    );
                  })
                )
              ) : isLoading ? (
                <Spinner animation="grow" variant="danger" />
              ) : (
                categories
                  ?.filter((c) => c.id !== 1)
                  .map((category) => {
                    return (
                      <div key={category.id}>
                        <h5 className="mb-4 mt-4">
                          {category.activityCategoryName}
                        </h5>
                        <div className="ms-2">
                          <HabitsList
                            categoryProps={category}
                            typeProps={typeId}
                          />
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </>
      ) : (
        <UnauthorizedAccess />
      )}
    </>
  );
};
