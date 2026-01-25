import React from 'react';
import {AbsoluteFill} from 'remotion';

export const Introduction: React.FC = () => {
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
					fontSize: '80px',
					color: '#333',
					fontWeight: '500',
					textAlign: 'center',
				}}
			>
				AI Video Solution
			</h1>
		</AbsoluteFill>
	);
};
