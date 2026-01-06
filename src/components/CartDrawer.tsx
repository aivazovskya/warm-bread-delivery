import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const deliveryFee = total >= 5000 ? 0 : 500;
  const grandTotal = total + deliveryFee;
  const minOrderAmount = 2000;
  const canOrder = total >= minOrderAmount;

  const handleCheckout = () => {
    onOpenChange(false);
    navigate('/checkout');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="p-6 pb-4 border-b border-border">
          <SheetTitle className="flex items-center justify-between">
            <span className="text-xl font-bold">Корзина</span>
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
                onClick={clearCart}
              >
                Очистить
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Корзина пуста
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Добавьте товары, чтобы оформить заказ
            </p>
            <Button variant="default" onClick={() => onOpenChange(false)}>
              Перейти к покупкам
            </Button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-card rounded-xl border border-border/50"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-sm line-clamp-2">
                      {item.name}
                    </h4>
                    {item.weight && (
                      <span className="text-xs text-muted-foreground">{item.weight}</span>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-foreground">
                        {(item.price * item.quantity).toLocaleString()}₸
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="secondary"
                          size="icon-sm"
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="secondary"
                          size="icon-sm"
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="h-7 w-7 rounded-full text-muted-foreground hover:text-destructive ml-1"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border p-4 space-y-4 bg-card">
              {/* Delivery info */}
              {deliveryFee > 0 ? (
                <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <span className="text-muted-foreground">
                    До бесплатной доставки
                  </span>
                  <Badge variant="category">
                    еще {(5000 - total).toLocaleString()}₸
                  </Badge>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-sm p-3 rounded-lg bg-success/10 border border-success/20">
                  <span className="text-success font-medium">✓ Бесплатная доставка</span>
                </div>
              )}

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Товары</span>
                  <span className="font-medium">{total.toLocaleString()}₸</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span className={deliveryFee === 0 ? 'text-success font-medium' : 'font-medium'}>
                    {deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee}₸`}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-bold text-lg">Итого</span>
                  <span className="font-bold text-lg text-primary">
                    {grandTotal.toLocaleString()}₸
                  </span>
                </div>
              </div>

              {/* Checkout button */}
              {!canOrder && (
                <p className="text-xs text-center text-muted-foreground">
                  Минимальная сумма заказа: {minOrderAmount.toLocaleString()}₸
                </p>
              )}
              <Button
                variant="hero"
                size="xl"
                className="w-full"
                disabled={!canOrder}
                onClick={handleCheckout}
              >
                Оформить заказ
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
