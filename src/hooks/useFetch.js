import axios from "axios"
import { useState } from "react"

const useFetch = (url) => {
    
  const [infoApi, setInfoApi] = useState()
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const getApi = () => {
    setIsLoading(true)
    axios.get(url)
        .then(response => {
          setInfoApi(response.data)
          setHasError(false)
        })
        
        .catch(error => {
            console.log(error)
            setHasError(true)
        })
        .finally(() => setIsLoading(false))
    }
  return [ infoApi, getApi, hasError, isLoading ]
}

export default useFetch