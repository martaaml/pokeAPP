import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Chart, registerables } from "chart.js"; // Importamos Chart.js
import "./Detalle.css";

// Registramos todos los componentes de Chart.js
Chart.register(...registerables);

const Detalle = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const request = new XMLHttpRequest();
    request.open("GET", `https://pokeapi.co/api/v2/pokemon/${id}`, true);

    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);
        setPokemon(data);
        setSelectedImage(data.sprites.front_default); // Imagen inicial
      }
    };

    request.send();
  }, [id]);

  useEffect(() => {
    if (pokemon) {
      // Cuando `pokemon` esté disponible, inicializamos el gráfico
      const ctx = document.getElementById('statsChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: pokemon.stats.map(stat => stat.stat.name),
          datasets: [{
            label: 'Estadísticas',
            data: pokemon.stats.map(stat => stat.base_stat),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [pokemon]); // Solo se ejecuta cuando `pokemon` cambia

  if (!pokemon) {
    return <div className="loading">Cargando...</div>;
  }

  // Obtener imágenes estáticas y animadas
  const spriteImages = [
    ...Object.values(pokemon.sprites),
    ...Object.values(pokemon.sprites?.versions?.["generation-v"]?.["black-white"]?.animated || {})
  ].filter(img => typeof img === "string");

  return (
    <div>
      <div className="pokemon-card">
        <div className="pokemon-header">
          <div className="pokemon-image-container">
            <img src={selectedImage} alt={pokemon.name} className="pokemon-image" />
          </div>
          <div className="pokemon-info">
            <h1 className="pokemon-name">{pokemon.name.toUpperCase()}</h1>
            <p><strong>Tipo:</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
            <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
            <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
          </div>
        </div>

        <h3>Estadísticas</h3>
        <div className="chart-container">
          <canvas id="statsChart" width="400" height="200"></canvas>
        </div>

        <h3>Movimientos</h3>
        <ul className="moves-list">
          {pokemon.moves.slice(0, 5).map(move => (
            <li key={move.move.name}>{move.move.name}</li>
          ))}
        </ul>
      </div>

      <h3>Galería</h3>
      <div className="pokemon-gallery">
        {spriteImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Sprite ${index}`}
            className={`thumbnail ${selectedImage === img ? "selected" : ""}`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default Detalle;
