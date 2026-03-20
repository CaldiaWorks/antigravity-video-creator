import React from 'react';
import { AbsoluteFill } from 'remotion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export const Slide05_Narrative: React.FC = () => {
    const data = {
        labels: ["平均滞在時間", "直帰率の改善", "ブランド記憶", "コンバージョン率"],
        datasets: [
            {
                label: '一般的なWebサイト',
                data: [40, 30, 40, 35],
                backgroundColor: '#B0BEC5',
                borderRadius: 4
            },
            {
                label: 'ナラティブ導入サイト',
                data: [85, 75, 90, 80],
                backgroundColor: '#FFAB00',
                borderRadius: 4
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: '#F5F5F5' },
                ticks: { display: false }
            },
            x: {
                grid: { display: false },
                ticks: { 
                    font: { size: 20 },
                    color: '#37474F'
                }
            }
        },
        plugins: {
            legend: { 
                position: 'top' as const,
                labels: { font: { size: 18 } }
            },
        },
        animation: false,
    };

    return (
        <AbsoluteFill className="bg-white p-16 flex flex-col items-center border-t-[32px] border-amber-400">
            <div className="text-center mb-16 max-w-5xl">
                <h2 className="text-6xl font-bold text-gray-800 mb-6">ナラティブデザインの効果</h2>
                <p className="text-3xl text-gray-500">物語性を持たせたサイト構成は、ユーザーのエンゲージメントを劇的に向上させます。</p>
            </div>
            
            <div className="flex flex-row w-full gap-16 justify-center items-start">
                <div className="flex-2 w-[700px] h-[500px]">
                    <Bar data={data} options={options} />
                </div>
                <div className="flex-1 bg-gray-50 p-12 rounded-2xl flex flex-col justify-center h-[500px]">
                    <h3 className="font-bold text-3xl mb-8 text-blue-900">期待される成果</h3>
                    <div className="space-y-8">
                        <div className="flex items-start">
                            <div className="text-4xl mr-6">⏱️</div>
                            <div>
                                <strong className="block text-3xl text-gray-800 mb-2">滞在時間の増加</strong>
                                <span className="text-xl text-gray-600">ストーリーを追うことで、ユーザーは自然と深く読み進めます。</span>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="text-4xl mr-6">💡</div>
                            <div>
                                <strong className="block text-3xl text-gray-800 mb-2">ブランド記憶率</strong>
                                <span className="text-xl text-gray-600">機能だけでなく感情に訴えることで、記憶に残りやすくなります。</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
