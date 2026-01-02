import { createSlice } from '@reduxjs/toolkit'
import { fetchProducts, fetchProductById } from './productThunk'

const productSlice = createSlice({
  name: 'products',

  initialState: {
    // 🔹 Listing
    list: [],
    loading: false,
    error: null,

    // 🔹 Filters
    search: '',
    category: 'all',
    sort: 'none', // none | price-asc | price-desc

    // 🔥 Product Detail
    detail: null,
    detailLoading: false,
    favourites: []
  },

  reducers: {
    setSearch(state, action) {
      state.search = action.payload
    },
    setCategory(state, action) {
      state.category = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    clearDetail(state) {
      state.detail = null
    },
    toggleFavourite(state, action) {
      const product = action.payload
      const exists = state.favourites.find(
        item => item.id === product.id
      )

      if (exists) {
        // remove
        state.favourites = state.favourites.filter(
          item => item.id !== product.id
        )
      } else {
        // add
        state.favourites.push(product)
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // ================= LIST =================
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // ================= DETAIL =================
      .addCase(fetchProductById.pending, (state) => {
        state.detailLoading = true
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailLoading = false
        state.detail = action.payload
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.detailLoading = false
      })
  }
})

export const {
  setSearch,
  setCategory,
  setSort,
  clearDetail,
  toggleFavourite
} = productSlice.actions

export default productSlice.reducer
