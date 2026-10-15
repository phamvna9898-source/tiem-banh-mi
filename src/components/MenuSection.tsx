import React, { useState, useMemo } from 'react';
import { Search, Plus, Star, X } from 'lucide-react';
import { BanhMiItem } from '../types';
import { formatVND } from '../utils/format';
import { Language, TRANSLATIONS, ITEM_TRANSLATIONS_ZH } from '../data/translations';

interface MenuSectionProps {
  lang: Language;
  items: BanhMiItem[];
  onSelectItem: (item: BanhMiItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  lang,
  items,
  onSelectItem,
}) => {
  const t = TRANSLATIONS[lang];
  const [activeCategory, setActiveCategory] = useState<'all' | 'banh-mi' | 'combo' | 'nuoc-uong'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getItemData = (item: BanhMiItem) => {
    if (lang === 'zh' && ITEM_TRANSLATIONS_ZH[item.id]) {
      const zh = ITEM_TRANSLATIONS_ZH[item.id];
      return {
        name: zh.name,
        tagline: zh.tagline,
        description: zh.description,
        ingredients: zh.ingredients,
        badge: zh.badge || item.badge,
      };
    }
    return {
      name: item.name,
      tagline: item.tagline,
      description: item.description,
      ingredients: item.ingredients,
      badge: item.badge,
    };
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCategory =
        activeCategory === 'all' ? true : item.category === activeCategory;
      const data = getItemData(item);
      const matchSearch =
        searchQuery.trim() === ''
          ? true
          : data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [items, activeCategory, searchQuery, lang]);

  return (
    <section id="menu" className="py-16 sm:py-20 bg-white border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-semibold text-[#C87A28] uppercase tracking-wider mb-2">
              {t.menuKicker}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2C241E] tracking-tight">
              {t.menuHeading}
            </h2>
            <p className="text-sm sm:text-base text-[#6E5D4F] mt-1 max-w-xl">
              {t.menuDesc}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E7E73]" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-[#D5C6B1] bg-[#FAF7F2] text-sm text-[#2C241E] placeholder-[#8E7E73] focus:outline-none focus:ring-2 focus:ring-[#C87A28] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8E7E73] hover:text-[#2C241E]"
                aria-label="Xóa tìm kiếm"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#2C241E] text-white shadow-sm'
                : 'bg-[#F2EAE0] text-[#5C4D43] hover:bg-[#E8DEC8] hover:text-[#2C241E]'
            }`}
          >
            {t.catAll} ({items.length})
          </button>
          <button
            onClick={() => setActiveCategory('banh-mi')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeCategory === 'banh-mi'
                ? 'bg-[#2C241E] text-white shadow-sm'
                : 'bg-[#F2EAE0] text-[#5C4D43] hover:bg-[#E8DEC8] hover:text-[#2C241E]'
            }`}
          >
            {t.catBanhMi}
          </button>
          <button
            onClick={() => setActiveCategory('combo')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeCategory === 'combo'
                ? 'bg-[#2C241E] text-white shadow-sm'
                : 'bg-[#F2EAE0] text-[#5C4D43] hover:bg-[#E8DEC8] hover:text-[#2C241E]'
            }`}
          >
            {t.catCombo}
          </button>
          <button
            onClick={() => setActiveCategory('nuoc-uong')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeCategory === 'nuoc-uong'
                ? 'bg-[#2C241E] text-white shadow-sm'
                : 'bg-[#F2EAE0] text-[#5C4D43] hover:bg-[#E8DEC8] hover:text-[#2C241E]'
            }`}
          >
            {t.catDrinks}
          </button>
        </div>

        {/* Empty Search State */}
        {filteredItems.length === 0 && (
          <div className="py-16 text-center border border-dashed border-[#D5C6B1] rounded-2xl bg-[#FAF7F2]">
            <p className="text-base font-semibold text-[#2C241E]">
              {lang === 'zh'
                ? `未找到符合「${searchQuery}」的餐點`
                : `Không tìm thấy món nào phù hợp với "${searchQuery}"`}
            </p>
            <p className="text-sm text-[#705E51] mt-1 mb-4">
              {lang === 'zh'
                ? '請嘗試其他關鍵字，如「炭烤」、「扎肉」、「素食」或「咖啡」。'
                : 'Thử tìm kiếm với từ khóa khác như "thịt nướng", "chả lụa", hoặc "cà phê".'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 rounded-lg bg-[#C87A28] text-white text-xs font-semibold hover:bg-[#B3681D] transition-colors"
            >
              {lang === 'zh' ? '瀏覽全品項菜單' : 'Xem toàn bộ thực đơn'}
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const data = getItemData(item);

            return (
              <div
                key={item.id}
                className="group flex flex-col bg-white rounded-xl border border-[#E8DEC8] overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Product Visual */}
                <div
                  className="relative aspect-[4/3] bg-[#EBE0D0] overflow-hidden cursor-pointer"
                  onClick={() => onSelectItem(item)}
                >
                  <img
                    src={item.image}
                    alt={data.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Subtle tag / discount */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {data.badge && (
                      <span className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase bg-[#2C241E]/90 text-white backdrop-blur-md rounded">
                        {data.badge}
                      </span>
                    )}
                    {item.originalPrice && (
                      <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-[#DC2626] rounded">
                        {lang === 'zh' ? '現省' : 'GIẢM'} {formatVND(item.originalPrice - item.price)}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-white/95 backdrop-blur-md rounded text-xs font-semibold text-[#2C241E] flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-[#E05D26] text-[#E05D26]" />
                    <span>{item.rating.toFixed(1)}</span>
                    <span className="text-[10px] text-[#7A6A5E]">({item.reviewsCount})</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Clean unboxed metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#7A6A5E] mb-1.5">
                      <span>
                        {item.category === 'banh-mi'
                          ? (lang === 'zh' ? '越式法包' : 'Bánh Mì')
                          : item.category === 'combo'
                          ? (lang === 'zh' ? '超值組合' : 'Combo Đặc Biệt')
                          : (lang === 'zh' ? '特色飲品' : 'Nước Uống')}
                      </span>
                      {item.calories && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{item.calories} kcal</span>
                        </>
                      )}
                    </div>

                    <h3
                      onClick={() => onSelectItem(item)}
                      className="text-lg font-bold text-[#2C241E] group-hover:text-[#C87A28] transition-colors cursor-pointer line-clamp-1"
                    >
                      {data.name}
                    </h3>

                    <p className="text-xs font-medium text-[#C87A28] italic mb-2">
                      {data.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-[#5C4D43] leading-relaxed line-clamp-2 mb-3">
                      {data.description}
                    </p>

                    {/* Clean ingredients list */}
                    <div className="text-[11px] text-[#7A6A5E] line-clamp-1 mb-4">
                      <span className="font-medium text-[#4A3B32]">{t.ingredientsLabel}</span>{' '}
                      {data.ingredients.join(' · ')}
                    </div>
                  </div>

                  {/* Bottom Card Row: Price & Action */}
                  <div className="pt-3 border-t border-[#F2EAE0] flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      {item.originalPrice && (
                        <span className="text-xs text-[#8E7E73] line-through font-mono tabular-nums">
                          {formatVND(item.originalPrice)}
                        </span>
                      )}
                      <span className="text-base sm:text-lg font-extrabold text-[#C87A28] font-mono tabular-nums">
                        {formatVND(item.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectItem(item)}
                      className="px-3.5 py-2 rounded-lg bg-[#2C241E] text-white text-xs sm:text-sm font-semibold hover:bg-[#C87A28] active:scale-98 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{item.category === 'banh-mi' ? t.customizeBtn : t.buyBtn}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
