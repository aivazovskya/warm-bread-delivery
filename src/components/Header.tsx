import { ShoppingCart, Menu, Search, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onCartClick: () => void;
  onSearchChange?: (query: string) => void;
}

export const Header = ({ onCartClick, onSearchChange }: HeaderProps) => {
  const { itemCount, total } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero shadow-md">
            <span className="text-xl">🍞</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold leading-tight text-foreground">Ыстық нан</h1>
            <p className="text-xs text-muted-foreground">Доставка продуктов</p>
          </div>
        </Link>

        {/* Location */}
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
          <MapPin className="h-4 w-4 text-primary" />
          <span>Алматы, ул. Абая 150</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4">
          {searchOpen ? (
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full h-10 pl-10 pr-10 rounded-full border border-border bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                autoFocus
              />
              <button
                onClick={() => {
                  setSearchOpen(false);
                  handleSearch('');
                }}
                className="absolute right-3"
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 h-10 px-4 rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary transition-colors w-full md:w-auto"
            >
              <Search className="h-4 w-4" />
              <span className="hidden md:inline text-sm">Поиск товаров...</span>
            </button>
          )}
        </div>

        {/* Cart Button */}
        <Button
          variant="cart"
          size="lg"
          className="gap-3 pl-4 pr-5"
          onClick={onCartClick}
        >
          <div className="relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge
                variant="sale"
                className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-[10px]"
              >
                {itemCount}
              </Badge>
            )}
          </div>
          <span className="hidden sm:inline font-bold">
            {total > 0 ? `${total.toLocaleString()}₸` : 'Корзина'}
          </span>
        </Button>
      </div>
    </header>
  );
};
