import { Player, type PlayerRef } from '@remotion/player';
import { useRef, useEffect, useState } from 'react';
import Timeline from './Timeline';
import './App.css';

// VS Code API の型定義
declare const acquireVsCodeApi: () => {
	postMessage: (message: unknown) => void;
	getState: () => unknown;
	setState: (state: unknown) => void;
};

const vscode = acquireVsCodeApi();

// メッセージ型定義
interface CompositionConfig {
	durationInFrames: number;
	fps: number;
	width: number;
	height: number;
}

interface UpdateConfigMessage {
	type: 'updateConfig';
	config: CompositionConfig;
}

interface RequestStatusMessage {
	type: 'requestStatus';
}

type IncomingMessage = UpdateConfigMessage | RequestStatusMessage;

// サンプルコンポジション
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
			background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
		}}>
			<h1>Hello Remotion in VS Code!</h1>
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

	// Extension からのメッセージを受信
	useEffect(() => {
		const handleMessage = (event: MessageEvent<IncomingMessage>) => {
			const message = event.data;
			
			switch (message.type) {
				case 'updateConfig':
					console.log('Received config update:', message.config);
					setConfig(message.config);
					break;
				case 'requestStatus':
					// 現在の再生状態を Extension に送信
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
		
		// 初期化完了を Extension に通知
		vscode.postMessage({ type: 'webviewReady' });

		return () => window.removeEventListener('message', handleMessage);
	}, []);

	// Playerの状態を監視してUIを更新
	useEffect(() => {
		if (!playerRef.current) return;

		const interval = setInterval(() => {
			if (playerRef.current) {
				const frame = playerRef.current.getCurrentFrame();
				if (frame !== currentFrame) {
					setCurrentFrame(frame);
				}
				const playing = playerRef.current.isPlaying();
				if (playing !== isPlaying) {
					setIsPlaying(playing);
				}
			}
		}, 1000 / 30); // 30fps程度でポーリング

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
			if (isPlaying) {
				playerRef.current.pause();
			} else {
				playerRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const moveFrame = (delta: number) => {
		if (playerRef.current) {
			const newFrame = Math.max(0, Math.min(config.durationInFrames - 1, currentFrame + delta));
			playerRef.current.seekTo(newFrame);
			setCurrentFrame(newFrame);
		}
	};

	return (
		<div className="App">
			{/* Sidebar for Properties */}
			<div className="sidebar">
				<h3>Properties</h3>
				
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
					<label>Width (px)</label>
					<input 
						type="number" 
						value={config.width} 
						onChange={(e) => setConfig({...config, width: parseInt(e.target.value) || 0})}
					/>
				</div>

				<div className="form-group">
					<label>Height (px)</label>
					<input 
						type="number" 
						value={config.height} 
						onChange={(e) => setConfig({...config, height: parseInt(e.target.value) || 0})}
					/>
				</div>
			</div>

			{/* Main Content for Player */}
			<div className="main-content">
				<h1>Remotion Editor</h1>
				
                {/* Transport Controls */}
                <div className="transport-controls" style={{ 
                    display: 'flex', 
                    gap: '10px', 
                    marginBottom: '10px', 
                    alignItems: 'center',
                    background: '#252526',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #333'
                }}>
                    <button onClick={() => seekTo(0)} title="Go to Start">⇤</button>
                    <button onClick={() => moveFrame(-1)} title="Previous Frame">←</button>
                    <button onClick={togglePlay} style={{ minWidth: '80px' }}>
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button onClick={() => moveFrame(1)} title="Next Frame">→</button>
                    <button onClick={() => seekTo(config.durationInFrames - 1)} title="Go to End">⇥</button>
                    
                    <div style={{ marginLeft: '10px', fontSize: '1.2em', fontFamily: 'monospace' }}>
                        Frame: {currentFrame} / {config.durationInFrames}
                    </div>
                </div>

				<div className="player-wrapper">
					<Player
						ref={playerRef}
						component={MyComp}
						durationInFrames={config.durationInFrames}
						compositionWidth={config.width}
						compositionHeight={config.height}
						fps={config.fps}
						style={{
							width: '100%',
							maxWidth: '800px',
							maxHeight: 'calc(100vh - 200px)',
							aspectRatio: `${config.width} / ${config.height}`,
							border: '1px solid #444',
							boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
						}}
						controls
					/>
				</div>

				<Timeline 
					currentFrame={currentFrame}
					durationInFrames={config.durationInFrames}
					onSeek={seekTo}
				/>
			</div>
		</div>
	);
}

export default App;
