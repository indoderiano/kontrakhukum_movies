import React, { useEffect, useState } from 'react'
import {
  Card,
  Image,
  Rating,
  Dimmer,
  Loader,
  Button,
  Message,
  Icon,
  Label,
  Header
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {replaceFavorites} from '../Redux/actions'

export default function CardMovie ({movie, loading}) {
  const dispatch = useDispatch()
  const {favorites} = useSelector(state => state.favorites)
  const [isFav, setIsFav] = useState(false)
  const [addLoading, setAddLoading] = useState(false)

  useEffect(() => {
    let check = false
    for(let i=0 ; i<favorites.length ; i++){
      if(favorites[i].id === movie.id){
        setIsFav(true)
        check = true
        break
      }
    }
    if(!check){
      setIsFav(false)
    }
  }, [favorites,movie])

  const onClickFavorites = () => {
    let newFavorites = [...favorites]
    let check = false
    for(let i=0 ; i<newFavorites.length ; i++){
      if(newFavorites[i].id === movie.id){
        newFavorites.splice(i,1)
        check = true
        break
      }
    }
    if(!check){
      newFavorites.push(movie)
    }
    setAddLoading(true)
    dispatch(replaceFavorites(newFavorites))
    setTimeout(() => {
      setAddLoading(false)
    }, 2000)
  }

  return (
    <Card
      style={{textAlign: 'left', maxWidth: '200px'}}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
        onError={(e) => {e.target.src='https://semantic-ui-vue.github.io/static/images/wireframes/white-image.png'}}
        wrapped
        ui={false} />
      <Card.Content>
        <Card.Header style={{marginBottom: '.5em'}}>{movie.original_title}</Card.Header>
        <Card.Meta style={{marginBottom: '1em'}}>
          <div>
            <Rating
              disabled
              icon='star'
              defaultRating={Math.round(movie.rate/2)}
              maxRating={5}
              style={{marginRight: '.5em'}}
            />
            {movie.rate}({movie.rate_count})
          </div>
        </Card.Meta>
        <Card.Description>
          {movie.overview}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>
          <Header>Actors</Header>
          {
            movie.Actors.map((actor, index) => {
              return (
                <Label key={index}>
                  {actor.name}
                </Label>
              )
            })
          }
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          icon='heart'
          style={{color: isFav? 'red' : ''}}
          onClick={() => {
            onClickFavorites()
          }}
        />
        <Link style={{float:'right', color: 'teal', marginTop: '15px'}} to={`/movie/${movie.id}`}>
          details <span style={{verticalAlign: '-1.5px', marginLeft: '-3px'}}><Icon name='angle double right'/></span>
        </Link>
      </Card.Content>
      <Dimmer active={loading} inverted>
        <Loader inverted content='Loading' />
      </Dimmer>
      {
        isFav ? 
        <Message
          info
          style={{
            position: 'absolute',
            top: addLoading ? '60%' : '70%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            opacity: addLoading ? '1' : '0',
            visibility: addLoading ? 'visible' : 'hidden',
            transition: 'all .7s ease'
          }}
        >
          <Message.Header>Added to Favorites</Message.Header>
        </Message>
        :
        <Message
          warning
          style={{
            position: 'absolute',
            top: addLoading ? '60%' : '70%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            opacity: addLoading ? '1' : '0',
            visibility: addLoading ? 'visible' : 'hidden',
            transition: 'all .7s ease'
          }}
        >
          <Message.Header>Removed from Favorites</Message.Header>
        </Message>
      }
    </Card>
  )
}
