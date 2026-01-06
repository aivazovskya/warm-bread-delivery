import { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Map2GIS } from '@/components/Map2GIS';
import { useCart } from '@/context/CartContext';
import { storeConfig } from '@/data/products';
import { 
  ArrowLeft, 
  Truck, 
  Store, 
  MapPin, 
  Clock, 
  CreditCard,
  Banknote,
  QrCode,
  CheckCircle2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type DeliveryType = 'delivery' | 'pickup';
type PaymentMethod = 'kaspi-pay' | 'kaspi-qr' | 'cash';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('kaspi-pay');
  const [address, setAddress] = useState('');
  const [isInDeliveryZone, setIsInDeliveryZone] = useState(true);
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [timeSlot, setTimeSlot] = useState('asap');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = deliveryType === 'pickup' ? 0 : (total >= storeConfig.freeDeliveryFrom ? 0 : storeConfig.deliveryFee);
  const grandTotal = total + deliveryFee;

  const timeSlots = [
    { id: 'asap', label: 'Как можно быстрее', desc: '30-60 мин' },
    { id: '12-14', label: '12:00 - 14:00', desc: 'Сегодня' },
    { id: '14-16', label: '14:00 - 16:00', desc: 'Сегодня' },
    { id: '16-18', label: '16:00 - 18:00', desc: 'Сегодня' },
    { id: '18-20', label: '18:00 - 20:00', desc: 'Сегодня' },
  ];

  const handleAddressSelect = (selectedAddress: string, inZone: boolean) => {
    setAddress(selectedAddress);
    setIsInDeliveryZone(inZone);
  };

  const handleSubmit = async () => {
    if (deliveryType === 'delivery') {
      if (!address.trim()) {
        toast.error('Укажите адрес доставки');
        return;
      }
      if (!isInDeliveryZone) {
        toast.error('Адрес находится вне зоны доставки');
        return;
      }
    }
    if (!phone.trim()) {
      toast.error('Укажите номер телефона');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate order submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    clearCart();
    toast.success('Заказ успешно оформлен!');
    navigate('/order-success');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header onCartClick={() => {}} />
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Корзина пуста</h1>
          <p className="text-muted-foreground mb-6">Добавьте товары для оформления заказа</p>
          <Link to="/catalog">
            <Button variant="hero">Перейти к покупкам</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header onCartClick={() => {}} />
      
      <main className="container py-6 md:py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Назад к покупкам
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold mb-8">Оформление заказа</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Type */}
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Способ получения
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setDeliveryType('delivery')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    deliveryType === 'delivery'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Truck className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Доставка</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {total >= storeConfig.freeDeliveryFrom ? 'Бесплатно' : `${storeConfig.deliveryFee}₸`}
                  </p>
                </button>
                <button
                  onClick={() => setDeliveryType('pickup')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    deliveryType === 'pickup'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Store className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Самовывоз</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Бесплатно</p>
                </button>
              </div>
            </div>

            {/* Address / Pickup Point with 2GIS Map */}
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {deliveryType === 'delivery' ? 'Адрес доставки' : 'Пункт самовывоза'}
              </h2>
              
              {deliveryType === 'delivery' ? (
                <Map2GIS 
                  onAddressSelect={handleAddressSelect}
                  selectedAddress={address}
                />
              ) : (
                <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Store className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{storeConfig.address}</p>
                      <p className="text-sm text-muted-foreground">Время работы: {storeConfig.workingHours}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Time Slot */}
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Время {deliveryType === 'delivery' ? 'доставки' : 'получения'}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setTimeSlot(slot.id)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      timeSlot === slot.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <p className="font-semibold text-sm">{slot.label}</p>
                    <p className="text-xs text-muted-foreground">{slot.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <h2 className="text-lg font-bold mb-4">Контактные данные</h2>
              <div className="space-y-4">
                <input
                  type="tel"
                  placeholder="+7 (___) ___ __ __"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <textarea
                  placeholder="Комментарий к заказу (необязательно)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Способ оплаты
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setPaymentMethod('kaspi-pay')}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    paymentMethod === 'kaspi-pay'
                      ? 'border-kaspi bg-kaspi/5'
                      : 'border-border hover:border-kaspi/50'
                  }`}
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-kaspi flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-kaspi-foreground" />
                  </div>
                  <span className="font-semibold text-sm">Kaspi Pay</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('kaspi-qr')}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    paymentMethod === 'kaspi-qr'
                      ? 'border-kaspi bg-kaspi/5'
                      : 'border-border hover:border-kaspi/50'
                  }`}
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-kaspi flex items-center justify-center">
                    <QrCode className="h-5 w-5 text-kaspi-foreground" />
                  </div>
                  <span className="font-semibold text-sm">Kaspi QR</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-secondary flex items-center justify-center">
                    <Banknote className="h-5 w-5 text-foreground" />
                  </div>
                  <span className="font-semibold text-sm">Наличные</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 border border-border/50 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Ваш заказ</h2>
              
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{item.quantity} шт</span>
                        <span>{(item.price * item.quantity).toLocaleString()}₸</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Товары ({items.length})</span>
                  <span>{total.toLocaleString()}₸</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Доставка</span>
                  <span className={deliveryFee === 0 ? 'text-success' : ''}>
                    {deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee}₸`}
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Итого</span>
                <span className="text-primary">{grandTotal.toLocaleString()}₸</span>
              </div>

              <Button
                variant="hero"
                size="xl"
                className="w-full"
                onClick={handleSubmit}
                disabled={isSubmitting || (deliveryType === 'delivery' && !isInDeliveryZone)}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Оформление...
                  </span>
                ) : (
                  <>
                    Подтвердить заказ
                    <CheckCircle2 className="h-5 w-5" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Нажимая кнопку, вы соглашаетесь с условиями обслуживания
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
