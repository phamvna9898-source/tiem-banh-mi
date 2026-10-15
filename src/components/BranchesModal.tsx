import React from 'react';
import { X, MapPin, Clock, PhoneCall, Navigation } from 'lucide-react';
import { BRANCHES } from '../data/menuData';

interface BranchesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BranchesModal: React.FC<BranchesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8DEC8] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E8DEC8] flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#2C241E]">
              Hệ Thống Tiệm Bánh Mì Cô Ba
            </h3>
            <p className="text-xs text-[#7A6A5E]">
              Phục vụ tại chỗ & Giao hàng tận nơi khắp TP. Hồ Chí Minh và Hà Nội
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

        {/* List of branches */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {BRANCHES.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-xl border border-[#E8DEC8] p-4 sm:p-5 shadow-2xs hover:border-[#C87A28] transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="text-sm sm:text-base font-bold text-[#2C241E]">
                  {branch.name}
                </h4>
                <span className="text-[11px] font-semibold text-[#1E3A2F] bg-[#EAF5EF] px-2.5 py-0.5 rounded border border-[#BCE1CC]">
                  {branch.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[#5C4D43] mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#C87A28] shrink-0 mt-0.5" />
                  <span>{branch.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#7A6A5E] shrink-0" />
                  <span>{branch.hours} · Giao hàng trung bình: {branch.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-[#7A6A5E] shrink-0" />
                  <span>Hotline: {branch.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#F2EAE0]">
                <a
                  href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                  className="px-3.5 py-1.5 rounded-lg bg-[#FAF7F2] text-[#2C241E] border border-[#D5C6B1] text-xs font-semibold hover:bg-white transition-colors"
                >
                  Gọi Đặt Bàn / Mang Về
                </a>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[#C87A28] text-white text-xs font-semibold hover:bg-[#B3681D] transition-colors flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Chỉ Đường</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E8DEC8] text-center text-xs text-[#7A6A5E]">
          Mọi thắc mắc về nhượng quyền & đơn hàng số lượng lớn cho công ty xin liên hệ{' '}
          <a href="tel:0908123456" className="font-bold text-[#C87A28] underline">
            0908 123 456
          </a>
        </div>
      </div>
    </div>
  );
};
