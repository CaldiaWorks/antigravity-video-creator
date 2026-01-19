import React from 'react';
import './Header.css';

interface HeaderProps {
    title?: string;
    onExport?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title = 'Untitled Design', onExport }) => {
    return (
        <header className="app-header">
            <div className="header-left">
                <div className="menu-icon">☰</div>
                <div className="app-title">
                    <span className="brand">Antigravity</span>
                    <span className="separator">/</span>
                    <span className="document-title">{title}</span>
                </div>
            </div>
            
            <div className="header-center">
                {/* Future: Playback controls or Status */}
            </div>

            <div className="header-right">
                <button className="btn-secondary">Share</button>
                <button className="btn-primary" onClick={onExport}>
                    Export Video
                </button>
            </div>
        </header>
    );
};
