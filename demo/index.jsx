import { createRoot } from 'react-dom/client'
import ReactCarouselQuery from 'react-carousel-query'
import 'react-carousel-query/styles.css'
import './styles.css'

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'

const getData = async ({ offset, limit }) => {
  const response = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`)
  const data = await response.json()

  const pokemonsBatch = await Promise.all(
    data.results.map(async pokemon => {
      const detailResponse = await fetch(pokemon.url)
      const detail = await detailResponse.json()
      return {
        id: detail.id,
        name: detail.name,
        imageUrl:
          detail.sprites.other['official-artwork'].front_default || detail.sprites.front_default,
        types: detail.types.map(t => t.type.name),
      }
    })
  )

  return {
    total: data.count,
    items: pokemonsBatch,
  }
}

const renderItem = ({ item }) => {
  const primaryType = item.types[0]

  return (
    <div className={`card card--${primaryType}`}>
      <div className="card__image-container">
        <img className="card__image" draggable={false} alt={item.name} src={item.imageUrl} />
      </div>
      <div className="card__content">
        <h3 className="card__title">
          #{item.id} {item.name}
        </h3>
        <div className="card__types">
          {item.types.map(type => (
            <span key={type} className="card__type-badge">
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)

root.render(<ReactCarouselQuery fetchStep={3} renderItem={renderItem} getData={getData} />)
