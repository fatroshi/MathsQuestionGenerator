const initialState = {
    question: 1,
    lastQuestions: []
}

const questionReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case "CREATE":
            state = {
                ...state,
                question: action.payload,
                lastQuestions: [...state.lastQuestions, action.payload]
            };

            break;
        case "ADD_QUESTION":
            state = {
                ...state,
                question: action.payload,
                lastQuestions: [...state.lastQuestions, action.payload]
            };
            break;

        case "ADD_QUESTION_ASYNC":
            state = {
                ...state,
                question: action.payload,
                lastQuestions: [...state.lastQuestions, action.payload]
            };
            break;
    }

    return state;
}

export default questionReducer;