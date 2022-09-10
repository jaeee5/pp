
function Question({choices,question}){


    return(
        <div className="container">
            <p className="question">{question}</p>
            <div className="answers">
                {choices}
            </div>
        </div>
    )
}

export default Question