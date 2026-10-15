import React, { useState } from 'react';
import { X, MapPin, Truck, Store, QrCode, Banknote, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { formatVND, generateOrderId } from '../utils/format';
import { Language, TRANSLATIONS } from '../data/translations';

interface CheckoutModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount: number;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  lang,
  isOpen,
  onClose,
  items,
  discountAmount,
  onOrderSuccess,
}) => {
  const t = TRANSLATIONS[lang];
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryTime, setDeliveryTime] = useState<'now' | 'schedule'>('now');
  const [scheduleTime, setScheduleTime] = useState('11:30');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vietqr' | 'momo'>('cod');
  const [orderNote, setOrderNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, ci) => sum + ci.itemTotal, 0);
  const deliveryFee = deliveryMethod === 'pickup' || subtotal >= 100000 ? 0 : 15000;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg(lang === 'zh' ? '請輸入收件人姓名。' : 'Vui lòng nhập tên người nhận.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 9) {
      setErrorMsg(lang === 'zh' ? '請輸入正確的聯絡電話。' : 'Vui lòng nhập số điện thoại hợp lệ (từ 10 số).');
      return;
    }
    if (deliveryMethod === 'delivery' && !address.trim()) {
      setErrorMsg(lang === 'zh' ? '請輸入詳細外送地址。' : 'Vui lòng nhập địa chỉ giao bánh chi tiết.');
      return;
    }

    setIsSubmitting(true);

    const newOrder: OrderDetails = {
      orderId: generateOrderId(),
      customerName: name.trim(),
      phone: phone.trim(),
      address: deliveryMethod === 'pickup' ? (lang === 'zh' ? '西貢第一郡黎聖宗街 182 號門市自取' : 'Nhận tại 182 Lê Thánh Tôn, Q.1') : address.trim(),
      deliveryMethod,
      deliveryTime,
      scheduleTime: deliveryTime === 'schedule' ? scheduleTime : undefined,
      paymentMethod,
      items,
      subtotal,
      discount: discountAmount,
      deliveryFee,
      total,
      status: 'received',
      createdAt: new Date().toLocaleTimeString(lang === 'zh' ? 'zh-TW' : 'vi-VN', { hour: '2-digit', minute: '2-digit' }),
      note: orderNote.trim(),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderSuccess(newOrder);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8DEC8] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E8DEC8] flex items-center justify-between sticky top-0 z-10">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#2C241E]">
              {t.checkoutTitle}
            </h3>
            <p className="text-xs text-[#7A6A5E]">
              {t.checkoutDesc}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8E7E73] hover:text-[#2C241E] hover:bg-[#F2EAE0] transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {errorMsg && (
            <div className="p-3 bg-[#FEE2E2] text-[#DC2626] text-xs font-semibold rounded-lg border border-[#FCA5A5]">
              {errorMsg}
            </div>
          )}

          {/* Delivery or Pickup */}
          <div>
            <label className="text-xs font-bold text-[#2C241E] uppercase tracking-wider mb-2 block">
              {t.deliveryMethodTitle}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryMethod('delivery')}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                  deliveryMethod === 'delivery'
                    ? 'border-[#C87A28] bg-white ring-2 ring-[#C87A28]/20 shadow-xs'
                    : 'border-[#E8DEC8] bg-[#F5ECE0]/50 text-[#5C4D43]'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    deliveryMethod === 'delivery'
                      ? 'bg-[#C87A28] text-white'
                      : 'bg-[#EBE0D0] text-[#7A6A5E]'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-bold text-[#2C241E]">{t.deliveryOption}</div>
                  <div className="text-[11px] text-[#7A6A5E]">{t.deliveryOptionDesc}</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                  deliveryMethod === 'pickup'
                    ? 'border-[#C87A28] bg-white ring-2 ring-[#C87A28]/20 shadow-xs'
                    : 'border-[#E8DEC8] bg-[#F5ECE0]/50 text-[#5C4D43]'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    deliveryMethod === 'pickup'
                      ? 'bg-[#C87A28] text-white'
                      : 'bg-[#EBE0D0] text-[#7A6A5E]'
                  }`}
                >
                  <Store className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-bold text-[#2C241E]">{t.pickupOption}</div>
                  <div className="text-[11px] text-[#7A6A5E]">{t.pickupOptionDesc}</div>
                </div>
              </button>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#2C241E] uppercase tracking-wider block">
              {t.customerInfoTitle}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-[#5C4D43] font-medium mb-1 block">
                  {t.fullNameLabel} <span className="text-[#DC2626]">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder={lang === 'zh' ? '例：王小明' : 'Ví dụ: Nguyễn Văn An'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5C6B1] bg-white text-xs sm:text-sm text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#C87A28]"
                />
              </div>

              <div>
                <span className="text-[11px] text-[#5C4D43] font-medium mb-1 block">
                  {t.phoneLabel} <span className="text-[#DC2626]">*</span>
                </span>
                <input
                  type="tel"
                  required
                  placeholder={lang === 'zh' ? '例：0908 123 456' : 'Ví dụ: 0908 123 456'}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5C6B1] bg-white text-xs sm:text-sm text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#C87A28]"
                />
              </div>
            </div>

            {deliveryMethod === 'delivery' && (
              <div>
                <span className="text-[11px] text-[#5C4D43] font-medium mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C87A28]" />
                  {t.addressLabel} <span className="text-[#DC2626]">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder={lang === 'zh' ? '例：西貢第一郡百達街 123 號 4 樓' : 'Ví dụ: 123 Pasteur, Phường Bến Nghé, Quận 1, TP.HCM'}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5C6B1] bg-white text-xs sm:text-sm text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#C87A28]"
                />
              </div>
            )}
          </div>

          {/* Delivery Time */}
          <div>
            <label className="text-xs font-bold text-[#2C241E] uppercase tracking-wider mb-2 block">
              {t.deliveryTimeTitle}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryTime('now')}
                className={`p-2.5 rounded-lg border text-left text-xs font-semibold transition-all cursor-pointer ${
                  deliveryTime === 'now'
                    ? 'border-[#C87A28] bg-white text-[#2C241E] ring-2 ring-[#C87A28]/20'
                    : 'border-[#E8DEC8] bg-[#F5ECE0]/50 text-[#5C4D43]'
                }`}
              >
                {t.deliverNow}
              </button>
              <button
                type="button"
                onClick={() => setDeliveryTime('schedule')}
                className={`p-2.5 rounded-lg border text-left text-xs font-semibold transition-all cursor-pointer ${
                  deliveryTime === 'schedule'
                    ? 'border-[#C87A28] bg-white text-[#2C241E] ring-2 ring-[#C87A28]/20'
                    : 'border-[#E8DEC8] bg-[#F5ECE0]/50 text-[#5C4D43]'
                }`}
              >
                {t.deliverSchedule}
              </button>
            </div>
            {deliveryTime === 'schedule' && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-[#5C4D43]">{lang === 'zh' ? '選擇時間：' : 'Chọn giờ:'}</span>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="px-3 py-1.5 border border-[#D5C6B1] rounded-lg bg-white text-xs font-bold font-mono"
                />
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-xs font-bold text-[#2C241E] uppercase tracking-wider mb-2 block">
              {t.paymentMethodTitle}
            </label>
            <div className="space-y-2">
              {[
                {
                  id: 'cod',
                  title: t.codTitle,
                  desc: t.codDesc,
                  icon: Banknote,
                },
                {
                  id: 'vietqr',
                  title: t.vietqrTitle,
                  desc: t.vietqrDesc,
                  icon: QrCode,
                },
                {
                  id: 'momo',
                  title: t.momoTitle,
                  desc: t.momoDesc,
                  icon: CheckCircle2,
                },
              ].map((pm) => {
                const Icon = pm.icon;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as 'cod' | 'vietqr' | 'momo')}
                    className={`w-full p-3 rounded-xl border flex items-center gap-3 transition-all cursor-pointer text-left ${
                      paymentMethod === pm.id
                        ? 'border-[#C87A28] bg-white ring-2 ring-[#C87A28]/20'
                        : 'border-[#E8DEC8] bg-[#F5ECE0]/40 text-[#5C4D43]'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        paymentMethod === pm.id
                          ? 'bg-[#C87A28] text-white'
                          : 'bg-[#EBE0D0] text-[#7A6A5E]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs sm:text-sm font-bold text-[#2C241E]">
                        {pm.title}
                      </div>
                      <div className="text-[11px] text-[#7A6A5E]">{pm.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* If VietQR Selected */}
          {paymentMethod === 'vietqr' && (
            <div className="p-4 bg-white rounded-xl border border-[#C87A28]/40 shadow-xs flex flex-col sm:flex-row items-center gap-4">
              <div className="w-28 h-28 bg-[#FAF7F2] p-2 rounded-lg border border-[#D5C6B1] shrink-0 flex flex-col items-center justify-center text-center">
                <QrCode className="w-16 h-16 text-[#2C241E]" />
                <span className="text-[9px] font-bold text-[#C87A28] uppercase mt-1">
                  VietQR Napas247
                </span>
              </div>
              <div className="space-y-1 text-xs text-[#5C4D43] flex-1">
                <div className="font-bold text-[#2C241E] text-sm">
                  {lang === 'zh' ? '越南軍隊商業銀行 (MB Bank)' : 'Ngân Hàng MB Bank (Quân Đội)'}
                </div>
                <div>
                  {lang === 'zh' ? '帳號：' : 'Số tài khoản: '}{' '}
                  <strong className="text-[#2C241E] font-mono tracking-wider">
                    0908123456888
                  </strong>
                </div>
                <div>{lang === 'zh' ? '戶名：TIEM BANH MI CO BA' : 'Chủ TK: TIEM BANH MI CO BA'}</div>
                <div>
                  {lang === 'zh' ? '付款金額：' : 'Số tiền: '}{' '}
                  <strong className="text-[#C87A28] font-mono font-bold">
                    {formatVND(total)}
                  </strong>
                </div>
                <div className="text-[11px] text-[#7A6A5E] italic">
                  {lang === 'zh'
                    ? '* 完成手機銀行轉帳後，系統將立即自動為您確認出餐。'
                    : '* Hệ thống sẽ tự động xác nhận đơn ngay khi quý khách hoàn tất giao dịch.'}
                </div>
              </div>
            </div>
          )}

          {/* Extra Notes */}
          <div>
            <label className="text-xs font-bold text-[#2C241E] uppercase tracking-wider mb-1 block">
              {t.orderNoteTitle}
            </label>
            <input
              type="text"
              placeholder={t.orderNotePlaceholder}
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5C6B1] bg-white text-xs sm:text-sm text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#C87A28]"
            />
          </div>

          {/* Order Summary Recap */}
          <div className="p-4 bg-[#F5ECE0] rounded-xl border border-[#E8DEC8] space-y-1.5 text-xs text-[#5C4D43]">
            <div className="flex justify-between">
              <span>{lang === 'zh' ? '餐點數量：' : 'Số lượng món:'}</span>
              <span className="font-mono tabular-nums font-semibold text-[#2C241E]">
                {items.reduce((s, i) => s + i.quantity, 0)} {lang === 'zh' ? '份' : 'món'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{t.subtotal}:</span>
              <span className="font-mono tabular-nums font-semibold text-[#2C241E]">
                {formatVND(subtotal)}
              </span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#DC2626]">
                <span>{t.discount}:</span>
                <span className="font-mono tabular-nums font-semibold">
                  -{formatVND(discountAmount)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span>{t.deliveryFee}:</span>
              <span className="font-mono tabular-nums font-semibold">
                {deliveryFee === 0 ? (
                  <span className="text-[#1E3A2F]">{t.freeShipping}</span>
                ) : (
                  formatVND(deliveryFee)
                )}
              </span>
            </div>
            <div className="pt-2 border-t border-[#D5C6B1] flex justify-between items-baseline">
              <span className="text-sm font-bold text-[#2C241E]">{t.totalPayment}:</span>
              <span className="text-xl font-extrabold text-[#C87A28] font-mono tabular-nums">
                {formatVND(total)}
              </span>
            </div>
          </div>

          {/* Trust badge */}
          <div className="flex items-center gap-2 text-xs text-[#7A6A5E] justify-center">
            <ShieldCheck className="w-4 h-4 text-[#1E3A2F]" />
            <span>{t.orderTrust}</span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-lg bg-[#C87A28] text-white font-bold text-sm sm:text-base hover:bg-[#B3681D] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#C87A28]/20 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>{lang === 'zh' ? '正在為您成立訂單...' : 'Đang Xử Lý Đơn Hàng...'}</span>
            ) : (
              <span>{t.confirmOrderBtn} ({formatVND(total)})</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
