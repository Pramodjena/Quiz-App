/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

function Quiz() {
  let [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState(data[index]);
  const [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const option_box = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (questions.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        option_box[questions.ans - 1].current.classList.add("correct");
        setLock(true);
      }
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex(++index);
      setQuestions(data[index]);
      setLock(false);
      option_box.forEach((el) => {
        el.current.classList.remove("correct"),
          el.current.classList.remove("wrong");
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestions(data[0]);
    setLock(false);
    setResult(false);
    setScore(0);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          <h2>
            Your scored {score} out of {data.length}
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}.{questions.question}
          </h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>
              {questions.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>
              {questions.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>
              {questions.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>
              {questions.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} Questions
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
