import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import ResidentsCard from './components/ResidentsCard'
import Loader from './components/Loader'

function App() {

  const [inputValue, setInputValue] = useState(getRandomNumber(126))
  
  const url = `https://rickandmortyapi.com/api/location/${inputValue || 'Error'}`
  const [location, getLocation, hasError, isLoading ] = useFetch(url)
  const [firstItem, setFirstItem] = useState(0)
  const [lastItem, setLastItem] = useState(8)
  let quantyty = 8

  let residents = location?.residents.slice(firstItem,lastItem)
  let qtyResidts = location?.residents.length

  // console.log(location);
    
  useEffect(() => {
    getLocation()
  }, [inputValue])
  
  const inputSearch = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    setInputValue(inputSearch.current.value.trim())
    inputSearch.current.value = ""
    setFirstItem(0)
    setLastItem(8)
  }

   const sum = () => {
    setFirstItem(firstItem + quantyty )
    setLastItem(lastItem + quantyty)
  }

  const rest = () => {
    setFirstItem(firstItem - quantyty )
    setLastItem(lastItem - quantyty)
  }

  return (
    <div className='container_principal'>

      <div className='container__img'>
      <img className='img__Banner img1' src="https://i.postimg.cc/5NQMdLw5/p10376284-i-v13-ac.jpg" alt="Header--Banner" />
      <img className='img__Banner img2' src="https://i.postimg.cc/rsnQztxL/banner-ra-M.jpg" alt="Header--Banner" />
      </div>

      <form onSubmit={handleSubmit} className='form'>
        <input ref={inputSearch} type="text"
        placeholder='You must choose a location'/>
        <button className='btn__Search'>Search</button>
      </form>

        {
        isLoading 
        ? <Loader/>
        :
        (
          hasError
        ? <h2 className='hasErr'>Hey! you must provide an id from 1 to 126 ❌</h2>
        : <>
      <LocationInfo
      location={location}
      />
        <div className='container_card'> 
          {
          residents?.map(residentUrl => (
          <ResidentsCard
          key={residentUrl}
          residentUrl={residentUrl}
          />
          ))
          }
        </div>
        
        <div className='btn_Card'>
          <button onClick={rest} disabled={firstItem === 0} className='btn__previous'>Previous</button>
          <button onClick={sum} disabled={lastItem >= qtyResidts} className='btn__next'>Next</button>
        </div>
        </>
        )
      }
    </div>
  )
}

export default App
