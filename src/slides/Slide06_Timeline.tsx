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

export const Slide06_Timeline: React.FC = () => {
    const data = {
        labels: [
            "ヒアリング・要件定義", 
            "コンセプト・ナラティブ設計", 
            "ワイヤーフレーム・UIデザイン", 
            "フロントエンド/CMS実装", 
            "テスト・公開準備"
        ],
        datasets: [{
            label: '期間（週間）',
            data: [
                [0, 2],    // Week 0-2
                [2, 6],    // Week 2-6 (4 weeks)
                [5, 9],    // Week 5-9 (Overlap slightly)
                [8, 12],   // Week 8-12
                [11, 14]   // Week 11-14
            ],
            backgroundColor: [
                '#90CAF9', 
                '#00B8D4', // Highlight Concept Phase
                '#4DD0E1', 
                '#2962FF', 
                '#B0BEC5'
            ],
            barPercentage: 0.6,
            // barThickness: 40,
        }]
    };

    const options = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                min: 0,
                max: 14,
                title: { 
                    display: true, 
                    text: 'プロジェクト経過週数',
                    font: { size: 18 }
                },
                grid: { color: '#E0E0E0' },
                ticks: { font: { size: 16 } }
            },
            y: {
                grid: { display: false },
                ticks: { 
                    font: { size: 20 },
                    color: '#37474F',
                    autoSkip: false
                }
            }
        },
        plugins: {
            legend: { display: false },
        },
        animation: false as const,
    };

    return (
        <AbsoluteFill className="bg-white p-16 flex flex-col justify-center">
             <div className="mb-12 border-l-8 border-slate-600 pl-8">
                <h2 className="text-5xl font-bold text-gray-800 mb-4">標準的なプロジェクトスケジュール</h2>
                <p className="text-3xl text-gray-600">3ヶ月〜4ヶ月の標準的なプロジェクト進行イメージです。</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm h-[600px] w-full border border-gray-100">
                <Bar data={data as any} options={options} />
            </div>
        </AbsoluteFill>
    );
};
