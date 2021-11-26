import React from 'react';
import SetupForm from './SetupForm';
import Modal from './Modal';
import Loading from './Loading';
import './App.css';
import { useGlobalContext } from './context';

function App() {
  const{loading , waiting, questions, index, correct ,nextQuestion, checkAnswer}= useGlobalContext();

  if(waiting){
    return <SetupForm />
  }
  if(loading){
    return <Loading/>
  }
const { question, correct_answer, incorrect_answers } =questions[index]
/*for the first work i put correct answer at the end of array of answer */
/* make random palce for answer */
/* make random number between 0-3 */

//const answers= [...incorrect_answers, correct_answer]
let answers =[...incorrect_answers]
const tempIndex = Math.floor((Math.random()) *4)
console.log(tempIndex)
/*if the random number is 3, put correct-answer to the end of array*/
if(tempIndex === 3){
  answers.push(correct_answer)

}else{
  answers.push(answers[tempIndex])
  answers[tempIndex] = correct_answer
}
    return (
      <main>
       <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : {correct}/{index}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className='btn-container'>
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className='answer-btn'
                 onClick={() => checkAnswer(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              )
            })}
          </div>
        </article>
        <button className='next-question' onClick={nextQuestion}>
          next question
        </button> 
      </section>
    </main>
  );
}

export default App;
