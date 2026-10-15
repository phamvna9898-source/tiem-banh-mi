import React from 'react';
import { Sparkles, HeartHandshake, ShieldCheck, Flame } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="about" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-[#C87A28] mb-2 uppercase tracking-wider">
            {t.aboutKicker}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2C241E] tracking-tight mb-4">
            {t.aboutHeading}
          </h2>
          <p className="text-base sm:text-lg text-[#5C4D43] leading-relaxed">
            {t.aboutLead}
          </p>
        </div>

        {/* Featured Story Block with Rich Typography */}
        <div className="bg-white rounded-2xl border border-[#E8DEC8] p-6 sm:p-10 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-[#4A3B32] leading-relaxed">
              <p>{t.aboutP1}</p>
              <p>{t.aboutP2}</p>
              <p className="italic text-[#705E51] border-l-2 border-[#C87A28] pl-4">
                {t.aboutQuote}
              </p>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-xl overflow-hidden border border-[#E3D6C1] shadow-md">
                <img
                  src="/src/assets/images/banh_mi_thap_cam_1791948256850.jpg"
                  alt="Mặt cắt ổ bánh mì Cô Ba ngập tràn nhân pâté và thịt nguội"
                  className="w-full h-[280px] sm:h-[320px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-3 text-center text-xs text-[#7A6A5E]">
                {t.aboutImageCaption}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Quality Commitment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#C87A28]/10 text-[#C87A28] flex items-center justify-center mb-4">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#2C241E] mb-1.5">
                {t.pillar1Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C4D43] leading-normal">
                {t.pillar1Desc}
              </p>
            </div>
          </div>

          <div className="bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#C87A28]/10 text-[#C87A28] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#2C241E] mb-1.5">
                {t.pillar2Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C4D43] leading-normal">
                {t.pillar2Desc}
              </p>
            </div>
          </div>

          <div className="bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#C87A28]/10 text-[#C87A28] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#2C241E] mb-1.5">
                {t.pillar3Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C4D43] leading-normal">
                {t.pillar3Desc}
              </p>
            </div>
          </div>

          <div className="bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#C87A28]/10 text-[#C87A28] flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#2C241E] mb-1.5">
                {t.pillar4Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C4D43] leading-normal">
                {t.pillar4Desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
