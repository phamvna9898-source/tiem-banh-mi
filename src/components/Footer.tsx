import React from 'react';
import { PhoneCall, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onScrollToMenu: () => void;
  onScrollToAbout: () => void;
  onOpenBranches: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToMenu,
  onScrollToAbout,
  onOpenBranches,
}) => {
  return (
    <footer className="bg-[#241D18] text-[#D6C7B2] pt-14 pb-10 border-t border-[#3A2E26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3D3128]">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[#C87A28] font-serif italic text-2xl font-bold">Cô Ba</span>
              <span className="font-extrabold tracking-wider uppercase text-sm border-l border-[#5C4D43] pl-2 text-white">
                Bánh Mì Sài Gòn 1986
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A8988A] leading-relaxed max-w-sm">
              Gìn giữ công thức bánh mì truyền thống Sài Gòn suốt 40 năm.
              Vỏ bánh nướng mới giòn rụm mỗi 15 phút, ngập tràn nhân pâté gan béo ngậy, bơ trứng tươi và đồ chua thanh mát.
            </p>
            <div className="text-xs text-[#8E7E73] space-y-1">
              <div>Giấy chứng nhận VSATTP số: 2849/2021/ATTP-HCM</div>
              <div>Thời gian hoạt động: 06:00 - 22:30 hàng ngày</div>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Khám Phá
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#A8988A]">
              <li>
                <button
                  onClick={onScrollToMenu}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Thực đơn bánh mì đặc biệt
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToAbout}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Bí quyết 40 năm gia truyền
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBranches}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Hệ thống 3 chi nhánh
                </button>
              </li>
              <li>
                <span className="text-[#7A6A5E]">Chính sách giao hàng nóng hổi</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Liên Hệ & Đặt Hàng Nhanh
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-[#A8988A]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C87A28] shrink-0 mt-0.5" />
                <span>182 Lê Thánh Tôn, P. Bến Thành, Quận 1, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#C87A28] shrink-0" />
                <a href="tel:0908123456" className="hover:text-white transition-colors">
                  Hotline đặt bánh: 0908 123 456
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C87A28] shrink-0" />
                <span>lienhe@banhmicoba.vn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A6A5E]">
          <div>
            © {new Date().getFullYear()} Bánh Mì Cô Ba · Đậm Vị Truyền Thống Việt Nam. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Bánh Mì Thập Cẩm</span>
            <span aria-hidden="true">·</span>
            <span>Heo Quay Da Giòn</span>
            <span aria-hidden="true">·</span>
            <span>Cà Phê Sữa Đá Sài Gòn</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
