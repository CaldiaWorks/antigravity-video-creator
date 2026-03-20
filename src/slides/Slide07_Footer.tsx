import React from 'react';
import { AbsoluteFill } from 'remotion';

export const Slide07_Footer: React.FC = () => {
  return (
    <AbsoluteFill className="bg-gray-800 text-white p-16 flex flex-col justify-center items-center text-center">
      <h2 className="text-6xl font-bold mb-12">
        御社の「物語」を<br />一緒に作りませんか？
      </h2>
      <p className="text-3xl text-gray-400 mb-16 max-w-4xl leading-relaxed">
        単なるWebサイト制作代行ではなく、事業成長のためのパートナーとして。<br />
        まずは現状の課題をお聞かせください。
      </p>
      <div className="flex justify-center gap-4">
        <div className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-6 px-16 rounded-full shadow-lg text-4xl">
            無料相談を予約する
        </div>
      </div>
    </AbsoluteFill>
  );
};
