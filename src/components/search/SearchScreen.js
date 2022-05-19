import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'
import { useForm } from '../../hooks/useForm';
import getHeroesByName from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {q = ''} = queryString.parse(location.search)
  // const query = queryString.parse(location.search)
  const [values, handleInputChange] = useForm({
    searchText: q,
  });



  const { searchText } = values;


  const heroesFilter = useMemo(()=>getHeroesByName(q),[q])

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`?q=${searchText}`)

  };

  return (
    <>
      <h1>Busquedas</h1>
      <div className='row'>
        <div className='col-5'>
          <h4> Buscar </h4>
          <hr />
          <form onSubmit={handleSearch}>
            <input
              type='text'
              className='form-control'
              placeholder='Buscar un heroe'
              name='searchText'
              value={searchText}
              onChange={handleInputChange}
              autoComplete='off'
            />
            <button className='btn btn-primary mt-1' type='submit'>
              Buscar
            </button>
          </form>
        </div>
        <div className='col-7'>
          <h4>Resultado</h4>
          <hr/>

          {
            (q === '')  ? <div className='alert alert-info'> Buscar un heroe </div> :

            (heroesFilter.length === 0) && <div className='alert alert-danger'> No har resultados para: {q}</div>
          }
          {
            heroesFilter.map(hero => <HeroCard key={hero.id} {...hero}/>)
          }
        </div>
      </div>
    </>
  );
};
