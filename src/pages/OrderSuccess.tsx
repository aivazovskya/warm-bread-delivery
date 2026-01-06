import { Button } from '@/components/ui/button';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center animate-scale-in">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3 animate-slide-in-bottom">
          Заказ оформлен!
        </h1>
        
        <p className="text-muted-foreground mb-6 animate-slide-in-bottom" style={{ animationDelay: '100ms' }}>
          Спасибо за заказ! Мы уже начали его собирать.
        </p>

        <div className="bg-card rounded-2xl p-6 border border-border/50 mb-6 animate-slide-in-bottom" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">Заказ #{orderNumber}</span>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Статус</span>
              <span className="text-primary font-medium">Принят</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Время доставки</span>
              <span>30-60 мин</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 animate-slide-in-bottom" style={{ animationDelay: '300ms' }}>
          <Link to="/" className="block">
            <Button variant="hero" size="xl" className="w-full">
              Продолжить покупки
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          
          <p className="text-xs text-muted-foreground">
            Мы отправим вам уведомление о готовности заказа
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
