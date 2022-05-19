import React, { useMemo } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { getHeroesById } from '../../selectors/getHeroesById'

export const HeroScreen = () => {
  const {heroid} = useParams()
  const navigate = useNavigate()
  
  const hero = useMemo(()=>getHeroesById(heroid), [heroid])
  if(!hero) return <Navigate to='/'/>

  const {id, superhero, publisher, alter_ego, first_apparence, characters} = hero
  const imagePath = `/assets/${id}.jpg`;

  const handleReturn = () => {
    navigate(-1)
  }
  return (

    <div className='row mt-5'>
      <div className='col-4 animate__animated animate__fadeInLeft'>
        <img src={imagePath} alt={superhero} className='img-thumbnail' />
      </div>
      <div className='col-8 animate__animated animate__fadeIn'>
        <h3> {superhero} </h3>
        <ul className='list-group list-group-flush'>
            <li className='list-group-item'> <b>Alter ego:</b> {alter_ego} </li>
            <li className='list-group-item'> <b>Publisher:</b> {publisher} </li>
            <li className='list-group-item'> <b>first apparence:</b> {first_apparence} </li>

        </ul>

        <h5>characters</h5>
        <p>{characters}</p>

        <button className='btn btn-outline-info' onClick={handleReturn}>
          Regresar
        </button>
      </div>
    </div>
  )
}
