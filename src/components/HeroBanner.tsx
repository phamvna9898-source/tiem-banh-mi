import React from 'react';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface HeroBannerProps {
  lang: Language;
  onExploreMenu: () => void;
  onExploreStory: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  lang,
  onExploreMenu,
  onExploreStory,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-[#FAF7F2] to-[#F4EDE2] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C87A28] mb-3">
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-[#C87A28]" />
                {t.heroBadge}
              </span>
              <span aria-hidden="true" className="text-[#BCAEA0]">·</span>
              <span className="text-[#6E5D4F]">{t.heroSubBadge}</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2C241E] leading-[1.18] tracking-tight mb-4">
              {t.heroTitlePre} <br />
              <span className="font-serif italic font-normal text-[#C87A28]">
                {t.heroTitleHighlight}
              </span>{' '}
              {t.heroTitlePost}
            </h1>

            {/* Body lead */}
            <p className="text-base sm:text-lg text-[#5C4D43] leading-relaxed mb-6 max-w-xl">
              {t.heroDesc}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 rounded-lg bg-[#C87A28] text-white font-semibold text-sm sm:text-base hover:bg-[#B3681D] active:scale-98 transition-all shadow-md shadow-[#C87A28]/20 flex items-center gap-2 cursor-pointer"
              >
                <span>{t.heroCtaMenu}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreStory}
                className="px-5 py-3.5 rounded-lg border border-[#D5C6B1] bg-white/70 hover:bg-white text-[#4A3B32] font-medium text-sm sm:text-base transition-colors cursor-pointer"
              >
                {t.heroCtaStory}
              </button>
            </div>

            {/* Subtle trust notice */}
            <div className="flex items-center gap-2 text-xs text-[#7A6A5E]">
              <Sparkles className="w-3.5 h-3.5 text-[#C87A28]" />
              <span>{t.heroTrust}</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E3D6C1] bg-[#EBE0D0]">
              <img
                src="/src/assets/images/hero_banh_mi_vietnam_1791948256474.jpg"
                alt="Bánh Mì Truyền Thống Việt Nam nóng hổi giòn rụm"
                className="w-full h-[320px] sm:h-[400px] lg:h-[440px] object-cover hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Bottom badge overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#C87A28] uppercase tracking-wider">
                    {t.heroCardKicker}
                  </p>
                  <p className="text-sm sm:text-base font-bold text-[#2C241E]">
                    {t.heroCardTitle}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#7A6A5E] line-through block">63.000₫</span>
                  <span className="text-base sm:text-lg font-bold text-[#DC2626] font-mono tabular-nums">
                    50.000₫
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Proof Bar below hero */}
        <div className="mt-12 pt-8 border-t border-[#E8DEC8] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#2C241E] font-mono tabular-nums">
              {t.proof1Num}
            </span>
            <span className="text-xs sm:text-sm text-[#705E51] mt-0.5">
              {t.proof1Desc}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#2C241E] font-mono tabular-nums">
              {t.proof2Num}
            </span>
            <span className="text-xs sm:text-sm text-[#705E51] mt-0.5">
              {t.proof2Desc}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#2C241E] font-mono tabular-nums">
              {t.proof3Num}
            </span>
            <span className="text-xs sm:text-sm text-[#705E51] mt-0.5">
              {t.proof3Desc}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#2C241E] font-mono tabular-nums">
              {t.proof4Num}
            </span>
            <span className="text-xs sm:text-sm text-[#705E51] mt-0.5">
              {t.proof4Desc}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
