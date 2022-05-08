export enum Difficulty {
    EASY = 'easy',
    MEDIUM = "medium",
    HARD = "hard"
}

export type Question = {
    category: string;
    correctAnswer: string;
    difficulty: string;
    incorrectAnswer: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & {answer: string[]};