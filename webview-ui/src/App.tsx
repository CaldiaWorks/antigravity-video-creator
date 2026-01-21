import { Player, type PlayerRef } from '@remotion/player';
import { Sequence } from 'remotion';
import { useRef, useEffect, useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { Timeline } from './components/Timeline';
import { slides } from './data/slides';
import { SlideRenderer } from './components/Slide/SlideRenderer';
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

// Main Composition Component
const SlideComposition: React.FC = () => {
    let currentFrame = 0;
    return (
        <div style={{ flex: 1, backgroundColor: 'white', width: '100%', height: '100%' }}>
            {slides.map((slide, index) => {
                const from = currentFrame;
                currentFrame += slide.durationInFrames;
                return (
                    <Sequence key={index} from={from} durationInFrames={slide.durationInFrames}>
                        <SlideRenderer slide={slide} />
                    </Sequence>
                );
            })}
        </div>
    );
};

// Calculate total duration
const totalDuration = slides.reduce((acc, slide) => acc + slide.durationInFrames, 0);

function App() {
    const playerRef = useRef<PlayerRef>(null);
    const [config, setConfig] = useState<CompositionConfig>({
        durationInFrames: totalDuration, // Auto-calculated duration
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
                            component={SlideComposition}
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
