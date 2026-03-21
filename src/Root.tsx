import { Composition } from 'remotion';
import { WorkflowVideo } from './WorkflowVideo';
import { CodeFlow } from './slides/CodeFlow';
import { MyComposition } from './Composition';
import { AvatarTestVideo } from './AvatarTestVideo';
import {
  AIGovernanceVideo,
  AI_GOVERNANCE_TOTAL_FRAMES,
} from './AIGovernanceVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AvatarTest"
        component={AvatarTestVideo}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="AIGovernance"
        component={AIGovernanceVideo}
        durationInFrames={AI_GOVERNANCE_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="WorkflowVideo"
        component={WorkflowVideo}
        durationInFrames={1050}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CodeFlow-Intro"
        component={CodeFlow}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={300}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
