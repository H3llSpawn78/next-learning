"use client";
import Header from "@/app/components/Header";
import React, { useEffect, useState } from "react";
import PokemonList from "@/app/components/pokemon/PokemonList";
import axios from "axios";

type pokemonAPIProps = {
  //pokemonListItems: string[];
  name: string;
  url: string;
};

export default function Pokemon() {
  const [pokemon, setPokemon] = useState<pokemonAPIProps[]>([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((res) => {
      console.log(res.data.results);
      //setPokemon(res.data.results.map((p: pokemonProps) => p.name));
      setPokemon(res.data.results);
    });
  }, []);

  return (
    <>
      <Header headingText="Pokemon" />
      <div className="container mx-auto max-w-xl p-4">
        <h1>Pokemon page</h1>
        <PokemonList pokemonListItems={pokemon} />
      </div>
    </>
  );
}
