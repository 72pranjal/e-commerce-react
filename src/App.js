
// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./component/Header/Header";
import FavouritView from "./pages/FavouriteView";
import ProductDetailView from "./pages/ProductDetailView";
import ProductListingView from "./pages/ProductListingView";
import HomeView from "./pages/HomeView";


function App() {
  return (
    <BrowserRouter>
      <Header /> {/* 🔥 Common header */}

      <Routes>
        <Route path="/" element={<ProductListingView />} />
        <Route path="/listing" element={<ProductListingView />} />
        <Route path="/products/:id" element={<ProductDetailView />} />
        <Route path="/favourites" element={<FavouritView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

