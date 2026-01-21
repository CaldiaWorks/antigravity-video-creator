import React from 'react';
import { ContentSlideProps } from '../../types/SlideTypes';

export const ContentSlide: React.FC<ContentSlideProps> = ({ title, items, style }) => {
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
                fontSize: '60px', 
                margin: '0 0 40px 0',
                borderBottom: '4px solid currentColor',
                paddingBottom: '20px',
                display: 'inline-block',
                width: '100%'
            }}>
                {title}
            </h1>
            <ul style={{ 
                fontSize: '40px', 
                lineHeight: 1.6,
                margin: 0,
                paddingLeft: '50px'
            }}>
                {items.map((item, index) => (
                    <li key={index} style={{ marginBottom: '20px' }}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};
