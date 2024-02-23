import { useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";

const POINTS_PER_QUESTION = 10;

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "start",
  numQuestions: 5,
  difficulty: "easy",
  category: "science",
  index: 0,
  userAnswer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "diff":
      return {
        ...state,
        difficulty: action.payload,
      };
    case "category":
      return {
        ...state,
        category: action.payload,
      };
    case "numQuestions":
      return {
        ...state,
        numQuestions: action.payload,
      };
    case "setQuestions":
      return {
        ...state,
        questions: action.payload,
      };
    case "error":
      return {
        ...state,
        status: "error",
      };
    case "loader":
      return {
        ...state,
        status: "loader",
      };
    case "success":
      return {
        ...state,
        status: "ready",
      };
    case "answered":
      const question = state.questions.at(state.index);

      return {
        ...state,
        userAnswer: action.payload,
        points:
          action.payload === question.correctAnswer
            ? state.points + POINTS_PER_QUESTION
            : state.points,
      };
    case "next":
      return {
        ...state,
        userAnswer: null,
        index: state.index + 1,
      };
    case "finish":
      return {
        ...state,
        status: "finish",
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      numQuestions,
      difficulty,
      category,
      index,
      userAnswer,
      points,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPoints = numQuestions * POINTS_PER_QUESTION;

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "start" && (
          <StartScreen
            dispatch={dispatch}
            questions={questions}
            numQuestions={numQuestions}
            difficulty={difficulty}
            category={category}
          />
        )}
        {status === "error" && <Error />}
        {status === "loader" && <Loader />}
        {status === "ready" && (
          <>
            <Progress
              index={index}
              points={points}
              maxPoints={maxPoints}
              numQuestions={numQuestions}
              userAnswer={userAnswer}
            />
            <QuestionScreen
              question={questions[index]}
              dispatch={dispatch}
              userAnswer={userAnswer}
            />
            {userAnswer && (
              <NextButton
                dispatch={dispatch}
                index={index}
                questions={questions}
                points={points}
              />
            )}
          </>
        )}
        {status === "finish" && <p>finished</p>}
      </Main>
    </div>
  );
}
