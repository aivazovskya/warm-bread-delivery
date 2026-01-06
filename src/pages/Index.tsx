import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CategoriesSection } from '@/components/CategoriesSection';
import { ProductsGrid } from '@/components/ProductsGrid';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { Truck, Clock, CreditCard, Headphones } from 'lucide-react';

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const features = [
    { icon: Truck, title: 'Быстрая доставка', desc: 'От 30 минут' },
    { icon: Clock, title: 'Работаем с 8:00 до 22:00', desc: 'Каждый день' },
    { icon: CreditCard, title: 'Kaspi Pay & QR', desc: 'Удобная оплата' },
    { icon: Headphones, title: 'Поддержка 24/7', desc: '+7 777 123 45 67' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header onCartClick={() => setCartOpen(true)} onSearchChange={setSearchQuery} />
      
      <main>
        <HeroSection onOrderClick={() => setSelectedCategory(null)} />
        
        <CategoriesSection
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Popular Products */}
        {!selectedCategory && !searchQuery && (
          <ProductsGrid
            categoryFilter={null}
            searchQuery=""
            showHitsOnly={true}
          />
        )}

        {/* All Products or Filtered */}
        <ProductsGrid
          categoryFilter={selectedCategory}
          searchQuery={searchQuery}
        />

        {/* Features */}
        <section className="py-12 md:py-16 border-t border-border/50">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav onCartClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
};

export default Index;
