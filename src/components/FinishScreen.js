function FinishScreen({ points, maxPoints, dispatch, highScore }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You scored: <strong>{points}</strong> out of {maxPoints} (
        {percentage.toFixed(0)}%)
      </p>
      <p className="highscore">Highscore: {highScore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
