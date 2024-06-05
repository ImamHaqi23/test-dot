// SearchBar.tsx
import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

interface SearchBarProps {
  search: string;
  suggestedPokemon: string[];
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  suggestedPokemon,
  onSearchChange,
}) => (
  <div className="flex justify-center w-full mt-4">
    <div className="flex flex-col w-1/2">
      <input
        type="text"
        placeholder="Search Pokemon"
        value={search}
        onChange={onSearchChange}
        className="px-4 py-2 rounded-md"
      />
      <div className="mt-4">
        {suggestedPokemon.map((pokemonName) => (
          <Link
            key={pokemonName}
            to={`/detail/${pokemonName}`}
            className="bg-slate-500 p-1 rounded mr-1 text-white uppercase hover:bg-slate-400 cursor-pointer"
          >
            {pokemonName}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default SearchBar;
