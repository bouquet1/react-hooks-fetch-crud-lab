import React from "react";

function QuestionItem({ question, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete (id) {
    onDeleteQuestion(id);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={() => handleDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;


//
//
/**
 * onClick event listener handleDelete function is added, which is called when the "Delete Question" button is clicked.
 * handleDelete function is created and the question id is passed
 */

