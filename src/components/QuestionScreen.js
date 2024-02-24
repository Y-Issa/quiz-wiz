import { useState, useEffect } from "react";

function QuestionScreen({ question, dispatch, userAnswer }) {
  const hasAnswered = userAnswer !== null;
  const [answers, setAnswers] = useState([]);

  const shuffle = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  };

  useEffect(
    function () {
      function shuffleAnswers() {
        const shuffledAnswers = shuffle([
          ...question.incorrectAnswers,
          question.correctAnswer,
        ]);
        setAnswers(shuffledAnswers);
      }

      shuffleAnswers();
    },
    [question]
  );

  return (
    <div>
      <h4>{question.question.text}</h4>

      <div className="options">
        {answers.map((answer, index) => (
          <button
            className={`btn btn-option ${
              index === answers.indexOf(userAnswer) ? "answer" : ""
            } ${
              hasAnswered
                ? answer === question.correctAnswer
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            disabled={hasAnswered}
            onClick={() =>
              dispatch({ type: "answered", payload: answers[index] })
            }
            key={answer}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionScreen;
