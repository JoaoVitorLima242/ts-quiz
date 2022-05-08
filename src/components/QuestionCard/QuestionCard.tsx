import React, { useState } from "react";
import { AnswersObject } from "../../helpers/types"
import { Wrapper, ButtonWrapper } from "../../styles/QuestionCart.styles";

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswersObject | undefined;
    questionNr: number;
    totalQuestions: number; 
};

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalQuestions
}) => (
    <Wrapper>
        <p className="number">
            Question: {questionNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{__html: question}} />
        <div>
            {answers?.map(answer => (
                <ButtonWrapper
                 key={answer}
                 correct={userAnswer?.correct_answer === answer}
                 userClicked={userAnswer?.answer === answer}
                >
                    <button disabled={!!userAnswer} value={answer} onClick={(e) => callback(e)}>
                        <span dangerouslySetInnerHTML={{__html: answer}}></span>
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
);

export default QuestionCard;