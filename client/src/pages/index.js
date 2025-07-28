// "use client";
import { useState } from "react";

export default function Home() {
    // Defining state
    const [input, setInput] = useState("");
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    async function fetchPokemon(input){
        setLoading(true);
        setError("");
        setPokemon(null);

        try {
            const response = await fetch(`http://localhost:5000/api/pokemon/${input}`);
            const data = await response.json();

            if (response.ok){
                setPokemon(data);
                setInput("");
            } else {
                setError("Failed to fetch pokemon data");
            }

        } catch (error){
            setError("Network error");
        } finally {
            setLoading(false);
        }
    }
    

    // Form submission logic
    async function handleSubmit(e){
        e.preventDefault();
        if (!input) return;
        fetchPokemon(input);
    }

    // Randomly fetch a pokemon
    async function handleRandom(){
        const randomId = Math.floor(Math.random() * 1025) + 1;
        fetchPokemon(randomId);
    };

    return (
        // Main display container
        <div className="main-container">
            <h1>Pokemon lookup</h1>

            {/* User input form */}
            <form onSubmit={handleSubmit} className="form-container">
                <input
                    type="text"
                    placeholder="ID or name"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Loading" : "Search"}
                </button>
                <button type="button" onClick={handleRandom} disabled={loading}>
                    Random
                </button>
            </form>

            {/* Conditionally render error message */}
            {error && <p className="error-text">{error}</p>}

            {/* Conditionally render pokemon data */}
            {pokemon && (
                <div>
                    <h2>{pokemon.name} (#{pokemon.id})</h2>
                    <div className="results-container">
                        <img src={pokemon.sprite} alt={pokemon.name} />
                        <div className="types-container">
                            <p>Types:</p>
                            <div className="types-sprites">
                                {pokemon.types.map((type) => (
                                    <div key={type.name}>
                                        {type.sprite && <img src={type.sprite} alt={type.name} style={{ width: 64 }} />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}