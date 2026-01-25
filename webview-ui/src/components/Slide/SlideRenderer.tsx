import React from 'react';
import type { SlideData } from '../../types/SlideTypes';
import { TitleSlide } from './layouts/TitleSlide';
import { ContentSlide } from './layouts/ContentSlide';
import { CodeSlide } from './layouts/CodeSlide';

interface SlideRendererProps {
    slide: SlideData;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
    switch (slide.type) {
        case 'Title':
            return <TitleSlide {...slide} />;
        case 'Content':
            return <ContentSlide {...slide} />;
        case 'Code':
            return <CodeSlide {...slide} />;
        // case 'Image':
        //     return <ImageSlide {...slide} />;
        default:
            return <div style={{ color: 'red' }}>Unknown Slide Type: {(slide as any).type}</div>;
    }
};
