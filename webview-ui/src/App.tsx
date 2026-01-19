import { Player, type PlayerRef } from '@remotion/player';
import { useRef, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { Timeline } from './components/Timeline';
import './App.css';

// VS Code API declaration
declare const acquireVsCodeApi: () => {
    postMessage: (message: unknown) => void;
    getState: () => unknown;
    setState: (state: unknown) => void;
};

const vscode = acquireVsCodeApi();

interface CompositionConfig {
    durationInFrames: number;
    fps: number;
    width: number;
    height: number;
}

type IncomingMessage = 
    | { type: 'updateConfig'; config: CompositionConfig }
    | { type: 'requestStatus' };

// Sample Composition
const MyComp: React.FC = () => {
    return (
        <div style={{ 
            flex: 1, 
            textAlign: 'center', 
            fontSize: '2em', 
            color: 'white', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800
        }}>
            <h1>Canva Style Editor</h1>
        </div>
    );
};

function App() {
    const playerRef = useRef<PlayerRef>(null);
    const [config, setConfig] = useState<CompositionConfig>({
        durationInFrames: 120,
        fps: 30,
        width: 1920,
        height: 1080,
    });

    const [currentFrame, setCurrentFrame] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Message Handling
    useEffect(() => {
        const handleMessage = (event: MessageEvent<IncomingMessage>) => {
            const message = event.data;
            switch (message.type) {
                case 'updateConfig':
                    setConfig(message.config);
                    break;
                case 'requestStatus':
                    if (playerRef.current) {
                        vscode.postMessage({
                            type: 'playerStatus',
                            status: {
                                currentFrame: playerRef.current.getCurrentFrame(),
                                isPlaying: playerRef.current.isPlaying(),
                            }
                        });
                    }
                    break;
            }
        };

        window.addEventListener('message', handleMessage);
        vscode.postMessage({ type: 'webviewReady' });
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Polling Player State
    useEffect(() => {
        if (!playerRef.current) return;
        const interval = setInterval(() => {
            if (playerRef.current) {
                const frame = playerRef.current.getCurrentFrame();
                if (frame !== currentFrame) setCurrentFrame(frame);
                
                const playing = playerRef.current.isPlaying();
                if (playing !== isPlaying) setIsPlaying(playing);
            }
        }, 1000 / 30);
        return () => clearInterval(interval);
    }, [currentFrame, isPlaying]);

    const seekTo = (frame: number) => {
        if (playerRef.current) {
            playerRef.current.seekTo(frame);
            setCurrentFrame(frame);
        }
    };

    const togglePlay = () => {
        if (playerRef.current) {
            if (isPlaying) playerRef.current.pause();
            else playerRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="app-layout">
            <Header 
                title="Awesome Video Project" 
                onExport={() => console.log("Export triggered")}
            />
            
            <div className="workspace">
                <Sidebar config={config} setConfig={setConfig} />
                
                <div className="editor-area">
                    <Canvas width={config.width} height={config.height}>
                        <Player
                            ref={playerRef}
                            component={MyComp}
                            durationInFrames={config.durationInFrames}
                            compositionWidth={config.width}
                            compositionHeight={config.height}
                            fps={config.fps}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            controls={false} // Disable default controls to use ours
                        />
                    </Canvas>
                    
                    <Timeline 
                        currentFrame={currentFrame}
                        durationInFrames={config.durationInFrames}
                        onSeek={seekTo}
                        onPlayPause={togglePlay}
                        isPlaying={isPlaying}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
