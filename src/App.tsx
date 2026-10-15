import { useState } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { CustomizerModal } from './components/CustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { BranchesModal } from './components/BranchesModal';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { MENU_ITEMS, EXTRA_TOPPINGS } from './data/menuData';
import { BanhMiItem, CartItem, CustomizationOptions, OrderDetails } from './types';
import { ShoppingBag, Check } from 'lucide-react';
import { formatVND } from './utils/format';
import { Language, ITEM_TRANSLATIONS_ZH } from './data/translations';

export default function App() {
  const [lang, setLang] = useState<Language>('vi');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItemForCustomizer, setSelectedItemForCustomizer] = useState<BanhMiItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBranchesOpen, setIsBranchesOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<OrderDetails | null>(null);

  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Quick toast feedback when adding to cart
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (
    item: BanhMiItem,
    quantity: number,
    customization: CustomizationOptions
  ) => {
    let unitExtra = 0;
    if (customization.pateAmount === 'extra') unitExtra += 5000;
    if (customization.butterAmount === 'extra') unitExtra += 5000;

    EXTRA_TOPPINGS.forEach((extra) => {
      if (customization.extras[extra.id]) {
        unitExtra += extra.price;
      }
    });

    const itemTotal = (item.price + unitExtra) * quantity;
    const cartItemId = `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

    const newCartItem: CartItem = {
      cartItemId,
      item,
      quantity,
      customization,
      itemTotal,
    };

    setCartItems((prev) => [...prev, newCartItem]);
    const name = lang === 'zh' && ITEM_TRANSLATIONS_ZH[item.id] ? ITEM_TRANSLATIONS_ZH[item.id].name : item.name;
    showToast(lang === 'zh' ? `已將 ${quantity} 份「${name}」加入購物車` : `Đã thêm ${quantity}x "${name}" vào giỏ hàng`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((ci) => {
        if (ci.cartItemId === cartItemId) {
          const unitPrice = ci.itemTotal / ci.quantity;
          return {
            ...ci,
            quantity: newQty,
            itemTotal: unitPrice * newQty,
          };
        }
        return ci;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  const handleApplyDiscount = (code: string) => {
    const clean = code.trim().toUpperCase();
    const subtotal = cartItems.reduce((sum, ci) => sum + ci.itemTotal, 0);

    if (clean === 'BANHMI10') {
      const discount = Math.round(subtotal * 0.1);
      setDiscountCode('BANHMI10');
      setDiscountAmount(discount);
      return {
        success: true,
        message: lang === 'zh'
          ? `成功套用 BANHMI10：現折 ${formatVND(discount)} (10%)！`
          : `Áp dụng thành công mã BANHMI10: Giảm ${formatVND(discount)} (10%)!`,
      };
    }

    if (clean === 'FREESHIP') {
      setDiscountCode('FREESHIP');
      setDiscountAmount(15000);
      return {
        success: true,
        message: lang === 'zh'
          ? '成功套用 FREESHIP：減免 15.000₫ 外送運費！'
          : 'Áp dụng thành công mã FREESHIP: Giảm 15.000₫ phí vận chuyển!',
      };
    }

    return {
      success: false,
      message: lang === 'zh' ? '優惠碼無效或已過期。' : 'Mã giảm giá không hợp lệ hoặc đã hết lượt sử dụng.',
    };
  };

  const handleOrderSuccess = (order: OrderDetails) => {
    setActiveOrder(order);
    setCartItems([]);
    setDiscountCode('');
    setDiscountAmount(0);
    setIsTrackerOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.itemTotal, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C241E]">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#1E3A2F] text-white px-4 py-3 rounded-xl shadow-lg border border-[#2D5A49] flex items-center gap-2.5 text-xs sm:text-sm animate-in slide-in-from-top-4 duration-150">
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        lang={lang}
        onToggleLang={setLang}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBranches={() => setIsBranchesOpen(true)}
        onScrollToMenu={() => scrollToSection('menu')}
        onScrollToAbout={() => scrollToSection('about')}
        onScrollToReviews={() => scrollToSection('reviews')}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroBanner
          lang={lang}
          onExploreMenu={() => scrollToSection('menu')}
          onExploreStory={() => scrollToSection('about')}
        />

        {/* Detailed Menu Section */}
        <MenuSection
          lang={lang}
          items={MENU_ITEMS}
          onSelectItem={(item) => setSelectedItemForCustomizer(item)}
        />

        {/* Dedicated Story & Quality Commitment Section */}
        <AboutSection lang={lang} />

        {/* Reviews Section */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer
        onScrollToMenu={() => scrollToSection('menu')}
        onScrollToAbout={() => scrollToSection('about')}
        onOpenBranches={() => setIsBranchesOpen(true)}
      />

      {/* Floating Bottom Cart Bar on Mobile */}
      {cartCount > 0 && (
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-5 bg-[#2C241E] text-white rounded-xl shadow-2xl flex items-center justify-between font-bold text-sm border border-[#4A3B32] cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#C87A28]" />
                <span className="absolute -top-1.5 -right-2 bg-[#DC2626] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              </div>
              <span>
                {lang === 'zh' ? `查看購物車 (${cartCount} 份)` : `Xem giỏ hàng (${cartCount} món)`}
              </span>
            </div>
            <span className="text-[#C87A28] font-mono tabular-nums text-base">
              {formatVND(cartTotal)}
            </span>
          </button>
        </div>
      )}

      {/* Modals & Drawers */}
      {selectedItemForCustomizer && (
        <CustomizerModal
          lang={lang}
          item={selectedItemForCustomizer}
          isOpen={!!selectedItemForCustomizer}
          onClose={() => setSelectedItemForCustomizer(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartDrawer
        lang={lang}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        discountCode={discountCode}
        onApplyDiscount={handleApplyDiscount}
        discountAmount={discountAmount}
      />

      <CheckoutModal
        lang={lang}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discountAmount={discountAmount}
        onOrderSuccess={handleOrderSuccess}
      />

      <OrderTrackerModal
        lang={lang}
        order={activeOrder}
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        onNewOrder={() => scrollToSection('menu')}
      />

      <BranchesModal
        isOpen={isBranchesOpen}
        onClose={() => setIsBranchesOpen(false)}
      />
    </div>
  );
}
