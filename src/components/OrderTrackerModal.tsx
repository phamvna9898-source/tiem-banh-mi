import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Clock, ChefHat, Bike, HeartHandshake, PhoneCall } from 'lucide-react';
import { OrderDetails } from '../types';
import { formatVND } from '../utils/format';
import { Language, TRANSLATIONS, ITEM_TRANSLATIONS_ZH } from '../data/translations';

interface OrderTrackerModalProps {
  lang: Language;
  order: OrderDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onNewOrder: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  lang,
  order,
  isOpen,
  onClose,
  onNewOrder,
}) => {
  const t = TRANSLATIONS[lang];
  const [currentStep, setCurrentStep] = useState(1);
  const [minutesRemaining, setMinutesRemaining] = useState(25);

  useEffect(() => {
    if (!isOpen || !order) return;
    setCurrentStep(1);
    setMinutesRemaining(25);

    const timer1 = setTimeout(() => {
      setCurrentStep(2);
      setMinutesRemaining(18);
    }, 4000);

    const timer2 = setTimeout(() => {
      setCurrentStep(3);
      setMinutesRemaining(8);
    }, 12000);

    const countdown = setInterval(() => {
      setMinutesRemaining((prev) => (prev > 1 ? prev - 1 : 1));
    }, 60000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(countdown);
    };
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const steps = [
    {
      num: 1,
      title: t.step1Title,
      desc: t.step1Desc,
      icon: CheckCircle2,
    },
    {
      num: 2,
      title: t.step2Title,
      desc: t.step2Desc,
      icon: ChefHat,
    },
    {
      num: 3,
      title: t.step3Title,
      desc: t.step3Desc,
      icon: Bike,
    },
    {
      num: 4,
      title: t.step4Title,
      desc: t.step4Desc,
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8DEC8] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E8DEC8] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#C87A28] uppercase tracking-wider">
                {t.orderTrackerTitle}
              </span>
              <span className="font-mono font-bold text-sm text-[#2C241E] bg-[#F2EAE0] px-2 py-0.5 rounded">
                #{order.orderId}
              </span>
            </div>
            <p className="text-xs text-[#7A6A5E] mt-0.5">
              {lang === 'zh' ? '建立時間：' : 'Tạo lúc '} {order.createdAt} · {order.customerName}
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

        {/* Scrollable tracker content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Estimated time banner */}
          <div className="bg-[#2C241E] text-white p-5 rounded-xl shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs text-[#C8BAAA] uppercase font-semibold">
                {t.estimatedArrival}
              </div>
              <div className="text-2xl font-extrabold text-[#FAF7F2] font-mono tabular-nums mt-0.5">
                ~ {minutesRemaining} {t.minutesRemainingText}
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#E05D26]">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          {/* Stepper Progress */}
          <div>
            <h4 className="text-xs font-bold text-[#2C241E] uppercase tracking-wider mb-4">
              {lang === 'zh' ? '即時製作與配送進度' : 'Tiến Trình Đơn Hàng'}
            </h4>
            <div className="space-y-4">
              {steps.map((st) => {
                const Icon = st.icon;
                const isPassed = currentStep >= st.num;
                const isCurrent = currentStep === st.num;

                return (
                  <div key={st.num} className="flex items-start gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isCurrent
                          ? 'bg-[#C87A28] text-white ring-4 ring-[#C87A28]/20'
                          : isPassed
                          ? 'bg-[#1E3A2F] text-white'
                          : 'bg-[#E5D7C5] text-[#8E7E73]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 pt-1">
                      <div
                        className={`text-sm font-bold ${
                          isPassed ? 'text-[#2C241E]' : 'text-[#8E7E73]'
                        }`}
                      >
                        {st.title}
                      </div>
                      <div className="text-xs text-[#7A6A5E] mt-0.5">{st.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Details */}
          <div className="bg-white p-4 rounded-xl border border-[#E8DEC8] space-y-2 text-xs text-[#5C4D43]">
            <h4 className="font-bold text-[#2C241E] text-xs uppercase tracking-wider mb-1">
              {lang === 'zh' ? '收件與配送資訊' : 'Thông Tin Giao Nhận'}
            </h4>
            <div>
              <span className="text-[#8E7E73]">{lang === 'zh' ? '地址：' : 'Địa chỉ:'}</span>{' '}
              <strong className="text-[#2C241E]">{order.address}</strong>
            </div>
            <div>
              <span className="text-[#8E7E73]">{lang === 'zh' ? '電話：' : 'Điện thoại:'}</span>{' '}
              <strong className="text-[#2C241E]">{order.phone}</strong>
            </div>
            <div>
              <span className="text-[#8E7E73]">{lang === 'zh' ? '取餐方式：' : 'Hình thức:'}</span>{' '}
              <span className="font-medium">
                {order.deliveryMethod === 'delivery'
                  ? (lang === 'zh' ? '外送到府' : 'Giao tận nơi')
                  : (lang === 'zh' ? '門市自取' : 'Nhận tại tiệm')}
              </span>
            </div>
          </div>

          {/* Ordered items breakdown */}
          <div className="bg-white p-4 rounded-xl border border-[#E8DEC8] space-y-2 text-xs text-[#5C4D43]">
            <h4 className="font-bold text-[#2C241E] text-xs uppercase tracking-wider mb-2">
              {lang === 'zh' ? '訂單餐點明細' : 'Danh Sách Món'} ({order.items.reduce((s, i) => s + i.quantity, 0)})
            </h4>
            <div className="space-y-2 divide-y divide-[#F2EAE0]">
              {order.items.map((ci) => {
                const itemName =
                  lang === 'zh' && ITEM_TRANSLATIONS_ZH[ci.item.id]
                    ? ITEM_TRANSLATIONS_ZH[ci.item.id].name
                    : ci.item.name;

                return (
                  <div key={ci.cartItemId} className="pt-2 first:pt-0 flex justify-between gap-2">
                    <div>
                      <span className="font-bold text-[#2C241E]">
                        {ci.quantity}x {itemName}
                      </span>
                      {ci.customization.spiciness !== 'mild' && (
                        <span className="text-[#C87A28] ml-1">
                          ({ci.customization.spiciness === 'none' ? t.spicyNone : t.spicyHot})
                        </span>
                      )}
                    </div>
                    <span className="font-mono font-bold text-[#2C241E] tabular-nums shrink-0">
                      {formatVND(ci.itemTotal)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#E8DEC8] flex justify-between font-bold text-sm text-[#2C241E]">
              <span>{t.totalPayment}:</span>
              <span className="text-[#C87A28] font-mono tabular-nums text-base">
                {formatVND(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E8DEC8] flex items-center justify-between gap-3">
          <a
            href="tel:0908123456"
            className="px-4 py-2.5 rounded-lg border border-[#D5C6B1] text-xs font-semibold text-[#4A3B32] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#C87A28]" />
            <span>{t.callSupportBtn}</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onNewOrder();
            }}
            className="flex-1 py-2.5 px-4 rounded-lg bg-[#2C241E] text-white text-xs sm:text-sm font-bold hover:bg-[#C87A28] transition-colors cursor-pointer"
          >
            {t.orderMoreBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
