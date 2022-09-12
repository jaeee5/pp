import Choice from './Choice'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

function Question({choiceState, choices, handleClick, id, question}){

    const [c, setC] = useState([])

    function getChoiceElements() {
        setC(choices.map(choice => ({ choice: choice, choiceId: nanoid(), isSelected: false })))
    }

    function toggleSelected(id){
        setC( prevC => prevC.map(c => c.choiceId === id 
            ? 
                {...c, isSelected: !c.isSelected}
            :
                c
        ))
    }

    useEffect(()=>{
        getChoiceElements()
    },[])

    const choiceElements = () => {
        return c.map(choice =>
            <Choice
                key={choice.choiceId}
                choice={choice.choice}
                questionId={id}
                choiceId={choice.choiceId}
                handleClick={handleClick}
                isSelected={choice.isSelected}
                toggleSelected={toggleSelected}
            />
        )
    }

    return(
        <div className="container">
            <p className="question">{question}</p>
            <div className="answers">
                {choiceElements()}
            </div>
        </div>
    )
}

export default Question