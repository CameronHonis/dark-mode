import { useState, useEffect } from 'react'

export const useSearchBar = (searchArray, key, value) => {

  const [ filteredArray, setFilteredArray ] = useState([])

  useEffect(() => {
    if (searchArray && searchArray.length && String(searchArray[0][key]) && value){
      setFilteredArray(searchArray.filter(v => String(v[key]).toLowerCase().includes(value.toLowerCase())))
    } else {
      setFilteredArray(searchArray || [])
    }
  },[searchArray, key, value])

  return filteredArray
}