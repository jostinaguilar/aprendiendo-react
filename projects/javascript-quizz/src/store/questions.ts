import confetti from 'canvas-confetti'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { type Question } from '../types/types.d'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}

export const useQuestionsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          questions: [],
          currentQuestion: 0,
          fetchQuestions: async (limit: number) => {
            const res = await fetch('http://localhost:5173/data.json')
            const json = await res.json()

            const questions = json
              .sort(() => Math.random() - 0.5)
              .slice(0, limit)
            set({ questions }, false, 'FECTH')
          },
          selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get()
            const newQuestions = structuredClone(questions)
            const questionIndex = newQuestions.findIndex(
              (q) => q.id === questionId
            )
            const questionInfo = newQuestions[questionIndex]

            const isCorrectUserAnswer =
              questionInfo.correctAnswer === answerIndex

            if (isCorrectUserAnswer) confetti()

            newQuestions[questionIndex] = {
              ...questionInfo,
              isCorrectUserAnswer,
              userSelectedAnswer: answerIndex,
            }

            set({ questions: newQuestions }, false, 'SELECT')
          },
          goNextQuestion: () => {
            const { currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1

            if (nextQuestion < questions.length) {
              set({ currentQuestion: nextQuestion }, false, 'GO NEXT Q')
            }
          },
          goPreviousQuestion: () => {
            const { currentQuestion } = get()
            const previousQuestion = currentQuestion - 1

            if (previousQuestion >= 0) {
              set({ currentQuestion: previousQuestion }, false, 'GO PREV Q')
            }
          },
          reset: () => {
            set({ currentQuestion: 0, questions: [] }, false, 'RESET')
          },
        }
      },
      { name: 'questions' }
    )
  )
)
