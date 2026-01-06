import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Percent, User, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';

interface BottomNavProps {
  onCartClick: () => void;
}

export const BottomNav = ({ onCartClick }: BottomNavProps) => {
  const location = useLocation();
  const { itemCount } = useCart();

  const navItems = [
    { icon: Home, label: 'Главная', href: '/' },
    { icon: Search, label: 'Каталог', href: '/catalog' },
    { icon: Percent, label: 'Акции', href: '/promotions' },
    { icon: User, label: 'Профиль', href: '/profile' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur border-t border-border md:hidden safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              isActive(item.href)
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
        
        {/* Cart Button */}
        <button
          onClick={onCartClick}
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors relative"
        >
          <div className="relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge
                variant="sale"
                className="absolute -top-1 -right-2 h-4 min-w-[16px] p-0 flex items-center justify-center text-[10px]"
              >
                {itemCount}
              </Badge>
            )}
          </div>
          <span className="text-xs font-medium">Корзина</span>
        </button>
      </div>
    </nav>
  );
};
