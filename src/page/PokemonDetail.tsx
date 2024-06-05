// PokemonDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface PokemonDetail {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  moves: { move: { name: string } }[];
}

const PokemonDetail: React.FC = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const [detailPokemon, setDetailPokemon] = useState<PokemonDetail | null>(
    null
  );

  useEffect(() => {
    axios
      .get<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => setDetailPokemon(response.data))
      .catch((error) => {
        console.error('Error fetching Pokemon details:', error);
        setDetailPokemon(null);
      });
  }, []);

  if (!detailPokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-slate-600 to-slate-800">
      <div className="container bg-slate-900 min-h-screen py-10">
        <div className="grid grid-cols-12 text-white gap-5">
          <div className="col-span-6 rounded-lg p-4 bg-slate-500 shadow-md shadow-slate-500/50 ml-5">
            <img
              src={detailPokemon.sprites.front_default}
              alt={detailPokemon.name}
              className="w-[500px] h-auto mx-auto"
            />
          </div>
          <div className="col-span-6 mr-5">
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-3xl font-semibold uppercase">
                {detailPokemon.name}
              </h1>
              <Link
                to="/"
                className="bg-slate-500 p-2 rounded hover:bg-slate-400 text-lg font-semibold text-white cursor-pointer"
              >
                Back to Home
              </Link>
            </div>
            <div className="my-1">
              <label>Type: </label>
              {detailPokemon.types.map((type, index) => (
                <span
                  key={index}
                  className="bg-slate-600 p-1 rounded mx-1 uppercase"
                >
                  {type.type.name}
                </span>
              ))}
            </div>
            <div className="my-1">
              <label>Skills: </label>
              {detailPokemon.moves.slice(0, 20).map((move, index) => (
                <span key={index} className="uppercase">
                  {move.move.name}
                  {index < 19 ? ' |' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
