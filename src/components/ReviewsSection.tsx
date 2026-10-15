import React from 'react';
import { Star } from 'lucide-react';
import { REVIEWS } from '../data/menuData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold text-[#C87A28] uppercase tracking-wider mb-2">
            Đánh Giá & Trải Nghiệm Thật
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2C241E] tracking-tight mb-3">
            Khách Hàng Nói Gì Về Bánh Mì Cô Ba
          </h2>
          <p className="text-sm sm:text-base text-[#6E5D4F]">
            Hơn 1.800+ đánh giá 5 sao từ thực khách yêu mến hương vị bánh mì truyền thống khắp Sài Gòn và Hà Nội.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl border border-[#E8DEC8] p-6 shadow-2xs flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C87A28] text-[#C87A28]" />
                  ))}
                  <span className="text-xs text-[#7A6A5E] ml-2 font-mono tabular-nums">
                    5.0 / 5.0
                  </span>
                </div>

                {/* Comment quote */}
                <p className="text-xs sm:text-sm text-[#4A3B32] leading-relaxed mb-4">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author & Dish */}
              <div className="pt-4 border-t border-[#F2EAE0]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-[#2C241E]">{review.name}</div>
                    <div className="text-[11px] text-[#7A6A5E]">{review.role}</div>
                  </div>
                  <span className="text-[11px] text-[#8E7E73]">{review.date}</span>
                </div>
                <div className="mt-2 text-[11px] text-[#C87A28] font-medium">
                  Món đã dùng: {review.dish}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
