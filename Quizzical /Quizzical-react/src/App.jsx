import { useState, useEffect } from 'react'
import Question from './components/Question'
import { nanoid } from "nanoid"
let QuestionElements = []

function App() {
  
  const [questionsArray, setQuestionsArray] = useState([])

  const url = "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
  useEffect(()=>{
    fetch(url)
      .then(res => res.json())
      .then(data =>{
        setQuestionsArray(data.results)
        getQuestions()
      })
  },[])

 

  function getQuestions(){
    QuestionElements = questionsArray.map(question => {
      const choices = [...question.incorrect_answers, question.correct_answer]
      return (
        <div>
          <Question key={nanoid()} question={question.question} choices={choices} />
          
        </div>
      )
    })
  }
  
  return (
    <main>
      <h1>Quizzical</h1>
      {QuestionElements}
      <button className='check-answer'>Check Answers</button>
    </main>
    
  )
}

export default App
