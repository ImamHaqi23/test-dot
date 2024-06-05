import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import imgPoke from '../../public/titlePoke.png';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PokemonGrid from '../components/PokemonGrid';

const Home: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const [suggestedPokemon, setSuggestedPokemon] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<{ results: { name: string }[] }>(
        'https://pokeapi.co/api/v2/pokemon?limit=1000'
      )
      .then((response) => {
        const results = response.data.results;
        const pokemonNames = results.map((pokemon) => pokemon.name);
        setPokemonList(pokemonNames);
      })
      .catch((error) => {
        console.error('Error fetching Pokemon:', error);
      });
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);

    if (searchTerm === '') {
      setSuggestedPokemon([]);
    } else {
      const filteredPokemon = pokemonList.filter((pokemon) =>
        pokemon.includes(searchTerm.toLowerCase())
      );
      setSuggestedPokemon(filteredPokemon.slice(0, 5));
    }
  };

  const handleLogout = () => {
    Cookies.remove('username');
    navigate('/');
  };

  useEffect(() => {
    if (!Cookies.get('username')) {
      navigate('/');
    }
  }, []);

  const itemsPerPage = 20;
  const maxPageButtons = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPokemonList = pokemonList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(pokemonList.length / itemsPerPage);

  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  return (
    <div className="bg-gradient-to-b from-slate-600 to-slate-800">
      <div className="absolute top-5 left-12">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="container bg-slate-900 min-h-screen py-10 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center relative">
          <img src={imgPoke} alt="Title Pokemon" className="w-1/2" />
          <h1 className="absolute bottom-28 text-white text-4xl font-semibold">
            Gotta catch'em all!!
          </h1>
        </div>
        <SearchBar
          search={search}
          suggestedPokemon={suggestedPokemon}
          onSearchChange={handleSearchChange}
        />
        <PokemonGrid
          pokemonList={currentPokemonList}
          startIndex={indexOfFirstItem}
        />
        <div className="flex justify-center mt-8">
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            className="mx-1 px-3 py-1 rounded bg-slate-500 text-white hover:bg-slate-400"
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <button
              key={startPage + index}
              onClick={() => paginate(startPage + index)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === startPage + index
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-500 text-white hover:bg-slate-400'
              }`}
            >
              {startPage + index}
            </button>
          ))}
          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            className="mx-1 px-3 py-1 rounded bg-slate-500 text-white hover:bg-slate-400"
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
