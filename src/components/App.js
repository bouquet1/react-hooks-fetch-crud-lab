import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  //GET fetch req
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((questionData) => {
        setQuestions(questionData);
      }); //set qs to qData and then log qData so we can verify it's working
  }, []);

  function onAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  //DELETE fetch req deneme ek kod
  function onDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
      .then(r => r.json())
      .then((question) => setQuestions(question))
      .catch(error => {
        console.log("Error deleting question:", error);
      });
  }


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={onAddQuestion} /> : <QuestionList questions={questions} onDeleteQuestion={onDeleteQuestion} />}
    </main>
  );
}

export default App;

//
//p.s The catch() method of Promise instances schedules a function to be called when the promise is rejected. It immediately returns an equivalent Promise object, allowing you to chain calls to other promise methods. It is a shortcut for Promise.prototype.then(undefined, onRejected).

/**
 1.first, we created questions state to GET/questions in question list.
 2.useEffect for fetch request to get questions
 verify if we have the questions data console.log(questions)
 3. we gonna send qData to QuestionList Comp as a prop questions={questions} 
 4.next we gonna work @ QuestionList Comp 
 5.now we know our code works let's get rid of console.log("questionData ", questions) it is not professional to have them in your code. Validate and delete.

*  We created the function (onAddQuestion) and put it in JSX as a prop for QuestionForm. We passed the prop to the QuestionForm.

* Back to app after we changed our POST request. 
* created new function onDeleteQuestion that takes the 'id' of the question to be deleted as a parameter.Inside it, used fetch to send DELETE req to the server. URL:http://localhost:4000/questions/{id}. {id} is the id of the question to be deleted.
* After the DELETE request is successful, updated the questions state by filtering out the deleted question from the current questions array. (.then)
*Passed the onDeleteQuestion function as a prop to the QuestionList component.

 */

