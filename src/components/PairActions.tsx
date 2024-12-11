'use client';

import { useState } from "react";


interface Pair {
    id: number;
    base: string;
    quote: string;
    interval: number;
}

interface PairActionsProps {
    pair: Pair;
    onEdit: (updatedPair: Partial<Pair>) => void;
    onDelete: () => void;
}

export const PairActions: React.FC<PairActionsProps> = ({ pair, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [interval, setInterval] = useState(pair.interval);

    const handleEdit = () => {
        onEdit({ interval });
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <input
                        value={interval}
                        onChange={(e) => setInterval(Number(e.target.value))}
                        type="number"
                    />
                    <button onClick={handleEdit}>Save</button>
                </>
            ) : (
                <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};
