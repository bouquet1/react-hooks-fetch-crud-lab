# Vocab

- Validations - Software rules to ensure data validity

## Choices

### QuestionList Comp

- We need to handle the GET our questions. Quiz Questions is in our QuestionList. Place question fetch in App.
- we need useState for GET/questions state. In App. Next we're @ App comp.

### App Comp

- first, useState to GET/questions in question list.
- useEffect for fetch request and console.log(questions) to verify

### QuestionList

- back here after App

  - we passed the questions props for QuestionList
    - Psuedo Code to keep moving ask yourself 1. Why did I pass the questions array into props? 2. What do I want to do with the questions? 3. What do I need to import? 4. Do I need any hooks to accomplish my tasks?

  * import QuestionItem and start working on displaying them

    - need the props of each individual question to pass into the QuestionItem Comp

    * map the questions, call a provided function on every element to create a new array of questions and individual QuestionItem
    * Make a variable outside return and pass that variable inside the ul
    * get rid of all the console.logs

    * P.S. Thompson's way of use effect/fetch syntax

const fetchQuestions = async () => {
const response = await fetch("http://localhost:4000/questions").then((r) => r.json());
setQuestions(response);
console.log("does fetch works? ", response);
};

useEffect(() => {
fetchQuestions();
}, []);

### QuestionForm

    * when we add a new question the PATCH request should send the question's content and add it to db.json, to our database. Then our question list has to reflect it meaning it should be added to question list meaning our question state has to change and reflect it.

    * Deliverable: When the user clicks the 'New Question' button, a form will be displayed for
    creating a new question.

     * we typed new questions and filled the form, and submitted. added console.log to handleSubmit to see if it works.
        function handleSubmit(event) {
            event.preventDefault();
            console.log("newly typed question ", formData); // output => newly typed question  {prompt: 'knock knock', answer1: 'orange', answer2: 'apple', answer3: 'banana', answer4: 'kiwi', …} COOL!
        }
    * Now, we wanna use this data(new question) in our POST request.

    * we created url variable to hold url string so we can have a cleaner fetch request in handleSubmit and then we did our fetch POST request
    fetch POST request: we need url, method, and headers and body. (the part about the format in readme POST rew for the API to work)

    * P.S. what does any given fetch rew pass back after it is made: a GET req passes back the result of the GET req. DELETE isn't gonna pass back anything. PATCH/POST are gonna pass back the thing (data) you changed.

    * Now, we need to list (it is already added db.json our database with the POST req) what we get back. To achieve this, we need to "lift!" the state. Meaning; we need to send the data to App so it can sen it to the QuestionList. We can pass info from child to parent comp with callback function.

    * Now we will go work on App, add a function (onAddQuestion).

### App

    * We created the function (onAddQuestion) and put it in JSX as a prop for QuestionForm. We passed the prop to the QuestionForm.

### QuestionForm

    * We're back from App and we passed the prop onAddQuestion. THompson (T), props u direk fetch in icine props.onAddQuestion(formData) olarak aktardi ama ben diger sekilde aktardim.

    *  we passed our prop in our fetch POST req and called it with the new question => onAddQuestion(questionData);

     * Now, we had an error. In console => Uncaught TypeError: Cannot read properties of undefined (reading 'map') and he above error occurred in the <QuestionItem> component: and so on.. debugging tips are in the review.md

        Debugging tips:
        * T, checked db.json. new question is added. He deleted and added again to check. The new question is added.

        * T, reads the error. .map() isn't working bc .map() is expecting an array. InQuestionList we have our .map() so T added console.log("Questions in question list ", questions) bc the question list was rendering just fine before our new question, now is not doing that.  we're getting an error at .map() and it is asking for an array (properties undefined reading 'map'). So, T console.log to see what we get than if it is not an array.

        * console.log gives us an array. T opens up the info to check.
            (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
            we see the problem when we checked the details and compared the one of the QuestionList(5) we mapped without a problem before the new wuestion that is added to the QuestionList(6).

            5:
            answers:
            (4) ['voodoo', 'conditional', 'reactive', 'controlled']
            correctIndex: 1
            id: 6
            prompt: "Returning different elements from a component depending on the state of your application is known as _____ rendering."
            [[Prototype]]: Object

            6:
            answer1: "orange"
            answer2: "apple"
            answer3: "banana"
            answer4: "kiwi"
            correctIndex: "0"
            id:7
            prompt:
            "knock knock"
            [[Prototype]]:Object

        * as we see above answers are supposed to be in an array. We have to put our information from the formData (answers part) in an array.

        * So, we modified our formData.

            our new question object that we defined in state
            {
            prompt: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            correctIndex: 0,
            }

            Example of an object in db.json , answers are an array
            {
            "id": 6,
            "prompt": "Returning different elements from a component depending on the state of your application is known as _____ rendering.",
            "answers": ["voodoo", "conditional", "reactive", "controlled"],
            "correctIndex": 1
            }

            modified formData is below

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

    * Now, we'll work on DELETE fetch request to delete the question from the list by updating state and should be deleted from the server. (time stamp 1:20)

    * Video burdan sonra hizli bir de T'nin yaptigi calismiyor gibi. Study buddy ile yaptim. Ne yaptim yaziyim adim adim. ilk olarak App e gittim ve DELETE fetch i yazdim.

### App

    * created new function onDeleteQuestion that takes the 'id' of the question to be deleted as a parameter.Inside it, used fetch to send DELETE req to the server. URL:http://localhost:4000/questions/{id}. {id} is the id of the question to be deleted.

    * After the DELETE request is successful, updated the questions state by filtering out the deleted question from the current questions array. (/then)

    * Passed the onDeleteQuestion function as a prop to the QuestionList component.

### QuestionList

    * onDeleteQuestion prop is added.

    * The key prop is set earlier to the question.id to ensure a unique identifier for each item.

    * onDeleteQuestion function is passed as props to the QuestionItem component along with the question object.

### QuestionItem

    * onClick event listener handleDelete function is added, which is called when the "Delete Question" button is clicked.

    * handleDelete function is created and the the question id is passed
