const axios = require('axios')

axios({
    url: 'https://api.themoviedb.org/3/movie/popular?api_key=62b1b0f81d7c7464682683d57d6241d6&language=en-US&page=1',
    method: 'GET'
})
.then(({data}) => {
    console.log(data)
})
.catch(err => {
    console.log(err)
})