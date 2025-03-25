import { useEffect, useState } from "react";

interface CharacterIndividual {
    id?: number;
    name?: string;
    status?: string;
    species?: string;
    type?: string;
    gender?: string;
    origin?: {
        name: string;
        url: string;
    };
    location?: {
        name: string;
        url: string;
    };
    image?: string;
}

interface PresentarProps {
    pasaId: number;
    onClose: () => void;
}

const Presentar = ({ pasaId, onClose }: PresentarProps) => {
    const [personaje, setPersonaje] = useState<CharacterIndividual | null>(null);

    const cargaAPI = async (characterId: number) => {
        try {
            const respuesta = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
            const data = await respuesta.json();
            setPersonaje(data);
        } catch (err) {
            console.log("Hay un error", err)
        }
    }

    useEffect(() => {
        cargaAPI(pasaId);
    }, [pasaId])

    if (!personaje) {
        return <p>Cargando personaje...</p>;
    }

    return (
        <div className="detalles-personaje">
            <button onClick={onClose} className="botoncitoCierre">x</button>
            <h2>{personaje.name}</h2>
            <img src={personaje.image} alt={personaje.name} />
            <p><strong>Status:</strong> {personaje.status}</p>
            <p><strong>Species:</strong> {personaje.species}</p>
            <p><strong>Gender:</strong> {personaje.gender}</p>
            <p><strong>Origin:</strong> {personaje.origin?.name}</p>
            <p><strong>Location:</strong> {personaje.location?.name}</p>
        </div>
    );
};

export default Presentar;