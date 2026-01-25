import type { 
    TitleSlideProps, 
    ContentSlideProps, 
    ImageSlideProps, 
    CodeSlideProps 
} from '../types/SlideTypes';

const DEFAULT_DURATION = 90;

export const SlideTemplates = {
    Title: (props: Omit<TitleSlideProps, 'type' | 'durationInFrames'> & { durationInFrames?: number }): TitleSlideProps => ({
        type: 'Title',
        durationInFrames: DEFAULT_DURATION,
        ...props,
    }),

    Content: (props: Omit<ContentSlideProps, 'type' | 'durationInFrames'> & { durationInFrames?: number }): ContentSlideProps => ({
        type: 'Content',
        durationInFrames: 120,
        ...props,
    }),

    Image: (props: Omit<ImageSlideProps, 'type' | 'durationInFrames'> & { durationInFrames?: number }): ImageSlideProps => ({
        type: 'Image',
        durationInFrames: DEFAULT_DURATION,
        ...props,
    }),

    Code: (props: Omit<CodeSlideProps, 'type' | 'durationInFrames'> & { durationInFrames?: number }): CodeSlideProps => ({
        type: 'Code',
        durationInFrames: 150,
        ...props,
    }),
};
