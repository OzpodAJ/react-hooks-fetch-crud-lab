import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";


function QuestionList() {
  //Establish state to represent questions
  const [questions, setQuestions] = useState([]);
  //GET questions from server
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => {
        setQuestions(questions);
      });
  }, []);

  //Establish Method to DELETE questions from the server
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
        .then((r) => r.json())
        .then(() => {
          //const for updatedQuestions filter out selected data and redo state with removed data
          const updatedQuestions = questions.filter((q) => q.id !== id);
          setQuestions(updatedQuestions);
        });
  }

  //Use a PATCH fetch request to send answer and update appropriatly
  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
        .then((r) => r.json())
        .then((updatedQuestion) => {
          const updatedQuestions = questions.map((q) => {
            if(q.id === updatedQuestion.id) return updatedQuestion;
            return q
          });
          setQuestions(updatedQuestions)
        });
  }
  //set up JSX to represent questions and added functionalities 
  const questionItems = questions.map((q) => (
    <QuestionItem
      key = {q.id}
      question = {q}
      onDelete={handleDelete}
      onAnswerChange={handleAnswerChange}
    />
  ))

  //establish final JSX to pass to App component for rendering in DOM
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
