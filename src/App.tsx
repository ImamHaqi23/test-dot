// App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import PokemonDetail from './page/PokemonDetail';
import Login from './page/Login';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/detail/:pokemonName" element={<PokemonDetail />} />
    </Routes>
  </BrowserRouter>
);

export default App;
