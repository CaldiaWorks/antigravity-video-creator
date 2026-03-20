import React from 'react';
import { AbsoluteFill } from 'remotion';

export const Slide02_Process: React.FC = () => {
    return (
        <AbsoluteFill className="bg-gray-50 p-16">
            <div className="max-w-6xl mx-auto w-full h-full flex flex-col justify-center">
                <div className="mb-12 border-l-8 border-blue-600 pl-8">
                    <h2 className="text-5xl font-bold text-gray-800 mb-4">01. 全体プロセス概要</h2>
                    <p className="text-3xl text-gray-600">
                        構築プロジェクトは大きく4つのフェーズに分かれます。<br />
                        デザインやコーディングに入る前の「戦略」と「世界観」の策定に重きを置いています。
                    </p>
                </div>

                <div className="grid grid-cols-4 gap-8 text-center mt-8">
                    {/* Step 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-blue-600 transform hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-center h-80">
                        <div className="text-8xl mb-6">👂</div>
                        <h3 className="font-bold text-3xl mb-4">ヒアリング・調査</h3>
                        <p className="text-xl text-gray-500">課題抽出 / KPI設定<br />競合リサーチ</p>
                    </div>
                    {/* Step 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-cyan-500 transform hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-center h-80">
                        <div className="text-8xl mb-6">🧭</div>
                        <h3 className="font-bold text-3xl mb-4">世界観・コンセプト</h3>
                        <p className="text-xl text-gray-500">ブランド定義<br />ムードボード作成</p>
                    </div>
                    {/* Step 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-amber-500 transform hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-center h-80">
                        <div className="text-8xl mb-6">📖</div>
                        <h3 className="font-bold text-3xl mb-4">ナラティブ設計</h3>
                        <p className="text-xl text-gray-500">ストーリーライン<br />情報設計 (IA)</p>
                    </div>
                    {/* Step 4 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-slate-600 transform hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-center h-80">
                        <div className="text-8xl mb-6">💻</div>
                        <h3 className="font-bold text-3xl mb-4">構築・実装</h3>
                        <p className="text-xl text-gray-500">UIデザイン / 実装<br />CMS組込 / 公開</p>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
