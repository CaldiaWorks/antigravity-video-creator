import React, { useRef } from 'react';
import './Timeline.css';

interface TimelineProps {
    currentFrame: number;
    durationInFrames: number;
    onSeek: (frame: number) => void;
    onPlayPause: () => void;
    isPlaying: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({ 
    currentFrame, 
    durationInFrames, 
    onSeek,
    onPlayPause,
    isPlaying
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        handleSeek(e);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        handleSeek(e);
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleSeek = (e: React.MouseEvent | MouseEvent) => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const frame = Math.round(percentage * (durationInFrames - 1));
        
        onSeek(frame);
    };

    const playheadPosition = durationInFrames > 1 
        ? (currentFrame / (durationInFrames - 1)) * 100 
        : 0;

    return (
        <div className="timeline-panel">
            {/* Timeline Tools / Headers (Future) */}
            <div className="timeline-header">
                <button 
                    className="play-button"
                    onClick={onPlayPause}
                >
                    {isPlaying ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                             <rect x="6" y="4" width="4" height="16"></rect>
                             <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                    ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    )}
                </button>
                <div className="time-display">
                    {Math.floor(currentFrame / 30)}s : {currentFrame % 30}f
                </div>
            </div>

            <div className="timeline-track-container">
                 <div 
                    className="timeline-track" 
                    ref={containerRef}
                    onMouseDown={handleMouseDown}
                >
                    {/* Background Track */}
                    <div className="timeline-rail" />
                    
                    {/* Progress Bar */}
                    <div 
                        className="timeline-progress" 
                        style={{ width: `${playheadPosition}%` }}
                    />

                    {/* Playhead Handle */}
                    <div 
                        className="timeline-handle"
                        style={{ left: `${playheadPosition}%` }}
                    >
                         <div className="timeline-cursor-line"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
