import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions }) {
  console.log("Questions in question list ", questions);
  const questionMap = questions.map((question) => <QuestionItem key={question.id} question={question} />);

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionMap}</ul>
    </section>
  );
}

export default QuestionList;

//
//
/**
 1.We need to handle the GET our questions. Quiz Questions is in our QuestionList.
 2.we need useState for GET/questions state. In App. we go to App comp
 3.back here after App step 4
 4. we pass the prop questions here
 5.import QuestionItem and start working on displaying them
 6.map the questions, call a provided function on every element to create a new array of questions and individual QuestionItem
 7.Make a variable outside return and pass that variable inside the ul
 8. get rid of console.log("Questions Props: ", questions);
 */
