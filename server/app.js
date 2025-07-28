import cors from "cors";
import express from "express";
import pokemonRouter from "./routes/pokemonRoutes.js";

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());

//
app.use("/api/pokemon", pokemonRouter);

// define "/api/test" route (returns JSON)
app.get("/api/test", (req, res) => {
    res.json({ message: "test successful."});
});

// Start the server on port 5000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));