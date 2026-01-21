import { SlideTemplates as t } from './templates';
import { SlideData } from '../types/SlideTypes';

export const slides: SlideData[] = [
    t.Title({
        title: "Remotion Slide System",
        subtitle: "Created with React & TypeScript",
        style: {
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            color: '#FFFFFF'
        }
    }),
    t.Content({
        title: "Features",
        items: [
            "Template based creation",
            "Fully customizable with React",
            "Type-safe configuration"
        ],
        style: {
            backgroundColor: '#ffffff',
            color: '#333333'
        }
    }),
    t.Code({
        title: "Easy Configuration",
        code: `const mySlide = t.Title({
  title: "Hello World"
});`,
        language: "typescript",
        style: {
             backgroundColor: '#1E1E1E',
             color: '#FFFFFF'
        }
    })
];
