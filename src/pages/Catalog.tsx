import { useState } from 'react';
import { Header } from '@/components/Header';
import { CategoriesSection } from '@/components/CategoriesSection';
import { ProductsGrid } from '@/components/ProductsGrid';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/products';

const Catalog = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [saleOnly, setSaleOnly] = useState(false);

  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 10000]);
    setInStockOnly(false);
    setSaleOnly(false);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory || inStockOnly || saleOnly || priceRange[0] > 0 || priceRange[1] < 10000;

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setCartOpen(true)} onSearchChange={setSearchQuery} />
      
      <main className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Каталог товаров</h1>
            <p className="text-muted-foreground mt-1">Свежие продукты каждый день</p>
          </div>
          <Button
            variant={showFilters ? "default" : "secondary"}
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Фильтры</span>
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-card rounded-2xl p-6 border border-border/50 mb-6 animate-slide-in-bottom">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Фильтры</h3>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Сбросить
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Категория
                </label>
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Все категории</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground block">
                  Дополнительно
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm">Только в наличии</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saleOnly}
                    onChange={(e) => setSaleOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm">Только со скидкой</span>
                </label>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Цена: {priceRange[0]}₸ - {priceRange[1]}₸
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        <CategoriesSection
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        <ProductsGrid
          categoryFilter={selectedCategory}
          searchQuery={searchQuery}
        />
      </main>

      <Footer />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
};

export default Catalog;
