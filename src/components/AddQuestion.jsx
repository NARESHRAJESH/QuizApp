import { useState, useEffect } from "react";

function AddQuestion({ saveQuestion, editIndex, questions }) {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");

  // Load data when editing
  useEffect(() => {
    if (editIndex !== null) {
      const q = questions[editIndex];

      setQuestion(q.question);
      setOption1(q.options[0]);
      setOption2(q.options[1]);
      setOption3(q.options[2]);
      setOption4(q.options[3]);
      setAnswer(q.answer);
    }
  }, [editIndex]);

  const handleSubmit = () => {
    const newQuestion = {
      question,
      options: [option1, option2, option3, option4],
      answer,
    };

    saveQuestion(newQuestion, editIndex);

    // clear form
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswer("");
  };

  return (
    <div>
      <h2>{editIndex !== null ? "Edit Question" : "Add Question"}</h2>

      <input
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <br /><br />

      <input placeholder="Option 1" value={option1}
        onChange={(e) => setOption1(e.target.value)} />
      <br /><br />

      <input placeholder="Option 2" value={option2}
        onChange={(e) => setOption2(e.target.value)} />
      <br /><br />

      <input placeholder="Option 3" value={option3}
        onChange={(e) => setOption3(e.target.value)} />
      <br /><br />

      <input placeholder="Option 4" value={option4}
        onChange={(e) => setOption4(e.target.value)} />
      <br /><br />

      <input placeholder="Answer" value={answer}
        onChange={(e) => setAnswer(e.target.value)} />
      <br /><br />

      <button onClick={handleSubmit}>
        {editIndex !== null ? "Update Question" : "Add Question"}
      </button>
    </div>
  );
}

export default AddQuestion;