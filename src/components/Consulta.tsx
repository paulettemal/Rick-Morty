import { useEffect, useState } from "react";
import Tarjeta from "./Tarjeta";
import Presentar from "./Presentar";

interface Character {
    id: number;
    name: string;
    image: string;
}

const Consulta = () => {
    const [personajes, setPersonajes] = useState<Character[]>([]);
    const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);
    const [favs, setFavs] = useState<number[]>([]);
    const cargaAPI = async () => {
        try {
            console.log("Intentando cargar API...");
            const respuesta = await fetch("https://rickandmortyapi.com/api/character");
            const data = await respuesta.json();
            setPersonajes(data.results);
            console.log("Personajes actualizados:", data.results);
        } catch(err) {
            console.error("Error completo en cargaAPI:", err);
            
        }
    }

    useEffect(() => {
        cargaAPI();
        const storedFavs = localStorage.getItem("favCharacters");
        if (storedFavs) {
            try {
                const parsedFavs = JSON.parse(storedFavs);
                setFavs(parsedFavs);
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }, []);

    const handleCardClick = (id: number) => {
        setSelectedCharacterId(id);
    };

    const clickFav = (id: number) => {
        setFavs((prevFavs) => {
            const newFavs = prevFavs.includes(id) 
                ? prevFavs.filter((favId) => favId !== id)
                : [...prevFavs, id];
            
            localStorage.setItem("favCharacters", JSON.stringify(newFavs));
            return newFavs;
        });
    };
    
    return (
        <div>
            {personajes.length === 0 ? (
                <div>Cargando personajes...</div>
            ) : (
                <div className="contenedorTarjeta">
                    {personajes.map((p) => (
                        <Tarjeta
                            key={p.id}
                            id={p.id}
                            name={p.name}
                            img={p.image}
                            onCardClick={handleCardClick}
                            favorito={clickFav}
                            isFav={favs.includes(p.id)}
                        />
                    ))}
                </div>
            )}

            {selectedCharacterId && (
                <Presentar 
                    pasaId={selectedCharacterId} 
                    onClose={() => setSelectedCharacterId(null)} 
                />
            )}
        </div>
    );
};

export default Consulta;