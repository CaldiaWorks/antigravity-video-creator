import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { Slide01_Hero } from './slides/Slide01_Hero';
import { Slide02_Process } from './slides/Slide02_Process';
import { Slide03_Hearing } from './slides/Slide03_Hearing';
import { Slide04_Resource } from './slides/Slide04_Resource';
import { Slide05_Narrative } from './slides/Slide05_Narrative';
import { Slide06_Timeline } from './slides/Slide06_Timeline';
import { Slide07_Footer } from './slides/Slide07_Footer';

export const WorkflowVideo: React.FC = () => {
    const { fps } = useVideoConfig();
    const slideDurationInFrames = 5 * fps; // 5 seconds per slide

    return (
        <div style={{ flex: 1, backgroundColor: 'white' }}>
            <Sequence from={0} durationInFrames={slideDurationInFrames}>
                <Slide01_Hero />
            </Sequence>
            <Sequence from={slideDurationInFrames} durationInFrames={slideDurationInFrames}>
                <Slide02_Process />
            </Sequence>
            <Sequence from={slideDurationInFrames * 2} durationInFrames={slideDurationInFrames}>
                <Slide03_Hearing />
            </Sequence>
            <Sequence from={slideDurationInFrames * 3} durationInFrames={slideDurationInFrames}>
                <Slide04_Resource />
            </Sequence>
            <Sequence from={slideDurationInFrames * 4} durationInFrames={slideDurationInFrames}>
                <Slide05_Narrative />
            </Sequence>
            <Sequence from={slideDurationInFrames * 5} durationInFrames={slideDurationInFrames}>
                <Slide06_Timeline />
            </Sequence>
            <Sequence from={slideDurationInFrames * 6} durationInFrames={slideDurationInFrames}>
                <Slide07_Footer />
            </Sequence>
        </div>
    );
};
