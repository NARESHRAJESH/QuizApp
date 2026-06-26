import { useEffect, useState } from "react";
import AddQuestion from "./components/AddQuestion";
import QuestionList from "./components/QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // QUIZ STATES
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // TIMER
  const [timeLeft, setTimeLeft] = useState(15);

  // HIGH SCORE
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("highScore")) || 0
  );

  // CREATE / UPDATE
  const saveQuestion = (newQuestion, index) => {
    if (index === null) {
      setQuestions([...questions, newQuestion]);
    } else {
      const updated = [...questions];
      updated[index] = newQuestion;
      setQuestions(updated);
      setEditIndex(null);
    }
  };

  // DELETE
  const deleteQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  // EDIT
  const editQuestion = (index) => {
    setEditIndex(index);
  };

  // START QUIZ
  const startQuiz = () => {
    if (questions.length === 0) return;

    setIsQuizStarted(true);
    setCurrentQ(0);
    setScore(0);
    setTimeLeft(15);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  // TIMER LOGIC
  useEffect(() => {
    if (!isQuizStarted) return;

    if (timeLeft === 0) {
      handleNext();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isQuizStarted]);

  // ANSWER CHECK
  const handleAnswer = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === questions[currentQ].answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      handleNext();
    }, 800);
  };

  // NEXT QUESTION
  const handleNext = () => {
    const next = currentQ + 1;

    if (next < questions.length) {
      setCurrentQ(next);
      setTimeLeft(15);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      finishQuiz();
    }
  };

  // FINISH QUIZ
  const finishQuiz = () => {
    setIsQuizStarted(false);

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score);
    }
  };

  // RESTART
  const restartQuiz = () => {
    setIsQuizStarted(false);
    setCurrentQ(0);
    setScore(0);
    setTimeLeft(15);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  // EMPTY STATE
  if (questions.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Quiz Management System</h1>

        <AddQuestion
          saveQuestion={saveQuestion}
          editIndex={editIndex}
          questions={questions}
        />

        <QuestionList
          questions={questions}
          deleteQuestion={deleteQuestion}
          editQuestion={editQuestion}
        />

        <p style={{ color: "red" }}>
          Add questions first to start quiz
        </p>
      </div>
    );
  }

  // RESULT SCREEN
  if (!isQuizStarted && currentQ === questions.length) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h1>🎉 Quiz Finished</h1>

        <h2>
          Score: {score}/{questions.length}
        </h2>

        <h3>
          Percentage: {Math.round((score / questions.length) * 100)}%
        </h3>

        <h3>🏆 High Score: {highScore}</h3>

        <button onClick={restartQuiz}>Restart</button>
      </div>
    );
  }

  // QUIZ MODE
  if (isQuizStarted) {
    const q = questions[currentQ];

    const progress = ((currentQ + 1) / questions.length) * 100;

    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Quiz Mode</h1>

        {/* PROGRESS BAR */}
        <div
          style={{
            width: "100%",
            height: "10px",
            background: "#ddd",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "green",
            }}
          ></div>
        </div>

        <h3>Time Left: {timeLeft}s ⏱️</h3>

        <h3>
          Question {currentQ + 1} / {questions.length}
        </h3>

        <h2>{q.question}</h2>

        {q.options.map((opt, i) => {
          let bg = "";

          if (isAnswered) {
            if (opt === q.answer) bg = "green";
            else if (opt === selectedOption) bg = "red";
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              disabled={isAnswered}
              style={{
                display: "block",
                margin: "10px auto",
                padding: "10px",
                width: "220px",
                background: bg,
                color: bg ? "white" : "black",
                cursor: "pointer",
              }}
            >
              {opt}
            </button>
          );
        })}

        <h3>Score: {score}</h3>

        <button onClick={restartQuiz}>Exit Quiz</button>
      </div>
    );
  }

  // ADMIN MODE
  return (
    <div style={{ padding: "20px" }}>
      <h1>Quiz Management System</h1>

      <button onClick={startQuiz}>
        Start Quiz 🚀
      </button>

      <AddQuestion
        saveQuestion={saveQuestion}
        editIndex={editIndex}
        questions={questions}
      />

      <QuestionList
        questions={questions}
        deleteQuestion={deleteQuestion}
        editQuestion={editQuestion}
      />
    </div>
  );
}

export default App;