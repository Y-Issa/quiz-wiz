function NextButton({ dispatch, index, questions }) {
  if (index === questions.length - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish!
      </button>
    );
  else
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
        Next
      </button>
    );
}

export default NextButton;
