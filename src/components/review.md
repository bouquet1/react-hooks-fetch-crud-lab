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
