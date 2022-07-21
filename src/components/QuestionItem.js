import React from "react";
//set function with components to pass as props to QuestionList 
function QuestionItem({ question, onDelete, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  //create delete callBack function
  function  handleDelete(){
    onDelete(id);
  }
  //do same for answering question
  function handleAnswerChange(e) {
    onAnswerChange(id, parseInt(e.target.value));
  }
  //JSX format to represent individual questions
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select 
          defaultValue={correctIndex}
          onChange={handleAnswerChange}>
            {options}
        </select>
      </label>
      <button onClick = {handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
