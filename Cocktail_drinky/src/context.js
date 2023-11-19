import React, { useState, useContext, 
  useEffect, useCallback } from 'react'
import axios from 'axios'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('a')
  const [cocktails, setCocktails] = useState([])
  
  const value = {
    loading, searchTerm, cocktails, setSearchTerm
  }

  const fetchDrinks = useCallback(async () => {
    setLoading(true)
    try {
      const {data} = await axios(`${url}${searchTerm}`, {
        headers: 'application/json'
      })
      const {drinks} = data
      if (drinks) {
        const newCocktails = drinks.map((drink) => {
          const { 
            idDrink, 
            strDrink, 
            strDrinkThumb, 
            strAlcoholic, 
            strGlass} = drink;

            return {
              id: idDrink, 
              name: strDrink, 
              image:strDrinkThumb,
              info: strAlcoholic, 
              glass:strGlass}
        })

        setCocktails(newCocktails)
        
      } else {
        setCocktails([])
      }
      setLoading(false)
      
    } catch (err) {
      console.log(err.response);
      setLoading(false)
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchDrinks()
  }, [searchTerm, fetchDrinks]);

  return <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
