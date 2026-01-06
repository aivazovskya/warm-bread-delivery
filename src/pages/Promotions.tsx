import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { ProductCard } from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products';
import { Clock, Percent, Gift, Zap } from 'lucide-react';

const Promotions = () => {
  const [cartOpen, setCartOpen] = useState(false);

  const saleProducts = products.filter(p => p.isSale);
  const hitProducts = products.filter(p => p.isHit);

  const promotionBanners = [
    {
      id: '1',
      title: '-20% на всю выпечку',
      description: 'Свежий хлеб и круассаны по выгодной цене',
      icon: Percent,
      color: 'bg-kaspi',
      endDate: '12 января',
    },
    {
      id: '2',
      title: 'Бесплатная доставка',
      description: 'При заказе от 5000₸',
      icon: Gift,
      color: 'bg-success',
      endDate: 'Постоянно',
    },
    {
      id: '3',
      title: 'Экспресс-доставка 30 мин',
      description: 'Успеем доставить пока горячий',
      icon: Zap,
      color: 'bg-primary',
      endDate: 'Постоянно',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setCartOpen(true)} />
      
      <main className="container py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Акции и скидки</h1>
        <p className="text-muted-foreground mb-8">Выгодные предложения каждый день</p>

        {/* Promotion Banners */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {promotionBanners.map((promo, index) => (
            <div
              key={promo.id}
              className={`${promo.color} rounded-2xl p-6 text-white animate-slide-in-bottom`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <promo.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
                  <Clock className="h-3 w-3" />
                  {promo.endDate}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">{promo.title}</h3>
              <p className="text-sm opacity-90">{promo.description}</p>
            </div>
          ))}
        </div>

        {/* Sale Products */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="sale" className="text-sm px-3 py-1">
              <Percent className="h-4 w-4 mr-1" />
              Скидки
            </Badge>
            <h2 className="text-xl font-bold">Товары со скидкой</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {saleProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-in-bottom"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* Hit Products */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="hit" className="text-sm px-3 py-1">
              🔥 Хиты
            </Badge>
            <h2 className="text-xl font-bold">Популярные товары</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {hitProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-in-bottom"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
};

export default Promotions;
