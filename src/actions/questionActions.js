export const addQuestion = (question) => {
    return {
        type: 'ADD_QUESTION',
        payload: question
    }
}

export const addQuestionAsync = (question) => {

    return dispatch => {
        setTimeout(()=> {
            dispatch({
                type: 'ADD_QUESTION_ASYNC',
                payload: question
            })
        }, 100)
    }


}