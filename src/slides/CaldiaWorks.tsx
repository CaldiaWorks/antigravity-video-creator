import React from 'react';
import {AbsoluteFill} from 'remotion';

export const CaldiaWorks: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				background: 'linear-gradient(135deg, #fffaf0 0%, #fdfcf0 100%)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<h1
				style={{
					fontFamily: 'system-ui, -apple-system, sans-serif',
					fontSize: '120px',
					color: '#333',
					fontWeight: '600',
					letterSpacing: '0.05em',
					margin: 0,
					textAlign: 'center',
				}}
			>
				CALDIA WORKS
			</h1>
		</AbsoluteFill>
	);
};
