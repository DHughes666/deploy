import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams();
  const [loading, setLoading] = React.useState(false)
  const [cocktail, setCocktail] = React.useState(null)

  React.useEffect(() => {
    setLoading(true)
    const getCocktail = async () => {
      try {
        const response = await axios(`${url}${id}`)
        const data = response.data
        if (data.drinks) {
          const {idDrink: id, 
            strDrink: name, 
            strDrinkThumb: image,
            strAlcoholic: info, 
            strGlass: glass,
            strCategory: category,
            strInstructions: instructions,
            strIngredient1, 
            strIngredient2,
            strIngredient3,
            strIngredient4
          } = data.drinks[0]
          const ingredients = [
            strIngredient1, 
            strIngredient2,
            strIngredient3,
            strIngredient4
          ]

          const newCocktail = {
            id, name, image, info, glass, 
            category, instructions, ingredients
          }
          setCocktail(newCocktail)
          setLoading(false)

        } else {
          setCocktail(null)
        }
      } catch (err) {
        console.log(err.response);
        setLoading(false)
      }
    }
    getCocktail();
  }, [id])

  if (loading) {
    return <Loading />
  }

  if (!cocktail){
    return <h2 className='section-title'>no cocktail</h2>
  }

  const {name, image, category, 
    glass, info, instructions, ingredients} =cocktail

  return (
    <section className='section cocktail-section'>
      <Link to="/" className='btn btn-primary'>
        back home
      </Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <img src={image} alt={name} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name: </span>{name}
          </p>
          <p>
            <span className='drink-data'>category: </span>{category}
          </p>
          <p>
            <span className='drink-data'>glass: </span>{glass}
          </p>
          <p>
            <span className='drink-data'>info: </span>{info}
          </p>
          <p>
            <span className='drink-data'>ingredients :</span>
            {ingredients.map((ingredient, index) => {
              return ingredient && <span key={index}>{ingredient},</span>
            })}
          </p>
          <p>
            <span className='drink-data'>instructions: </span>{instructions}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
