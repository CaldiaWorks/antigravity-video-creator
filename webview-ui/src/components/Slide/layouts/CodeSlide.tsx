import React from 'react';
import type { CodeSlideProps } from '../../../types/SlideTypes';

export const CodeSlide: React.FC<CodeSlideProps> = ({ title, code, language, style }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            padding: '60px 80px',
            boxSizing: 'border-box',
            fontFamily: '"Inter", "Roboto", sans-serif',
            ...style
        }}>
            <h1 style={{ 
                fontSize: '50px', 
                margin: '0 0 30px 0',
            }}>
                {title}
            </h1>
            <div style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.3)',
                padding: '40px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    fontSize: '20px',
                    opacity: 0.7,
                    fontFamily: 'monospace'
                }}>
                    {language}
                </div>
                <pre style={{ 
                    margin: 0, 
                    fontSize: '32px', 
                    fontFamily: '"Fira Code", monospace',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all'
                }}>
                    {code}
                </pre>
            </div>
        </div>
    );
};
