// src/__tests__/Header.test.jsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../store/productSlice'
import Header from '../components/Header'
import { BrowserRouter } from 'react-router-dom'
const renderWithStore = (preloadedState) => {
  const store = configureStore({
    reducer: { products: productReducer },
    preloadedState
  })
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  )
}

test('shows favourites count in header', () => {
  renderWithStore({
    products: {
      favourites: [{ id: 1 }, { id: 2 }],
      list: [],
      loading: false,
      error: null,
      search: '',
      category: 'all',
      sort: 'none'
    }
  })

  expect(screen.getByText(/Favourites \(2\)/i)).toBeInTheDocument()
})
