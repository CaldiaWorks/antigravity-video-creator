import type { CSSProperties, ReactNode } from 'react';

export type SlideType = 'Title' | 'Content' | 'Image' | 'Code';

export interface BaseSlideConfig {
    type: SlideType;
    durationInFrames: number;
    style?: CSSProperties;
}

export interface TitleSlideProps extends BaseSlideConfig {
    type: 'Title';
    title: ReactNode;
    subtitle?: ReactNode;
}

export interface ContentSlideProps extends BaseSlideConfig {
    type: 'Content';
    title: ReactNode;
    items: ReactNode[];
}

export interface ImageSlideProps extends BaseSlideConfig {
    type: 'Image';
    src: string;
    title?: ReactNode;
}

export interface CodeSlideProps extends BaseSlideConfig {
    type: 'Code';
    title: ReactNode;
    code: string;
    language: string;
}

export type SlideData = 
    | TitleSlideProps 
    | ContentSlideProps 
    | ImageSlideProps 
    | CodeSlideProps;
