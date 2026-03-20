import React from 'react';
import { AbsoluteFill } from 'remotion';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Slide04_Resource: React.FC = () => {
    const data = {
        labels: [
            "ヒアリング・市場調査",
            "世界観・コンセプト策定",
            "ナラティブ・情報設計",
            "UIデザイン制作",
            "実装・テスト・公開"
        ],
        datasets: [{
            data: [15, 20, 25, 20, 20],
            backgroundColor: [
                '#90CAF9', // Lighter Blue
                '#2962FF', // Primary Blue
                '#00B8D4', // Cyan (Highlight)
                '#4DD0E1', // Light Cyan
                '#B0BEC5'  // Grey
            ],
            borderWidth: 0
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
            legend: {
                position: 'right' as const,
                labels: { 
                    boxWidth: 20, 
                    padding: 20, 
                    font: { size: 24 } // Increased font size
                }
            },
        },
        animation: false,
    };

    return (
        <AbsoluteFill className="bg-white p-16 flex flex-row items-center gap-16">
            <div className="flex-1 order-2">
                 <div className="mb-8">
                    <span className="bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-xl font-bold">PHASE 2 & 3</span>
                    <h2 className="text-5xl font-bold mt-4 text-gray-800 leading-tight">「世界観」と<br/>「ナラティブ」への投資</h2>
                </div>
                <div className="text-3xl text-gray-600 mb-8 leading-relaxed">
                    <p className="mb-6">
                        私たちのワークフローの最大の特徴は、実際のデザインやコーディングに入る前の工程に、多くのリソースを割く点です。
                    </p>
                    <p>
                        <strong className="text-blue-600">なぜか？</strong><br/>
                        しっかりとした「世界観（コンセプト）」と、ユーザーを導く「ナラティブ（物語）」がないまま構築しても、
                        ユーザーの心に残らないからです。
                    </p>
                </div>
            </div>
            <div className="flex-1 order-1 h-full w-full flex flex-col justify-center items-center">
                <div className="w-full h-[600px] relative">
                    <Doughnut data={data} options={options} />
                </div>
                <p className="text-center text-xl text-gray-400 mt-4">図：工程別のリソース（時間・労力）配分イメージ</p>
            </div>
        </AbsoluteFill>
    );
};
