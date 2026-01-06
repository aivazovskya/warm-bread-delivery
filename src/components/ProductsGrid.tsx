import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { products, categories } from '@/data/products';
import { useMemo } from 'react';

interface ProductsGridProps {
  categoryFilter: string | null;
  searchQuery: string;
  showHitsOnly?: boolean;
}

export const ProductsGrid = ({ categoryFilter, searchQuery, showHitsOnly }: ProductsGridProps) => {
  const filteredProducts = useMemo(() => {
    let result = products;

    if (showHitsOnly) {
      result = result.filter((p) => p.isHit || p.isSale);
    }

    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.nameKz?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [categoryFilter, searchQuery, showHitsOnly]);

  const categoryName = categoryFilter
    ? categories.find((c) => c.id === categoryFilter)?.name
    : null;

  return (
    <section className="py-8 md:py-12 bg-gradient-warm">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {showHitsOnly
              ? 'Популярные товары'
              : categoryName || 'Все товары'}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredProducts.length} товаров
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-lg text-muted-foreground">Товары не найдены</p>
            <p className="text-sm text-muted-foreground mt-2">
              Попробуйте изменить параметры поиска
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-in-bottom"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
