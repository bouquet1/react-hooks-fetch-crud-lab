import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((questionData) => {
        setQuestions(questionData);
      }); //set qs to qData and then log qData so we can verify it's working
  }, []);

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm /> : <QuestionList questions={questions} />}
    </main>
  );
}

export default App;

/**
 1.first, we created questions state to GET/questions in question list.
 2.useEffect for fetch request to get questions
 verify if we have the questions data console.log(questions)
 3. we gonna send qData to QuestionList Comp as a prop questions={questions} 
 4.next we gonna work @ QuestionList Comp 
 5.now we know our code works let's get rid of console.log("questionData ", questions) it is not professional to have them in your code. Validate and delete.
 */
