import React from 'react';
import { AbsoluteFill } from 'remotion';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const Slide03_Hearing: React.FC = () => {
    const data = {
        labels: [
            "ビジネスゴールとKPIの明確化",
            "ターゲットユーザーの深い理解",
            "競合他社の分析と差別化",
            "現状の課題・ボトルネック",
            "予算とスケジュールの整合性"
        ],
        datasets: [{
            label: '重要度ウェイト',
            data: [5, 5, 4, 4, 3],
            backgroundColor: 'rgba(41, 98, 255, 0.2)',
            borderColor: '#2962FF',
            pointBackgroundColor: '#2962FF',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#2962FF'
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: { color: '#E0E0E0' },
                grid: { color: '#E0E0E0' },
                pointLabels: {
                    font: { size: 24, family: 'sans-serif' }, // Increased font size for chart
                    color: '#37474F'
                },
                suggestedMin: 0,
                suggestedMax: 5,
                ticks: { display: false }
            }
        },
        plugins: {
            legend: { display: false },
        },
        animation: false as const,
    };

    return (
        <AbsoluteFill className="bg-white p-16 flex flex-row items-center gap-16">
            <div className="flex-1">
                <div className="mb-8">
                    <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-xl font-bold">PHASE 1</span>
                    <h2 className="text-5xl font-bold mt-4 text-gray-800 leading-tight">戦略の解像度を高める<br/>ヒアリング</h2>
                </div>
                <p className="text-3xl text-gray-600 mb-8 leading-relaxed">
                    プロジェクトの初期段階では、単に「どんなサイトが欲しいか」ではなく、ビジネスの深層部分を掘り下げます。
                    成功するプロジェクトには、以下の5つの要素の明確化が不可欠です。
                </p>
                <ul className="space-y-4 text-2xl text-gray-600">
                    <li className="flex items-center"><span className="text-blue-500 mr-4">●</span> <strong>ビジネスゴール:</strong> サイトを通じて何を達成するか</li>
                    <li className="flex items-center"><span className="text-blue-500 mr-4">●</span> <strong>ターゲットユーザー:</strong> 誰に届けたいか（ペルソナ詳細）</li>
                    <li className="flex items-center"><span className="text-blue-500 mr-4">●</span> <strong>競合優位性:</strong> 他社との違いは何か</li>
                </ul>
            </div>
            <div className="flex-1 h-full w-full flex flex-col justify-center items-center">
                <div className="w-full h-[600px] relative">
                    <Radar data={data} options={options} />
                </div>
                <p className="text-center text-xl text-gray-400 mt-4">図：ヒアリングにおける重要確認項目のウェイト</p>
            </div>
        </AbsoluteFill>
    );
};
