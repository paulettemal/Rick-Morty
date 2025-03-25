import React from "react";

interface ContenidoProps {
    id: number;
    name: string;
    img: string;
    onCardClick: (id: number) => void;
    favorito: (id:number) => void;
    isFav: boolean;
}

const Tarjeta = ({id, name, img, onCardClick, favorito, isFav}: ContenidoProps) => {
    const handleFavoritoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        favorito(id);
    };

    return (
        <div 
            className="tarjeta" 
            onClick={() => onCardClick(id)}>
            <button 
                onClick={handleFavoritoClick} className={`favorito-btn ${isFav ? 'favorito' : ''}`}>
                {isFav ? '❤️' : '🤍'}
            </button>
            <h3>{name}</h3>
            <img src={img} alt={name} />
        </div>
    )
}

export default Tarjeta;