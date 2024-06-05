// PokemonGrid.tsx
import React from 'react';
import PokemonCard from './PokemonCard';

interface PokemonGridProps {
  pokemonList: string[];
  startIndex: number;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemonList,
  startIndex,
}) => (
  <div className="view-all grid grid-cols-4 gap-4 mt-8 mx-10">
    {pokemonList.map((pokemonName, index) => (
      <PokemonCard
        key={pokemonName}
        pokemonName={pokemonName}
        index={startIndex + index}
      />
    ))}
  </div>
);

export default PokemonGrid;
