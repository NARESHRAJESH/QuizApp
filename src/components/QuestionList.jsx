function QuestionList({ questions, deleteQuestion, editQuestion }) {
  return (
    <div>
      <h2>Questions List</h2>

      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: "15px" }}>
          <h3>
            {index + 1}. {q.question}
          </h3>

          <p><b>Answer:</b> {q.answer}</p>

          <button
            onClick={() => editQuestion(index)}
            style={{
              marginRight: "10px",
              background: "orange",
              color: "white",
              border: "none",
              padding: "6px 12px",
              cursor: "pointer"
            }}
          >
            Edit ✏️
          </button>

          <button
            onClick={() => deleteQuestion(index)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "6px 12px",
              cursor: "pointer"
            }}
          >
            Delete ❌
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default QuestionList;