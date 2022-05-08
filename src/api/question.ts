import { Difficulty, Question } from "../helpers/types";
import { shuflleArray } from "../helpers/utils/array";

export const fetchQuizQuestion = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();

    return data.results.map((question: Question) => ({
        ...question,
        answers: shuflleArray([...question.incorrect_answers, question.correct_answer])

    }))
}