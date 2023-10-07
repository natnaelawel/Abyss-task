import React, { useState, } from 'react';
import './draggable.scss';

interface Position {
    x: number;
    y: number;
}

interface DraggableProps {
    children: React.ReactNode;
}

const DraggableWrapper: React.FC<DraggableProps> = ({ children }) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);

    const handleMouseDown = (e: any) => {
        if (
            e.target.tagName.toLowerCase() === 'button' ||
            e.target.closest('button')
        ) {
            return;
        }


        setIsDragging(true);
        setOffsetX(e.clientX - position.x);
        setOffsetY(e.clientY - position.y);
    };

    const handleMouseMove = (e: any) => {
        if (!isDragging) return;

        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;
        setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            className={`wrapper ${isDragging ? 'dragging' : ''} `}
        >
            <div
                className='draggable-component'
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transformOrigin: "top left"
                }}
            >
                <div className="pointer" />
                {children}
            </div>
        </div>
    );
};

export default DraggableWrapper;
