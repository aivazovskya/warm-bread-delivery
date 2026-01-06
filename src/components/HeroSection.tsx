import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Truck } from 'lucide-react';
import heroBread from '@/assets/hero-bread.jpg';

interface HeroSectionProps {
  onOrderClick: () => void;
}

export const HeroSection = ({ onOrderClick }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-warm">
      <div className="container py-8 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6 text-center lg:text-left animate-slide-in-bottom">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
              <span className="animate-pulse">🔥</span>
              Доставка за 30 минут
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
              Свежие продукты
              <br />
              <span className="text-gradient">к вашей двери</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
              Свежий хлеб, молочные продукты и всё необходимое — с бесплатной доставкой от 5000₸
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" onClick={onOrderClick}>
                Заказать сейчас
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="xl">
                Смотреть каталог
              </Button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                  <Truck className="h-4 w-4 text-success" />
                </div>
                <span>Бесплатная доставка</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <span>30 мин доставка</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative lg:order-last animate-fade-in">
            <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[16/10]">
              <img
                src={heroBread}
                alt="Свежая выпечка"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 md:left-8 bg-card rounded-2xl p-4 shadow-lg border border-border/50 animate-bounce-gentle">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🥐</div>
                <div>
                  <p className="font-bold text-foreground">Акция дня!</p>
                  <p className="text-sm text-muted-foreground">-20% на выпечку</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
