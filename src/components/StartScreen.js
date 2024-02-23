import { useEffect, useState } from "react";
function StartScreen({
  numQuestions,
  difficulty,
  category,
  dispatch,
  questions,
}) {
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "loader" });
        const response = await fetch(
          `https://the-trivia-api.com/v2/questions/?categories=${category}&difficulty=${difficulty}&limit=${numQuestions}`
        );
        const jsonData = await response.json();
        dispatch({ type: "setQuestions", payload: jsonData });
        console.log(jsonData);
        dispatch({ type: "success" });
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch({ type: "error" });
      }
    };

    if (fetchTrigger) {
      fetchData();
      setFetchTrigger(false);
    }
  }, [fetchTrigger, category, difficulty, numQuestions, dispatch]);

  const handleButtonClick = () => {
    setFetchTrigger(true);
  };

  return (
    <div className="start">
      <h2>Let's Start a Quiz!</h2>
      <div className="quiz-setup">
        <p>
          <span>Select Difficulty:</span>
          <select
            className="btn btn-ui"
            value={difficulty}
            onChange={(e) =>
              dispatch({ type: "diff", payload: e.target.value })
            }
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
            <option value="">mixed</option>
          </select>
        </p>
        <p>
          <span>Select Category:</span>
          <select
            className="btn btn-ui"
            value={category}
            onChange={(e) =>
              dispatch({ type: "category", payload: e.target.value })
            }
          >
            <option value="general_knowledge">general_knowledge</option>
            <option value="science">science</option>
            <option value="geography">geography</option>
            <option value="history">history</option>
            <option value="film_and_tv">film and tv</option>
            <option value="arts_and_literature">arts and literature</option>
            <option value="music">music</option>
            <option value="sport_and_leisure">sport and leisure</option>
            <option value="society_and_culture">society and culture</option>
            <option value="food_and_drink">food and drink</option>
          </select>
        </p>
        <p>
          <span>Number of Questions:</span>
          <select
            className="btn btn-ui"
            value={numQuestions}
            onChange={(e) =>
              dispatch({ type: "numQuestions", payload: e.target.value })
            }
          >
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>30</option>
          </select>
        </p>
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "loader" })}
      >
        Start!
      </button>
      <button className="btn btn-ui" onClick={handleButtonClick}>
        TEST!
      </button>
    </div>
  );
}

export default StartScreen;
