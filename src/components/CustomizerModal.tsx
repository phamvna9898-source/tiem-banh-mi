import React, { useState, useId } from 'react';
import { X, Plus, Minus, Check, Flame } from 'lucide-react';
import { BanhMiItem, CustomizationOptions } from '../types';
import { formatVND } from '../utils/format';
import { Language, TRANSLATIONS, EXTRA_TOPPINGS_TRANSLATIONS, ITEM_TRANSLATIONS_ZH } from '../data/translations';

interface CustomizerModalProps {
  lang: Language;
  item: BanhMiItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: BanhMiItem, quantity: number, customization: CustomizationOptions) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  lang,
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const t = TRANSLATIONS[lang];
  const noteInputId = useId();
  const [quantity, setQuantity] = useState(1);
  const [spiciness, setSpiciness] = useState<'none' | 'mild' | 'hot'>(item.spicyDefault);
  const [cilantro, setCilantro] = useState(true);
  const [cucumber, setCucumber] = useState(true);
  const [pickles, setPickles] = useState(true);
  const [scallionOil, setScallionOil] = useState(true);
  const [pateAmount, setPateAmount] = useState<'regular' | 'extra' | 'none'>('regular');
  const [butterAmount, setButterAmount] = useState<'regular' | 'extra' | 'none'>('regular');
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({});
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const currentExtraList = EXTRA_TOPPINGS_TRANSLATIONS[lang];

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Calculate total unit price
  let extraCost = 0;
  if (pateAmount === 'extra') extraCost += 5000;
  if (butterAmount === 'extra') extraCost += 5000;

  currentExtraList.forEach((extra) => {
    if (selectedExtras[extra.id]) {
      extraCost += extra.price;
    }
  });

  const unitPrice = item.price + extraCost;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const customization: CustomizationOptions = {
      spiciness,
      cilantro,
      cucumber,
      pickles,
      scallionOil,
      pateAmount,
      butterAmount,
      extras: selectedExtras,
      note,
    };
    onAddToCart(item, quantity, customization);
    onClose();
  };

  const isBanhMi = item.category === 'banh-mi' || item.category === 'combo';

  const itemName =
    lang === 'zh' && ITEM_TRANSLATIONS_ZH[item.id]
      ? ITEM_TRANSLATIONS_ZH[item.id].name
      : item.name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8DEC8] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E8DEC8] flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#EBE0D0] overflow-hidden shrink-0 border border-[#E3D6C1]">
              <img
                src={item.image}
                alt={itemName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#2C241E] leading-tight">
                {itemName}
              </h3>
              <p className="text-xs text-[#C87A28] font-semibold mt-0.5 font-mono tabular-nums">
                {lang === 'zh' ? '原價：' : 'Giá gốc: '} {formatVND(item.price)}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8E7E73] hover:text-[#2C241E] hover:bg-[#F2EAE0] transition-colors cursor-pointer"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Customization Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Spiciness Level */}
          <div>
            <label className="text-xs font-bold text-[#2C241E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#DC2626]" />
              {t.spicyTitle}
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { value: 'none', label: t.spicyNone, desc: t.spicyNoneDesc },
                { value: 'mild', label: t.spicyMild, desc: t.spicyMildDesc },
                { value: 'hot', label: t.spicyHot, desc: t.spicyHotDesc },
              ].map((lvl) => (
                <button
                  key={lvl.value}
                  type="button"
                  onClick={() => setSpiciness(lvl.value as 'none' | 'mild' | 'hot')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    spiciness === lvl.value
                      ? 'border-[#C87A28] bg-white ring-2 ring-[#C87A28]/20 shadow-xs'
                      : 'border-[#E8DEC8] bg-[#F5ECE0]/60 hover:bg-white text-[#5C4D43]'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold text-[#2C241E]">
                    {lvl.label}
                  </div>
                  <div className="text-[11px] text-[#7A6A5E] mt-0.5">{lvl.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {isBanhMi && (
            <>
              {/* Fresh Vegetables & Pickles */}
              <div>
                <label className="text-xs font-bold text-[#2C241E] uppercase tracking-wider mb-2 block">
                  {t.veggiesTitle}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: t.cilantro, checked: cilantro, toggle: () => setCilantro(!cilantro) },
                    { label: t.cucumber, checked: cucumber, toggle: () => setCucumber(!cucumber) },
                    { label: t.pickles, checked: pickles, toggle: () => setPickles(!pickles) },
                    { label: t.scallionOil, checked: scallionOil, toggle: () => setScallionOil(!scallionOil) },
                  ].map((veg) => (
                    <button
                      key={veg.label}
                      type="button"
                      onClick={veg.toggle}
                      className={`p-2.5 rounded-lg border flex items-center justify-between text-xs font-medium transition-all cursor-pointer ${
                        veg.checked
                          ? 'border-[#C87A28] bg-white text-[#2C241E]'
                          : 'border-[#E8DEC8] bg-[#F5ECE0]/40 text-[#8E7E73] line-through'
                      }`}
                    >
                      <span>{veg.label}</span>
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center text-white ${
                          veg.checked ? 'bg-[#C87A28]' : 'bg-[#D6C7B2]'
                        }`}
                      >
                        {veg.checked && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pate & Butter preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pate */}
                <div>
                  <label className="text-xs font-bold text-[#2C241E] uppercase tracking-wider mb-2 block">
                    {t.pateTitle}
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { val: 'regular', label: t.pateRegular, extra: '' },
                      { val: 'extra', label: t.pateExtra, extra: '+5.000₫' },
                      { val: 'none', label: t.pateNone, extra: '' },
                    ].map((p) => (
                      <button
                        key={p.val}
                        type="button"
                        onClick={() => setPateAmount(p.val as 'regular' | 'extra' | 'none')}
                        className={`w-full p-2 rounded-lg border text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          pateAmount === p.val
                            ? 'border-[#C87A28] bg-white font-bold text-[#2C241E]'
                            : 'border-[#E8DEC8] bg-[#F5ECE0]/40 text-[#5C4D43]'
                        }`}
                      >
                        <span>{p.label}</span>
                        {p.extra && (
                          <span className="text-[11px] text-[#C87A28] font-mono font-bold">
                            {p.extra}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Butter */}
                <div>
                  <label className="text-xs font-bold text-[#2C241E] uppercase tracking-wider mb-2 block">
                    {t.butterTitle}
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { val: 'regular', label: t.butterRegular, extra: '' },
                      { val: 'extra', label: t.butterExtra, extra: '+5.000₫' },
                      { val: 'none', label: t.butterNone, extra: '' },
                    ].map((b) => (
                      <button
                        key={b.val}
                        type="button"
                        onClick={() => setButterAmount(b.val as 'regular' | 'extra' | 'none')}
                        className={`w-full p-2 rounded-lg border text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          butterAmount === b.val
                            ? 'border-[#C87A28] bg-white font-bold text-[#2C241E]'
                            : 'border-[#E8DEC8] bg-[#F5ECE0]/40 text-[#5C4D43]'
                        }`}
                      >
                        <span>{b.label}</span>
                        {b.extra && (
                          <span className="text-[11px] text-[#C87A28] font-mono font-bold">
                            {b.extra}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Extra Toppings */}
              <div>
                <label className="text-xs font-bold text-[#2C241E] uppercase tracking-wider mb-2 block">
                  {t.extraToppingsTitle}
                </label>
                <div className="space-y-2">
                  {currentExtraList.map((extra) => (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra.id)}
                      className={`w-full p-2.5 rounded-lg border flex items-center justify-between text-xs sm:text-sm transition-all cursor-pointer ${
                        selectedExtras[extra.id]
                          ? 'border-[#C87A28] bg-white text-[#2C241E] font-semibold'
                          : 'border-[#E8DEC8] bg-[#F5ECE0]/50 text-[#5C4D43]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center text-white ${
                            selectedExtras[extra.id] ? 'bg-[#C87A28]' : 'border border-[#C8BAAA]'
                          }`}
                        >
                          {selectedExtras[extra.id] && <Check className="w-3 h-3" />}
                        </div>
                        <span>{extra.label}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#C87A28]">
                        +{formatVND(extra.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Special Notes */}
          <div>
            <label htmlFor={noteInputId} className="text-xs font-bold text-[#2C241E] uppercase tracking-wider mb-2 block">
              {t.noteTitle}
            </label>
            <input
              id={noteInputId}
              type="text"
              placeholder={t.notePlaceholder}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5C6B1] bg-white text-xs sm:text-sm text-[#2C241E] placeholder-[#8E7E73] focus:outline-none focus:ring-2 focus:ring-[#C87A28]"
            />
          </div>
        </div>

        {/* Modal Footer with Live Quantity and Total Price CTA */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E8DEC8] flex items-center justify-between gap-4">
          {/* Quantity stepper */}
          <div className="flex items-center border border-[#D5C6B1] rounded-lg bg-[#FAF7F2] p-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded flex items-center justify-center text-[#5C4D43] hover:bg-white transition-colors cursor-pointer"
              aria-label="Giảm số lượng"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-9 text-center font-bold text-sm text-[#2C241E] font-mono tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded flex items-center justify-center text-[#5C4D43] hover:bg-white transition-colors cursor-pointer"
              aria-label="Tăng số lượng"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add CTA */}
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3 px-4 rounded-lg bg-[#C87A28] text-white font-bold text-sm sm:text-base hover:bg-[#B3681D] active:scale-98 transition-all flex items-center justify-between cursor-pointer shadow-md shadow-[#C87A28]/20"
          >
            <span>{t.addToCartBtn}</span>
            <span className="font-mono tabular-nums">{formatVND(totalPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
