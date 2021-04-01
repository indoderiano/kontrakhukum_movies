
const initialState = {
    movies: [],
    count: 0,
    isLoading: false
}

function reducer (state = initialState, action) {
    switch(action.type){
        case 'HOME/REPLACE':
            return {...initialState, ...action.payload, isLoading: false}
        case 'HOME/LOADING':
            return {...state, isLoading: true}
        default:
            return state
    }
}

export default reducer