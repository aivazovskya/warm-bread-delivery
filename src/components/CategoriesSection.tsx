import { Category } from '@/types';
import { categories } from '@/data/products';

interface CategoriesSectionProps {
  onCategorySelect: (categoryId: string | null) => void;
  selectedCategory: string | null;
}

export const CategoriesSection = ({ onCategorySelect, selectedCategory }: CategoriesSectionProps) => {
  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Категории</h2>
          <button
            onClick={() => onCategorySelect(null)}
            className="text-sm text-primary hover:underline font-medium"
          >
            Все товары
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`group relative flex flex-col items-center p-4 md:p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-md ${
                selectedCategory === category.id
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border/50 bg-card hover:border-primary/50'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="text-4xl md:text-5xl mb-3 transition-transform group-hover:scale-110">
                {category.icon}
              </div>
              <span className="font-semibold text-sm text-center text-foreground">
                {category.name}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                {category.productCount} товаров
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
