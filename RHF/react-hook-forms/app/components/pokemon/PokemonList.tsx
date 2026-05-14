import React from "react";
type pokemonListProps = {
  pokemonListItems: {
    name: string;
    url: string;
  }[];
};
export default function PokemonList({ pokemonListItems }: pokemonListProps) {
  return (
    <ul>
      {pokemonListItems.map((pokemon, index) => (
        <li key={index}>
          {pokemon.name}
          <br />
          {/* {pokemon.url} */}
        </li>
      ))}
    </ul>
  );
}
