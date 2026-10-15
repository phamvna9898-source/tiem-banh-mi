import React from 'react';
import { ShoppingBag, PhoneCall, Clock, MapPin, Globe } from 'lucide-react';
import { formatVND } from '../utils/format';
import { Language, TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  lang: Language;
  onToggleLang: (newLang: Language) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenBranches: () => void;
  onScrollToMenu: () => void;
  onScrollToAbout: () => void;
  onScrollToReviews: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenBranches,
  onScrollToMenu,
  onScrollToAbout,
  onScrollToReviews,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8]">
      {/* Top micro strip */}
      <div className="bg-[#2C241E] text-[#F5ECE0] text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#E05D26]" />
              {t.topStripHours}
            </span>
            <span className="hidden md:inline-block text-[#6E5D4F]">|</span>
            <span className="hidden md:flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E05D26]" />
              {t.topStripDelivery}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs font-medium">
            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded text-[11px]">
              <Globe className="w-3 h-3 text-[#C87A28]" />
              <button
                type="button"
                onClick={() => onToggleLang('vi')}
                className={`cursor-pointer transition-colors ${
                  lang === 'vi' ? 'text-white font-bold underline' : 'text-[#A8988A] hover:text-white'
                }`}
              >
                Tiếng Việt
              </button>
              <span className="text-white/30">/</span>
              <button
                type="button"
                onClick={() => onToggleLang('zh')}
                className={`cursor-pointer transition-colors ${
                  lang === 'zh' ? 'text-white font-bold underline' : 'text-[#A8988A] hover:text-white'
                }`}
              >
                繁體中文
              </button>
            </div>

            <a
              href="tel:0908123456"
              className="hidden sm:flex items-center gap-1 hover:text-[#E05D26] transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#E05D26]" />
              <span>{t.hotline}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (1 Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-bold tracking-tight text-[#2C241E] whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="text-[#C87A28] font-serif italic text-2xl sm:text-3xl">Cô Ba</span>
          <span className="font-extrabold tracking-wider uppercase text-sm sm:text-base border-l border-[#D6C7B2] pl-2 text-[#4A3B32]">
            {lang === 'zh' ? '三姐越式法包' : 'Bánh Mì Sài Gòn'}
          </span>
        </a>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#5C4D43]">
          <button
            onClick={onScrollToMenu}
            className="hover:text-[#C87A28] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.navMenu}
          </button>
          <button
            onClick={onScrollToAbout}
            className="hover:text-[#C87A28] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.navAbout}
          </button>
          <button
            onClick={onOpenBranches}
            className="hover:text-[#C87A28] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.navBranches}
          </button>
          <button
            onClick={onScrollToReviews}
            className="hover:text-[#C87A28] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.navReviews}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Interactive Cart button with count & subtotal) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label="Xem giỏ hàng"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#C87A28] text-white hover:bg-[#B3681D] active:scale-98 transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#DC2626] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs sm:text-sm font-semibold">
              {cartCount > 0 ? (
                <span className="font-mono tabular-nums">{formatVND(cartTotal)}</span>
              ) : (
                t.cart
              )}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
