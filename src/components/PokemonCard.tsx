// PokemonCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface PokemonCardProps {
  pokemonName: string;
  index: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonName, index }) => (
  <Link
    to={`/detail/${pokemonName}`}
    className="rounded-lg p-4 bg-slate-500 shadow-md shadow-slate-500/50 hover:bg-slate-400 cursor-pointer"
  >
    <img
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        index + 1
      }.png`}
      alt={pokemonName}
      className="mx-auto w-52"
    />
    <p className="text-center mt-2 uppercase text-lg font-semibold text-white">
      {pokemonName}
    </p>
  </Link>
);

export default PokemonCard;
