import { useState, useEffect } from 'react'
import Question from './components/Question'
import Landing from './components/Landing'
import { nanoid } from "nanoid"
let QuestionElements = []
let answersArray = []

function App() {
  
  const [questionsArray, setQuestionsArray] = useState([])
  const [questions, setQuestions] = useState([])
  const [gameOver, setGameOver] = useState(true)
  

  const url = "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
  useEffect(()=>{
    fetch(url)
      .then(res => res.json())
      .then(data =>{
        setQuestionsArray(data.results)
      })
  },[])

  function getQuestions(){
    setQuestions(questionsArray.map(q =>{
      return {
        question: q.question,
        correct: q.correct_answer,
        incorrect: [...q.incorrect_answers],
        id: nanoid()
      }
    }))
  }

  function handleClick(choiceid, questionid, choice) {

    if (answersArray.length > 0){
      for (let i = 0; i < answersArray.length ; i++ ){
        answersArray.push(choice)
      }
    }
    console.log(answersArray)
  }

  // function handleSubmit(){

  // }

  function getQuestionsElements(){
    QuestionElements = questions.map(question => {
      const choices = [...question.incorrect, question.correct].sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      return (
          <Question 
            key={question.id} 
            id={question.id} 
            question={question.question} 
            choices={choices} 
            handleClick={handleClick}
          />
      )
    })
    return QuestionElements
  }

  function startQuiz(){
    getQuestions()
    
    setGameOver(false)

  }

  return (
    <main>

      { gameOver 
        ? 
          <Landing startQuiz={startQuiz} gameOver={gameOver}/> 
        :
          <div>
            {getQuestionsElements()}
            <button 
              className='check-answer'
            >
              Check Answers
            </button>
          </div>
      }
    </main>
    
  )
}

export default App
