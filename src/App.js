
// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./component/Header";
import ProductList from "./component/ProductList";
import ProductDetail from "./component/ProductDetail";
import FavouriteList from "./component/FavouriteList";

function App() {
  return (
    <BrowserRouter>
      <Header /> {/* 🔥 Common header */}

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/favourites" element={<FavouriteList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

