import React from 'react';
import { AbsoluteFill } from 'remotion';

export const Slide01_Hero: React.FC = () => {
  return (
    <AbsoluteFill className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white p-16 flex flex-col justify-center items-center">
      <div className="max-w-6xl w-full">
        <p className="uppercase tracking-widest text-2xl font-bold mb-4 text-yellow-300">
          Service Workflow
        </p>
        <h1 className="text-7xl font-bold mb-8 leading-tight">
          世界観を実装する。<br />
          コーポレートサイト構築ワークフロー
        </h1>
        <p className="text-3xl max-w-4xl text-blue-100 leading-relaxed">
          単なる情報の羅列ではない、企業の「ナラティブ（物語）」を語るWebサイトへ。<br />
          ヒアリングから公開までのプロセスを可視化しました。
        </p>
      </div>
    </AbsoluteFill>
  );
};
