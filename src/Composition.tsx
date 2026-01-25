import React from 'react';
import {Series} from 'remotion';
import {CaldiaWorks} from './slides/CaldiaWorks';
import {Introduction} from './slides/Introduction';

export const MyComposition: React.FC = () => {
	return (
		<Series>
			<Series.Sequence durationInFrames={150} name="CaldiaWorks">
				<CaldiaWorks />
			</Series.Sequence>
			<Series.Sequence durationInFrames={150} name="Introduction">
				<Introduction />
			</Series.Sequence>
		</Series>
	);
};
