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
  const [userAnswers, setUserAnswers] = useState<AnswersObject[]>([]);
  const [gameOver, setGameOver] = useState(true);

  const  startTrivia = async () => {
    try {
      setLoading(true);
      setGameOver(false);
      const newQuestions = await fetchQuizQuestion(
        totalValue,
        Difficulty.EASY
      );
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev) => prev + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correct_answer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if(nextQuestion === totalValue) setGameOver(true)
    else {
      setNumber(nextQuestion)
    }
  }

  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === totalValue ? (
        <button className="start" onClick={() => startTrivia()}>Start</button>
      ) : null}
      {!gameOver ? <p className='score'>Score: {score}</p> : null}
      {loading ? <p>Loading Questions...</p> : null}
      {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={totalValue}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== totalValue - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
    </div>
  );
}

export default App;
