import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  const url = "http://localhost:4000/questions";

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("newly typed question ", formData);
    /**
     * Example of an object in db.json to convert the answers part of our new question into an array     
    {
      "id": 6,
      "prompt": "Returning different elements from a component depending on the state of your application is known as _____ rendering.",
      "answers": ["voodoo", "conditional", "reactive", "controlled"],
      "correctIndex": 1
    }
     */
    const formDataObjectRevised = {
      prompt: formData.prompt,
      answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
      correctIndex: formData.correctIndex,
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataObjectRevised),
      //we need to turn it into valid JSON data
    })
      .then((r) => r.json())
      .then((questionData) => {
        console.log("Question data after POST: ", questionData);
        onAddQuestion(questionData);
        //I put formData here but it should be questionData bc formData is what we sent, questionData is what we get back after POST. questionData holds the same data of formData.
      });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input type="text" name="prompt" value={formData.prompt} onChange={handleChange} />
        </label>
        <label>
          Answer 1:
          <input type="text" name="answer1" value={formData.answer1} onChange={handleChange} />
        </label>
        <label>
          Answer 2:
          <input type="text" name="answer2" value={formData.answer2} onChange={handleChange} />
        </label>
        <label>
          Answer 3:
          <input type="text" name="answer3" value={formData.answer3} onChange={handleChange} />
        </label>
        <label>
          Answer 4:
          <input type="text" name="answer4" value={formData.answer4} onChange={handleChange} />
        </label>
        <label>
          Correct Answer:
          <select name="correctIndex" value={formData.correctIndex} onChange={handleChange}>
            <option value="0">{formData.answer1}</option>
            <option value="1">{formData.answer2}</option>
            <option value="2">{formData.answer3}</option>
            <option value="3">{formData.answer4}</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;

//
//
/**
 * Deliverable: When the user clicks the 'New Question' button, a form will be displayed for creating a new question.
 * we typed new questions and filled the form, and submitted. added console.log to handleSubmit to see if it works. We got our prompt.
  function handleSubmit(event) {
    event.preventDefault();
    console.log("newly typed question ", formData); // output => newly typed question  {prompt: 'knock knock', answer1: 'orange', answer2: 'apple', answer3: 'banana', answer4: 'kiwi', …} COOL!
  }
  * we created url variable to hold url string so we can have a cleaner fetch request in handleSubmit and then we did our fetch POST request
  fetch POST request: we need url, method, and headers and body. (the part about the format in readme POST rew for the API to work)

  *questionData holds the same data of formData. formData is what we sent, questionData is what we get back after POST. Now, we need to list (it is already added db.json our database with the POST req) what we get back. 
  
  * To achieve this, we need to "lift!" the state. Meaning; we need to send the data to App so it can sen it to the QuestionList. We can pass info from child to parent comp with callback function. 

  * Now we will go work on App, add a function (onAddQuestion).

  *  We're back from App and we passed the prop onAddQuestion. THompson props direk fetch in icine props.onAddQuestion(formData) olarak aktardi ama ben diger sekilde aktardim.

  *  we passed our prop in our fetch POST req and called it with the new question => onAddQuestion(questionData);

  * Now, we had an error. In console => Uncaught TypeError: Cannot read properties of undefined (reading 'map') and he above error occurred in the <QuestionItem> component: and so on.. debugging tips are in the review.md

  * We debugged the error. answers of our new question are supposed to be in an array. We have to put our information from the formData (answers part) in an array. 

  * T uncommented the fetch() to work on only formData. 
  
  * modified formData is below

      const formDataObjectRevised = {
          prompt: formData.prompt,
          answers: [
          formData.answer1,
          formData.answer2,
          formData.answer3,
          formData.answer4
          ],
          correctIndex: formData.correctIndex,
        }

  then we changed the body of our fetch POST request:      
  body: JSON.stringify(formDataObjectRevised),


 */
