import React from "react";
type pokemonListProps = {
  pokemonListItems: string[];
};
export default function PokemonList({ pokemonListItems }: pokemonListProps) {
  return (
    <div>
      {pokemonListItems.map((pokemon: string, index: number) => (
        <li key={index}>{pokemon}</li>
      ))}
    </div>
  );
}
