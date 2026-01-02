import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('https://fakestoreapi.com/products')
      if (!res.ok) throw new Error('Failed to fetch')
      return await res.json()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`)
      if (!res.ok) throw new Error('Product not found')
      return await res.json()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
