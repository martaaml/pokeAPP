import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase.js";

import "./Play.css";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

const PokCrieAdivinanza = () => {
    const [currentPokemon, setCurrentPokemon] = useState(null);
    const [lives, setLives] = useState(3);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("");
    const [ranking, setRanking] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [playerName, setPlayerName] = useState("");

    useEffect(() => {
        getRandomPokemon();
        fetchRanking();
        getPlayerName();
    }, []);

    const getPlayerName = () => {
        // Intentamos obtener el nombre del jugador desde localStorage
        const storedName = localStorage.getItem("playerName");

        if (storedName) {
            // Si ya existe, usamos el nombre guardado
            setPlayerName(storedName);
        } else {
            // Si no existe, pedimos el nombre
            const newName = prompt("Ingresa tu nombre:");
            if (newName) {
                // Guardamos el nuevo nombre en localStorage
                localStorage.setItem("playerName", newName);
                setPlayerName(newName);
            } else {
                // Si no ingresa nada, asignamos un nombre por defecto
                localStorage.setItem("playerName", "Jugador Anónimo");
                setPlayerName("Jugador Anónimo");
            }
        }
    };

    const getRandomPokemon = () => {
        const randomId = Math.floor(Math.random() * 898) + 1;
        fetch(`${API_URL}${randomId}`)
            .then(response => response.json())
            .then(data => {
                setCurrentPokemon(data);
                generateOptions(data);
                setMessage("");
            });
    };

    const generateOptions = (correctPokemon) => {
        let names = new Set();
        let pokemons = [{ name: correctPokemon.name, image: correctPokemon.sprites.front_default }];

        names.add(correctPokemon.name);

        const fetchRandomPokemon = () => {
            const randomId = Math.floor(Math.random() * 898) + 1;
            fetch(`${API_URL}${randomId}`)
                .then(response => response.json())
                .then(data => {
                    if (!names.has(data.name)) {
                        names.add(data.name);
                        pokemons.push({ name: data.name, image: data.sprites.front_default });
                    }
                    if (names.size < 5) fetchRandomPokemon();
                    else setOptions(shuffleArray(pokemons));
                });
        };

        fetchRandomPokemon();
    };

    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    const playPokemonCry = () => {
        if (currentPokemon) {
            const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${currentPokemon.id}.ogg`;
            const audio = new Audio(cryUrl);
            audio.play();
        }
    };

    const checkAnswer = (selectedName) => {
        if (selectedName === currentPokemon.name) {
            setScore(prevScore => prevScore + 1);
            setMessage("¡Correcto! Has adivinado el Pokémon.");
            setTimeout(getRandomPokemon, 1000);
        } else {
            const newLives = lives - 1;
            setLives(newLives);

            if (newLives > 0) {
                setMessage(`Incorrecto. ${selectedName} no es el Pokémon. Te quedan ${newLives} vidas.`);
            } else {
                setMessage(`¡Perdiste! El Pokémon era ${currentPokemon.name}. Puntuación final: ${score}`);
                saveScoreToDatabase(score);
                showGameOverModal();
            }
        }
    };

    const fetchRanking = () => {
        const rankingRef = collection(db, "ranking");
        const q = query(rankingRef, orderBy("score", "desc"));

        getDocs(q).then(querySnapshot => {
            const rankingData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setRanking(rankingData);
        }).catch(error => console.error("Error al obtener el ranking:", error));
    };

    const saveScoreToDatabase = (finalScore) => {
        if (finalScore > 0) {
            addDoc(collection(db, "ranking"), {
                name: playerName || "Jugador Anónimo",
                score: finalScore,
                timestamp: new Date()
            })
            .then(() => fetchRanking())
            .catch(error => console.error("Error al guardar el score:", error));
        }
    };

    const showGameOverModal = () => {
        setShowModal(true);
    };

    const resetGame = () => {
        setLives(3);
        setScore(0);
        setShowModal(false);
        getRandomPokemon();
    };

    return (
        <div className="pokemon-container">
            <h1 className="title">Adivina el Pokémon</h1>
            <p className="score">Puntuación: {score}</p>
            <p className="player-name">Jugador: {playerName}</p>
            <button onClick={playPokemonCry} className="sound-button">🔊 Escuchar Pokémon</button>

            <div className="options-container">
                {options.map((option) => (
                    <button 
                        key={option.name} 
                        onClick={() => checkAnswer(option.name)} 
                        className="pokemon-option"
                    >
                        <span className="pokemon-name">{option.name.toUpperCase()}</span>
                        <img 
                            src={option.image} 
                            alt={option.name} 
                            className="pokemon-image"
                        />
                    </button>
                ))}
            </div>

            <p className="lives">Vidas restantes: {lives}</p>
            <p className="message">{message}</p>

            <div className="ranking-container">
                <h2>🏆 Ranking de Puntuaciones</h2>
                <ul className="ranking-list">
                    {ranking.length > 0 ? (
                        ranking.map((player, index) => (
                            <li key={player.id} className="ranking-item">
                                {index + 1}. {player.name} - {player.score} puntos
                            </li>
                        ))
                    ) : (
                        <p>No hay puntuaciones aún.</p>
                    )}
                </ul>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>¡Te has quedado sin vidas!</h2>
                        <p>Puntuación final: {score}</p>
                        <button onClick={resetGame} className="restart-button">Reiniciar Juego</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokCrieAdivinanza;
