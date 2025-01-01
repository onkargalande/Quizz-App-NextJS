'use client';

import { useState, useEffect } from 'react';

export default function QuizPage() {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: ["Charles Dickens", "William Shakespeare", "J.K. Rowling", "Mark Twain"],
      correctAnswer: "William Shakespeare",
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      correctAnswer: "Mars",
    },
    {
      question: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      correctAnswer: "Blue Whale",
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["O2", "H2O", "CO2", "NaCl"],
      correctAnswer: "H2O",
    },
    {
      question: "Which continent is the Sahara Desert located on?",
      options: ["Asia", "Africa", "Australia", "South America"],
      correctAnswer: "Africa",
    },
    {
      question: "What is the currency of Japan?",
      options: ["Yuan", "Won", "Yen", "Rupee"],
      correctAnswer: "Yen",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Van Gogh", "Leonardo da Vinci", "Michelangelo", "Raphael"],
      correctAnswer: "Leonardo da Vinci",
    },
    {
      question: "What is the boiling point of water at sea level?",
      options: ["100°C", "90°C", "80°C", "110°C"],
      correctAnswer: "100°C",
    },
  ];

  const [answers, setAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, quizCompleted]);

  const handleAnswerChange = (index: number, answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    const correctCount = questions.reduce((acc, question, index) => {
      return acc + (answers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
    setScore(correctCount);
    setQuizCompleted(true);
  };

  const handleRetry = () => {
    setAnswers(Array(questions.length).fill(null));
    setCurrentIndex(0);
    setScore(null);
    setTimeLeft(600);
    setQuizCompleted(false);
  };

  return (
    <div>
      <h1>Quiz Application</h1>
      {!quizCompleted ? (
        <div>
          <div className="timer">Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</div>
          <div className="quiz-question">{questions[currentIndex].question}</div>
          <div>
            {questions[currentIndex].options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={`question-${currentIndex}`}
                  value={option}
                  checked={answers[currentIndex] === option}
                  onChange={() => handleAnswerChange(currentIndex, option)}
                />
                {option}
              </label>
            ))}
          </div>

          <div className="progress">
            Question {currentIndex + 1} of {questions.length}
          </div>

          <div>
            <button onClick={handlePrevious} disabled={currentIndex === 0}>
              Previous
            </button>
            <button onClick={handleNext} disabled={currentIndex === questions.length - 1}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="result">
            Your Score: {score} / {questions.length}
          </div>
          <div>
            {questions.map((q, index) => (
              <div key={index}>
                <div>{q.question}</div>
                <div>
                  Correct Answer: {q.correctAnswer}, Your Answer: {answers[index] || "Not Answered"}
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleRetry}>Retry Quiz</button>
        </div>
      )}

      <footer>Thank you for playing!</footer>
    </div>
  );
}
