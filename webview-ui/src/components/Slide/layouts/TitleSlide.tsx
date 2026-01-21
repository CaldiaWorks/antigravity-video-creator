import React from 'react';
import { TitleSlideProps } from '../../types/SlideTypes';

export const TitleSlide: React.FC<TitleSlideProps> = ({ title, subtitle, style }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            padding: '40px',
            boxSizing: 'border-box',
            fontFamily: '"Inter", "Roboto", sans-serif',
            textAlign: 'center',
            ...style
        }}>
            <h1 style={{ 
                fontSize: '80px', 
                margin: '0 0 20px 0',
                fontWeight: 800,
                lineHeight: 1.1
            }}>
                {title}
            </h1>
            {subtitle && (
                <h2 style={{ 
                    fontSize: '40px', 
                    margin: 0,
                    fontWeight: 400,
                    opacity: 0.9 
                }}>
                    {subtitle}
                </h2>
            )}
        </div>
    );
};
