import React from 'react';
import { AbsoluteFill, Audio } from 'remotion';
import { Avatar } from './components/Avatar';
import type { CharacterDef } from './components/Avatar';

// Assets Import
// 画像・音声アセットはプロジェクトのルート（srcと同階層）のassets内に置かれているため、相対パスで適宜参照します。
import imgIdle from '../assets/images/キャラクター_ちびアバター.png';
import imgSpeaking from '../assets/images/キャラクター_ちびアバター_speaking.png';
import imgBlinkIdle from '../assets/images/キャラクター_ちびアバター_blink_idle.png';
import imgBlinkSpeaking from '../assets/images/キャラクター_ちびアバター_blink_speaking.png';
import dummyAudio from '../assets/audio/test-voice.wav';

const testCharacterDef: CharacterDef = {
  idle: imgIdle,
  speaking: imgSpeaking,
  blinkIdle: imgBlinkIdle,
  blinkSpeaking: imgBlinkSpeaking,
};

export const AvatarTestVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#f0f0f0' }}>
      <Audio src={dummyAudio} />
      <div style={{
        position: 'absolute',
        bottom: 50,
        right: 50,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
      }}>
        <Avatar
          audioSrc={dummyAudio}
          characterDef={testCharacterDef}
          threshold={0.02} // テスト用の音声閾値
          width={350} // 実況動画を想定したサイズ調整
        />
      </div>
    </AbsoluteFill>
  );
};
