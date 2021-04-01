// import { createStore } from 'redux'

const temp = {
    favorites: []
}

function reducer (state = temp, action) {
    switch(action.type){
        case 'FAVORITES/ADD':
            return {...state, favorites: [...state.favorites, action.payload]}
        case 'FAVORITES/REPLACE':
            return {...state, favorites: action.payload}
        default:
            return state
    }
}

// let store = createStore(reducer)

export default reducer