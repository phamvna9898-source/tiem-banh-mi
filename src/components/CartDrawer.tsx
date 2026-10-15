import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { formatVND } from '../utils/format';
import { Language, TRANSLATIONS, EXTRA_TOPPINGS_TRANSLATIONS, ITEM_TRANSLATIONS_ZH } from '../data/translations';

interface CartDrawerProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  discountCode: string;
  onApplyDiscount: (code: string) => { success: boolean; message: string };
  discountAmount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  lang,
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discountCode,
  onApplyDiscount,
  discountAmount,
}) => {
  const t = TRANSLATIONS[lang];
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, ci) => sum + ci.itemTotal, 0);
  const deliveryFee = subtotal >= 100000 || subtotal === 0 ? 0 : 15000;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = onApplyDiscount(couponInput.trim());
    setCouponMessage({
      text: res.message,
      isError: !res.success,
    });
  };

  const getExtrasDescription = (item: CartItem) => {
    const list: string[] = [];
    if (item.customization.spiciness === 'none') list.push(t.spicyNone);
    if (item.customization.spiciness === 'hot') list.push(t.spicyHot);
    if (!item.customization.cilantro) list.push(lang === 'zh' ? '去香菜' : 'Không ngò');
    if (!item.customization.cucumber) list.push(lang === 'zh' ? '去黃瓜' : 'Không dưa');
    if (!item.customization.pickles) list.push(lang === 'zh' ? '去醃菜' : 'Không đồ chua');
    if (item.customization.pateAmount === 'extra') list.push(lang === 'zh' ? '加倍肝醬' : 'Thêm Pâté');
    if (item.customization.pateAmount === 'none') list.push(lang === 'zh' ? '不加肝醬' : 'Không Pâté');
    if (item.customization.butterAmount === 'extra') list.push(lang === 'zh' ? '加倍蛋黃醬' : 'Thêm Bơ');

    const extraMap = EXTRA_TOPPINGS_TRANSLATIONS[lang];
    Object.entries(item.customization.extras).forEach(([id, val]) => {
      if (val) {
        const found = extraMap.find((e) => e.id === id);
        if (found) list.push(found.label);
      }
    });

    if (item.customization.note) {
      list.push(`${lang === 'zh' ? '備註：' : 'Lưu ý: '}"${item.customization.note}"`);
    }

    return list.join(' · ');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#E8DEC8] animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E8DEC8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C87A28]" />
            <h3 className="text-base sm:text-lg font-bold text-[#2C241E]">
              {t.cartTitle}
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#F2EAE0] text-[#5C4D43] font-mono tabular-nums">
              {items.reduce((sum, i) => sum + i.quantity, 0)} {lang === 'zh' ? '份' : 'món'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8E7E73] hover:text-[#2C241E] hover:bg-[#F2EAE0] transition-colors cursor-pointer"
            aria-label="Đóng giỏ hàng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress notification */}
        <div className="bg-[#F4ECE1] px-5 py-2.5 border-b border-[#E8DEC8] text-xs text-[#5C4D43]">
          {subtotal >= 100000 ? (
            <span className="text-[#1E3A2F] font-bold">
              {t.freeShipQualified}
            </span>
          ) : (
            <span>
              {lang === 'zh' ? '再加購 ' : 'Mua thêm '}
              <strong className="text-[#C87A28] font-mono tabular-nums">
                {formatVND(100000 - subtotal)}
              </strong>{' '}
              {t.freeShipThresholdNotice}
            </span>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#EBE0D0] flex items-center justify-center text-[#8E7E73] mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-base font-bold text-[#2C241E] mb-1">
                {t.cartEmptyTitle}
              </p>
              <p className="text-xs text-[#705E51] mb-6 max-w-xs">
                {t.cartEmptyDesc}
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg bg-[#C87A28] text-white text-xs font-bold hover:bg-[#B3681D] transition-colors cursor-pointer"
              >
                {lang === 'zh' ? '探索精選菜單' : 'Khám phá thực đơn'}
              </button>
            </div>
          ) : (
            items.map((cartItem) => {
              const details = getExtrasDescription(cartItem);
              const itemName =
                lang === 'zh' && ITEM_TRANSLATIONS_ZH[cartItem.item.id]
                  ? ITEM_TRANSLATIONS_ZH[cartItem.item.id].name
                  : cartItem.item.name;

              return (
                <div
                  key={cartItem.cartItemId}
                  className="bg-white rounded-xl border border-[#E8DEC8] p-3.5 shadow-2xs flex flex-col gap-2.5"
                >
                  <div className="flex gap-3">
                    <img
                      src={cartItem.item.image}
                      alt={itemName}
                      className="w-16 h-16 rounded-lg object-cover border border-[#E8DEC8] shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-[#2C241E] truncate">
                          {itemName}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(cartItem.cartItemId)}
                          className="text-[#A39284] hover:text-[#DC2626] transition-colors p-0.5 cursor-pointer shrink-0"
                          aria-label="Xóa món"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {details && (
                        <p className="text-[11px] text-[#7A6A5E] line-clamp-2 mt-0.5 leading-snug">
                          {details}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F2EAE0]">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#D5C6B1] rounded-md bg-[#FAF7F2] p-0.5">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)
                            }
                            className="w-6 h-6 rounded flex items-center justify-center text-[#5C4D43] hover:bg-white cursor-pointer"
                            aria-label="Giảm 1"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center font-bold text-xs text-[#2C241E] font-mono tabular-nums">
                            {cartItem.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)
                            }
                            className="w-6 h-6 rounded flex items-center justify-center text-[#5C4D43] hover:bg-white cursor-pointer"
                            aria-label="Tăng 1"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-bold text-[#C87A28] font-mono tabular-nums">
                          {formatVND(cartItem.itemTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Coupon Code Input */}
          {items.length > 0 && (
            <div className="pt-2">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E7E73]" />
                  <input
                    type="text"
                    placeholder={t.discountCodePlaceholder}
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-[#D5C6B1] bg-white focus:outline-none focus:ring-1 focus:ring-[#C87A28]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-[#2C241E] text-white text-xs font-semibold hover:bg-[#4A3B32] transition-colors cursor-pointer"
                >
                  {t.applyDiscountBtn}
                </button>
              </form>
              {couponMessage && (
                <p
                  className={`text-[11px] mt-1.5 ${
                    couponMessage.isError ? 'text-[#DC2626]' : 'text-[#1E3A2F] font-semibold'
                  }`}
                >
                  {couponMessage.text}
                </p>
              )}
              {discountCode && (
                <div className="mt-1 flex items-center justify-between text-xs text-[#1E3A2F] font-semibold bg-[#EAF5EF] p-2 rounded-lg border border-[#BCE1CC]">
                  <span>{lang === 'zh' ? '已套用代碼：' : 'Đã áp dụng mã: '}{discountCode}</span>
                  <span className="font-mono tabular-nums">-{formatVND(discountAmount)}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#E8DEC8] space-y-3">
            <div className="space-y-1.5 text-xs text-[#5C4D43]">
              <div className="flex justify-between">
                <span>{t.subtotal} ({items.reduce((s, i) => s + i.quantity, 0)} {lang === 'zh' ? '份' : 'món'}):</span>
                <span className="font-mono tabular-nums font-medium text-[#2C241E]">
                  {formatVND(subtotal)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#DC2626]">
                  <span>{t.discount}:</span>
                  <span className="font-mono tabular-nums">-{formatVND(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{t.deliveryFee}:</span>
                <span className="font-mono tabular-nums">
                  {deliveryFee === 0 ? (
                    <span className="text-[#1E3A2F] font-semibold">{t.freeShipping}</span>
                  ) : (
                    formatVND(deliveryFee)
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-[#F2EAE0] flex justify-between items-baseline">
                <span className="text-sm font-bold text-[#2C241E]">{t.totalPayment}:</span>
                <span className="text-xl font-extrabold text-[#C87A28] font-mono tabular-nums">
                  {formatVND(total)}
                </span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-lg bg-[#C87A28] text-white font-bold text-sm sm:text-base hover:bg-[#B3681D] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#C87A28]/20"
            >
              <span>{t.proceedCheckout}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
