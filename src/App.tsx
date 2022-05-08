import React, { useEffect, useState }from "react";
import { fetchQuizQuestion } from "./api/question";
// Components
import QuestionCard from "./components/QuestionCard/QuestionCard";
// Types
import { Difficulty, QuestionState, AnswersObject } from "./helpers/types";

const App = () => {
  const totalValue: number = 10;

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswersObject[]>([]);
  const [gameOver, setGameOver] = useState(true);

  useEffect(() => {
    startTrivia();
  }, [])

  const  startTrivia = async () => {
    try {
      setLoading(true)
      setGameOver(false)
  
      const newQuestion = await fetchQuizQuestion(
        totalValue,
        Difficulty.EASY,
      );
  
      setQuestions(newQuestion);
      setScore(0);
      setNumber(0);
    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }

  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      <button className="start" onClick={startTrivia}>Start</button>
      <p className="score">Score:</p>
      <p>Loading Questions...</p>
      {/* <QuestionCard
        questionNr={number + 1}
        totalQuestions={totalValue}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswer ? userAnswer[number] : undefined}
        callback={checkAnswer}
      /> */}
      <button className="next" onClick={nextQuestion}></button>
    </div>
  );
}

export default App;
