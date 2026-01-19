import React, { type ReactNode } from 'react';
import './Canvas.css';

interface CanvasProps {
    children: ReactNode;
    width: number;
    height: number;
}

export const Canvas: React.FC<CanvasProps> = ({ children, width, height }) => {
    return (
        <div className="canvas-container">
            <div className="canvas-scroll-area">
                <div 
                    className="canvas-artboard"
                    style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        aspectRatio: `${width} / ${height}`
                    }}
                >
                    {children}
                </div>
            </div>
            
            <div className="canvas-controls">
                <button title="Zoom Out">-</button>
                <span>100%</span>
                <button title="Zoom In">+</button>
                <div className="divider" />
                <button title="Fit to Screen">Fit</button>
            </div>
        </div>
    );
};
