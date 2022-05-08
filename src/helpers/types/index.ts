export enum Difficulty {
    EASY = 'easy',
    MEDIUM = "medium",
    HARD = "hard"
}

export type Question = {
    category: string;
    correctAnswer: string;
    difficulty: string;
    incorrectAnswers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & {answers: string[]};

export type AnswersObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}