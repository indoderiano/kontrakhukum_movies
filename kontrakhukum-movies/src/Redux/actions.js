const apiurl = 'https://kontrakhukummovies-server.herokuapp.com'

export const replaceHomeList = (payload) => {
    return {type: 'HOME/REPLACE', payload}
}

export const loadMovies = (sort='', page, search='') => {
    return (dispatch) => {
        console.log('ini loadmovies')
        dispatch({type: 'HOME/LOADING'})
        let url = `${apiurl}/movies?sort=${sort}&limit=5&page=${page}&search=${search}`
        fetch(url)
        .then(response => {
            // console.log(response.ok)
            if(!response.ok){
                throw Error(response.statusText)
            }
            return response.json()
        })
        .then(data => {
            console.log('here')
            console.log(data)
            dispatch(replaceHomeList({
                movies: data.rows,
                count: data.count
            }))
        })
        .catch(err => {
            console.log(err)
        })
    }
}