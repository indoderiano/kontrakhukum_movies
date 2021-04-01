import React, { useEffect, useState } from 'react'
import CardMovie from '../Components/CardMovieFunction'
// import useFetchMovies from '../Hooks/useFetchMovies'
import { useSelector, useDispatch } from 'react-redux'
import {loadMovies} from '../Redux/actions'
import { Header, Card, Container, Pagination, Input, Icon, Loader, Checkbox, Segment } from 'semantic-ui-react'


export default function Home () {
  // POPULAR LIST
  const {movies, count, isLoading} = useSelector(state => state.home)
  const dispatch = useDispatch()
  const [timer, setTimer] = useState(null)
  const moviesPerPage = 5
  const [isSortedByRating, setIsSortedByRating] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  useEffect(() => {
    let delay = 0
    if(search){
      delay = 1000
    }
    clearTimeout(timer)
    var newTimer = setTimeout(() => {
      dispatch(loadMovies(isSortedByRating?'rate':null, page, search))
    }, delay)
    setTimer(newTimer)
  }, [page, isSortedByRating, search])


  function renderMovies () {
    return (
      <>
        <Header as="h1" inverted style={{textAlign: 'left', fontSize: '36px', marginBottom: '0em'}}>
          Movies
        </Header>

        <div
          style={{
            textAlign: 'right',
            marginBottom: '1em'
          }}
        >
          <div
            style={{
              // padding: '10px',
              display: 'inline-block',
              // backgroundColor: 'white',
              // borderRadius: '10px',
              // overflow: 'hidden'
            }}
          >
            <Segment compact>
              <Checkbox
                toggle
                onChange={(e, data)=>{
                  console.log(data.checked)
                  if(data.checked){
                    setPage(1)
                    setIsSortedByRating(true)
                  }else{
                    setPage(1)
                    setIsSortedByRating(false)
                  }
                }}
                label={'Sort by rating'}
              />

            </Segment>
          </div>
        </div>

        {
          !isLoading?
          <Card.Group style={{justifyContent: 'center', marginBottom: '2em'}}>
            {
              movies.map((mov, index) =>{
                return (
                  <CardMovie movie={mov} loading={isLoading} key={index}/>
                )
              })
            }
          </Card.Group>
          :
          <div style={{height: '200px',position: 'relative'}}>
            <Loader active inverted content='Loading' />
          </div>
        }
        <Pagination
          style={{marginBottom: '2em'}}
          activePage={page}
          onPageChange={(e, { activePage }) => setPage(activePage)}
          totalPages={Math.ceil(count/moviesPerPage)}
        />
      </>
    )
  }

  return (
    <div style={{padding: '2em 2em'}}>
        
      <Container text style={{marginBottom: '2em'}}>
        <Header
          as='h1'
          content='KontrakHukum Movie Database'
          inverted
          style={{
            fontSize: true ? '2em' : '4em',
            fontWeight: '900',
            marginBottom: 0,
            marginTop: true ? '1.5em' : '3em',
          }}
        />
        <Header
          as='h2'
          content='Do whatever you want when you want to.'
          inverted
          style={{
            fontSize: true ? '1.5em' : '1.7em',
            fontWeight: 'normal',
            marginTop: true ? '0.5em' : '1.5em',
          }}
        />
        <Input
          icon={<Icon name='x' link onClick={() => {setSearch('')}} />}
          // iconPosition='right'
          placeholder='Search movies...'
          style={{minWidth: '350px',margin: '1em 0'}}
          value={search}
          onChange={(e) => {
            setPage(1)
            setSearch(e.target.value)
          }}
        />
      </Container>

      {
        renderMovies()
      }

    </div>
  )
}
