// src/__tests__/productSlice.test.js
import productReducer, {
  setSearch,
  setCategory,
  setSort,
  toggleFavourite
} from '../store/productSlice'

describe('productSlice', () => {
  const initialState = {
    list: [],
    loading: false,
    error: null,
    search: '',
    category: 'all',
    sort: 'none',
    favourites: []
  }

  test('should set search text', () => {
    const state = productReducer(initialState, setSearch('shirt'))
    expect(state.search).toBe('shirt')
  })

  test('should set category', () => {
    const state = productReducer(initialState, setCategory('men clothing'))
    expect(state.category).toBe('men clothing')
  })

  test('should set sort', () => {
    const state = productReducer(initialState, setSort('asc'))
    expect(state.sort).toBe('asc')
  })

  test('should add product to favourites', () => {
    const product = { id: 1, title: 'Blue Shirt' }
    const state = productReducer(initialState, toggleFavourite(product))
    expect(state.favourites.length).toBe(1)
    expect(state.favourites[0].id).toBe(1)
  })

  test('should remove product from favourites', () => {
    const product = { id: 1, title: 'Blue Shirt' }
    const state = productReducer(
      { ...initialState, favourites: [product] },
      toggleFavourite(product)
    )
    expect(state.favourites.length).toBe(0)
  })
})
