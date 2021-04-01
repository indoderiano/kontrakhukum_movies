import { useEffect, useState } from 'react'
import { replaceHomeList } from '../Redux/actions'
import { useDispatch } from 'react-redux'

export default function useFetchMovies ({search, page}) {
  // const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  // const [totalPages, setTotalPages] = useState(0)
  const [timer, setTimer] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    var url
    var delay
    if(search){
      url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${search}&page=${page}&include_adult=false`
      delay = 1000
    }else{
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=${page}`
      delay = 0
    }
    
    clearTimeout(timer)
    var newTimer = setTimeout(() => {
      setLoading(true)
      fetch(url)
      .then(response => response.json())
      .then(data => {
        // setMovies(data.results)
        // setTotalPages(data.total_pages)
        dispatch(replaceHomeList({
          movies: data.results,
          totalPages: data.total_pages
        }))
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
    }, delay)
    setTimer(newTimer)
  }, [search, page])

  return [loading]
}