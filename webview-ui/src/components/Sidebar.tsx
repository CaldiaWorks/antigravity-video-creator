import React, { useState } from 'react';
import './Sidebar.css';

interface CompositionConfig {
    durationInFrames: number;
    fps: number;
    width: number;
    height: number;
}

interface SidebarProps {
    config: CompositionConfig;
    setConfig: (config: CompositionConfig) => void;
}

const SettingsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
);

const LayersIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
);

const UploadIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
);

type TabType = 'properties' | 'layers' | 'uploads';

export const Sidebar: React.FC<SidebarProps> = ({ config, setConfig }) => {
    const [activeTab, setActiveTab] = useState<TabType>('properties');

    return (
        <div className="sidebar-container">
            {/* Icon Rail */}
            <div className="sidebar-rail">
                <button 
                    className={`rail-item ${activeTab === 'properties' ? 'active' : ''}`}
                    onClick={() => setActiveTab('properties')}
                    title="Settings"
                >
                    <SettingsIcon />
                    <span>Settings</span>
                </button>
                <button 
                    className={`rail-item ${activeTab === 'layers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('layers')}
                    title="Elements"
                >
                    <LayersIcon />
                    <span>Elements</span>
                </button>
                 <button 
                    className={`rail-item ${activeTab === 'uploads' ? 'active' : ''}`}
                    onClick={() => setActiveTab('uploads')}
                    title="Uploads"
                >
                    <UploadIcon />
                    <span>Uploads</span>
                </button>
            </div>

            {/* Active Panel */}
            <div className="sidebar-panel">
                {activeTab === 'properties' && (
                    <div className="panel-content">
                        <h3>Composition</h3>
                        
                        <div className="form-group">
                            <label>Duration (frames)</label>
                            <input 
                                type="number" 
                                value={config.durationInFrames} 
                                onChange={(e) => setConfig({...config, durationInFrames: parseInt(e.target.value) || 0})}
                            />
                        </div>

                        <div className="form-group">
                            <label>FPS</label>
                            <input 
                                type="number" 
                                value={config.fps} 
                                onChange={(e) => setConfig({...config, fps: parseInt(e.target.value) || 0})}
                            />
                        </div>

                        <div className="form-group">
                            <label>Width</label>
                            <input 
                                type="number" 
                                value={config.width} 
                                onChange={(e) => setConfig({...config, width: parseInt(e.target.value) || 0})}
                            />
                        </div>

                        <div className="form-group">
                            <label>Height</label>
                            <input 
                                type="number" 
                                value={config.height} 
                                onChange={(e) => setConfig({...config, height: parseInt(e.target.value) || 0})}
                            />
                        </div>
                    </div>
                )}
                
                {activeTab === 'layers' && (
                    <div className="panel-content">
                        <h3>Elements</h3>
                        <p className="placeholder">Drag and drop elements here (Coming Soon)</p>
                        <div className="element-grid">
                            <div className="element-item">Text</div>
                            <div className="element-item">Shape</div>
                            <div className="element-item">Image</div>
                        </div>
                    </div>
                )}

                 {activeTab === 'uploads' && (
                    <div className="panel-content">
                        <h3>Uploads</h3>
                         <button className="btn-secondary full-width">Upload Media</button>
                        <p className="placeholder">No uploads yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};
