import React, { Component, useState, useEffect } from "react";
import { QUESTIONS } from "./questions";

const App = () => {
  const [scores, setScores] = useState([]);
  const [average, setAverage] = useState(null);
  const [curIndex, setCurIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (scores.length > 0) {
      let totalScore = 0;
      for (let score of scores) {
        totalScore += score;
      }

      const average = totalScore / scores.length;
      setAverage(average);
    }
  }, [scores]);

  const handleAnswer = (answer) => {
    console.log(answer);
    const updatedAnswers = { ...answers, [curIndex]: answer };
    console.log(updatedAnswers);
    setAnswers(updatedAnswers);

    const numYes = Object.values(updatedAnswers).filter((value) => value === "Yes").length;
    const score = (numYes / Object.keys(QUESTIONS).length) * 100;
    setScores([...scores, score]);
    console.log('scores', scores);

    const nextQuestionIndex = curIndex + 1;
    if (nextQuestionIndex < Object.keys(QUESTIONS).length) {
      setCurIndex(nextQuestionIndex);
    } else {
      setCurIndex(null); // Set current question index to null to indicate all questions have been answered
    }
  };

  const handleRestart = () => {
    setScores([]);
    setAverage(null);
    setCurIndex(0);
    setAnswers({});
  };

  return (
    <div className="main__wrap">
      <main className="container">
        <div>
          {curIndex !== null ? (
            <div>
              <p>{QUESTIONS[curIndex + 1]}</p>
              <div className="button-container">
                <button onClick={() => handleAnswer("Yes")} >Yes</button>
                <button onClick={() => handleAnswer("No")}>No</button>
              </div>
            </div>
          ) : (
            <div>
              <h2>Score for this run:</h2>
              <p>{scores[scores.length - 1]}</p>
              <h2>Overall Average Rating:</h2>
              <p>{average}</p>
              <button onClick={handleRestart}>Restart</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;