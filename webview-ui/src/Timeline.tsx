import React, { useRef } from 'react';

interface TimelineProps {
    currentFrame: number;
    durationInFrames: number;
    onSeek: (frame: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({ currentFrame, durationInFrames, onSeek }) => {
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

    // Calculate playhead position percentage
    const playheadPosition = durationInFrames > 1 
        ? (currentFrame / (durationInFrames - 1)) * 100 
        : 0;

    return (
        <div className="timeline-container">
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
                />
            </div>
            
            <div className="timeline-labels">
                <span>0</span>
                <span>{Math.floor(durationInFrames / 2)}</span>
                <span>{durationInFrames}</span>
            </div>
        </div>
    );
};

export default Timeline;
