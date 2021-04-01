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
  }, [movie])


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
      <Dimmer active={loading} inverted>
        <Loader inverted content='Loading' />
      </Dimmer>
    </Card>
  )
}
