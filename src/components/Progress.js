function Progress({ index, points, numQuestions, maxPoints, userAnswer }) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(userAnswer !== null)}
      />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
