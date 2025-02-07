import React, { useState, useEffect } from "react";
import "./Pokedex.css";
import { Link } from 'react-router-dom';

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const limit = 8; // Mostrará 8 Pokémon por página

  useEffect(() => {
    fetchTypes();
    fetchPokemons();
  }, []);

  const fetchTypes = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "https://pokeapi.co/api/v2/type", false);
    request.send(null);

    if (request.status === 200) {
      const data = JSON.parse(request.responseText);
      setTypes(data.results);
    }
  };

  const fetchPokemons = () => {
    const request = new XMLHttpRequest();
    request.open("GET", `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, false);
    request.send(null);

    if (request.status === 200) {
      const data = JSON.parse(request.responseText);
      const newPokemons = [];

      data.results.forEach(pokemon => {
        const pokemonRequest = new XMLHttpRequest();
        pokemonRequest.open("GET", pokemon.url, false);
        pokemonRequest.send(null);

        if (pokemonRequest.status === 200) {
          const pokemonData = JSON.parse(pokemonRequest.responseText);
          newPokemons.push(pokemonData);
        }
      });

      setPokemons(prevPokemons => {
        const filteredPokemons = newPokemons.filter(
          pokemon => !prevPokemons.some(p => p.id === pokemon.id)
        );
        return [...prevPokemons, ...filteredPokemons];
      });

      setOffset(prevOffset => prevOffset + limit);
    }
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const filteredPokemons = selectedType
    ? pokemons.filter(pokemon => pokemon.types.some(t => t.type.name === selectedType))
    : pokemons;

  return (
    <div>
      <h3>POKE VERSO</h3>
      <div className="filter-container" style={{ textAlign: "center", marginBottom: "20px" }}>
        <label htmlFor="type-select" style={{ fontSize: "18px", fontWeight: "bold", marginRight: "10px" }}>Filtrar por tipo:</label>
        <select id="type-select" className="pokemon-select" value={selectedType} onChange={handleTypeChange}>

          <option value="">Todos</option>
          {types.map(type => (
            <option key={type.name} value={type.name}>{type.name}</option>
          ))}
        </select>
      </div>
      <section className="proyectos__flex">
        {filteredPokemons.map((pokemon, index) => (
          <div key={pokemon.id} className={`parent card${(index % 4) + 1}`}>
            <div className="cardProyectos">
              <div className="content-box">
                <h1 className="tituloProyecto">{pokemon.name.toUpperCase()}</h1>
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="pokemon-img"
                />
                <p className="descripcionProyecto">
                  Tipo: {pokemon.types.map(t => t.type.name).join(", ")}
                </p>
                <span className="see-more">
                  <span className="see-more">
                    <Link to={`/detalle/${pokemon.id}`}>Informacion</Link>
                  </span>

                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
      <button className="load-more" onClick={fetchPokemons}>
        Cargar más Pokémon
      </button>
    </div>
  );
};

export default Pokedex;