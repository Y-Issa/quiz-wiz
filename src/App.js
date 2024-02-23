import { useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "start",
  numQuestions: 5,
  difficulty: "easy",
  category: "science",
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
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [{ questions, status, numQuestions, difficulty, category }, dispatch] =
    useReducer(reducer, initialState);
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
      </Main>
    </div>
  );
}
