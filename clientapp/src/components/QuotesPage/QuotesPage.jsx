import "./QuotesPage.css";
import {
  PexelsToken,
  PexelsSearchEndpoint,
  PexelsSearchQuery,
  ZenQuotesEndpoint,
} from "../../data/data";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
const subjects = [
  "Nature",
  "Mountains",
  "Forest",
  "Sunset",
  "Wildlife",
  "Landscape",
  "Beach",
  "Flowers",
  "Desert",
  "Adventure",
  "Culture",
  "People",
  "Abstract",
  "Music",
  "Love",
  "Celebration",
  "Vintage",
  "Art",
  "Wellness",
  "Fantasy",
  "Travel",
  "History",
  "Seasons",
  "Meditation",
  "Peace",
  "Tranquility",
  "Mindfulness",
  "Serene",
  "Harmony",
  "Relaxation",
  "Calm",
  "Zen",
  "Yoga",
  "Spirituality",
  "Reflection",
  "Breathe",
  "Silence",
  "Serenity",
  "Balance",
  "Gratitude",
  "Solitude",
  "Renewal",
  "Garden",
  "Waterfall",
  "Sunrise",
  "Moonlight",
  "Starry",
  "Dream",
];

let chosenPicture = Math.floor(Math.random() * 15);
let chosenSubject = subjects[Math.floor(Math.random() * subjects.length)];

export const QuotesPage = () => {
  const [pictures, setPictures] = useState("");
  const [quotes, setQuotes] = useState("");
  const [isLoading, setIsLoading] = useState(
    pictures == undefined ? true : false
  );

  const GetBgPicture = async (query) => {
    try {
      const res = await fetch(
        `${PexelsSearchEndpoint}${PexelsSearchQuery}${query}`,
        {
          method: "GET",
          headers: {
            Authorization: PexelsToken,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error fetching the pictures");
      }
      const data = await res.json();
      console.log(data.photos);
      setPictures(data.photos);
      //   setIsLoading(false);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const GetQuotes = async () => {};

  useEffect(() => {
    GetBgPicture(chosenSubject);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner animation="grow" className="img-spinner" />
        </div>
      ) : (
        <div
          className="image-container"
          style={{
            backgroundImage: `url(${pictures[chosenPicture]?.src.landscape})`,
          }}
        ></div>
      )}
    </>
  );
};
