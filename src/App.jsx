import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import ResidentsCard from './components/ResidentsCard'
import Loader from './components/Loader'
import PageCard from './components/PageCard'

function App() {

  const [inputValue, setInputValue] = useState(getRandomNumber(126))
  
  const url = `https://rickandmortyapi.com/api/location/${inputValue}`
  const [location, getLocation, hasError, isLoading ] = useFetch(url)

  const [firstItem, setFirstItem] = useState(1)
  const [lastItem, setLastItem] = useState(8)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [locationsList, setLocationsList] = useState([])
  const [errorMessage, setErrorMessage] = useState("Hey! you must provide an id from 1 to 126 or the location's name ❌")

  const lastIndex = firstItem * lastItem
  const firstIndex = lastIndex - lastItem

  let quantyty = 8

  let residents = currentLocation?.residents.slice(firstIndex,lastIndex)
  // let qtyResidts = location?.residents.length

    
  useEffect(() => {
    getLocation()
  }, [inputValue])

  useEffect(() => {
    setLocationsList([])
  }, [currentLocation])

  useEffect( () => {
    let tempCurrentLocation = location 
    if ( tempCurrentLocation !== undefined && tempCurrentLocation.hasOwnProperty('results')) {
      if (location.results.length > 1) {
        setLocationsList(location.results)
      } else {
        setCurrentLocation(location.results[0])
      }
    } else {
      setCurrentLocation(tempCurrentLocation)
    }    
  }, [location])
  
  const inputSearch = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    let searchString = inputSearch.current.value.trim()
    if (!Number(searchString)) {
      searchString = `?name=${searchString}`
    }
    setInputValue(searchString)
    inputSearch.current.value = ""
    setFirstItem(1) 
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

        {/* Hacer esto bien bonito */}
        <ul>
          {
            locationsList.map((location, i) => {
                return <li key={i} onClick={ () => setCurrentLocation(location)}> {location.name} </li>
            })
          }
        </ul>

        {
        isLoading 
        ? <Loader/>
        :
        (
          hasError
          ? <h2 className='hasErr'>{ errorMessage }</h2>
          : <>

          <LocationInfo
            location={currentLocation}
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
          
          <PageCard
            quantyty={quantyty} 
            setFirstItem={setFirstItem}
            firstItem={firstItem}
            lastItem={lastItem}
            setLastItem={setLastItem}
            qtyResidts={currentLocation?.residents.length}
          />

          </>
        )
      }
    </div>
  )
}

export default App
