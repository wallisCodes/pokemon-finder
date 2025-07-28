import { Router } from "express";

const router = Router();

// Fetching specific pokemon stats via external api call
router.get("/:name", async (req, res) => {
    const name = req.params.name; // can technically be a name or an ID but name is used for simplicity

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

        if (!response.ok) return res.status(404).json({ error: 'Pokémon not found' });

        const data = await response.json();

        // Get type names and URLs to render type sprites
        const types = await Promise.all(
            data.types.map(async (t) => {
                const typeName = t.type.name;
                const typeUrl = t.type.url;

                const typeRes = await fetch(typeUrl);
                const typeData = await typeRes.json();

                const spriteUrl = typeData?.sprites?.['generation-vi']?.['x-y']?.name_icon;

                return {
                    name: typeName,
                    sprite: spriteUrl || null,
                };
            })
        );

        res.json({
            id: data.id,
            name: data.name,
            sprite: data.sprites.front_default,
            types,
        });
    } catch (error) {
        console.error("Pokemon fetch failed:", error);
        res.status(500).json({ error: "Failed to fetch pokemon data" });
    }
})

export default router;