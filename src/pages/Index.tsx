import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CategoriesSection } from '@/components/CategoriesSection';
import { ProductsGrid } from '@/components/ProductsGrid';
import { CartDrawer } from '@/components/CartDrawer';
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
    <div className="min-h-screen bg-background">
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

        {/* Footer */}
        <footer className="bg-foreground text-background py-12">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                    <span className="text-xl">🍞</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Ыстық нан</h3>
                    <p className="text-xs opacity-70">Доставка продуктов</p>
                  </div>
                </div>
                <p className="text-sm opacity-70">
                  Свежие продукты с быстрой доставкой по Алматы. Работаем для вас каждый день!
                </p>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Контакты</h4>
                <div className="space-y-2 text-sm opacity-70">
                  <p>📍 г. Алматы, ул. Абая 150</p>
                  <p>📞 +7 777 123 45 67</p>
                  <p>✉️ info@ystyqnan.kz</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Оплата</h4>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-kaspi rounded-lg text-kaspi-foreground font-bold text-sm">
                    Kaspi Pay
                  </div>
                  <div className="px-4 py-2 bg-kaspi rounded-lg text-kaspi-foreground font-bold text-sm">
                    Kaspi QR
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-background/20 text-center text-sm opacity-50">
              © 2026 Ыстық нан. Все права защищены.
            </div>
          </div>
        </footer>
      </main>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
};

export default Index;
