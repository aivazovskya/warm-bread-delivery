import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Package, 
  Clock, 
  MapPin, 
  Phone,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  total: number;
  deliveryFee: number;
  address: string;
  items: OrderItem[];
  paymentMethod: string;
}

const Orders = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const orders: Order[] = [
    {
      id: '123456',
      date: '5 января 2026, 14:30',
      status: 'delivered',
      total: 4520,
      deliveryFee: 0,
      address: 'Астана, пр. Республики 15, кв. 42',
      paymentMethod: 'Kaspi Pay',
      items: [
        { id: '1', name: 'Хлеб белый нарезной', price: 320, quantity: 2, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=100' },
        { id: '5', name: 'Молоко 2.5%', price: 650, quantity: 3, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100' },
        { id: '13', name: 'Яблоки Голден', price: 890, quantity: 2, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100' },
      ],
    },
    {
      id: '123455',
      date: '2 января 2026, 11:15',
      status: 'delivered',
      total: 3150,
      deliveryFee: 500,
      address: 'Астана, ул. Кенесары 40, офис 12',
      paymentMethod: 'Наличные',
      items: [
        { id: '10', name: 'Макароны спагетти', price: 420, quantity: 2, image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=100' },
        { id: '18', name: 'Сок яблочный', price: 590, quantity: 4, image: 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=100' },
      ],
    },
    {
      id: '123457',
      date: '6 января 2026, 10:00',
      status: 'preparing',
      total: 2890,
      deliveryFee: 0,
      address: 'Астана, Ақмола 58',
      paymentMethod: 'Kaspi QR',
      items: [
        { id: '4', name: 'Круассан с шоколадом', price: 380, quantity: 3, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=100' },
        { id: '6', name: 'Кефир 1%', price: 580, quantity: 2, image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=100' },
      ],
    },
  ];

  const getStatusInfo = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return { label: 'Принят', color: 'category', icon: '📋' };
      case 'preparing':
        return { label: 'Собирается', color: 'default', icon: '📦' };
      case 'ready':
        return { label: 'Готов', color: 'hit', icon: '✅' };
      case 'delivered':
        return { label: 'Доставлен', color: 'new', icon: '🎉' };
      case 'cancelled':
        return { label: 'Отменен', color: 'sale', icon: '❌' };
      default:
        return { label: status, color: 'secondary', icon: '📋' };
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setCartOpen(true)} />
      
      <main className="container py-6">
        <Link to="/profile" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Назад в профиль
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Мои заказы</h1>
          
          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { value: 'all', label: 'Все' },
              { value: 'preparing', label: 'Активные' },
              { value: 'delivered', label: 'Доставленные' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === tab.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-bold mb-2">Заказов пока нет</h2>
            <p className="text-muted-foreground mb-6">
              Сделайте первый заказ и он появится здесь
            </p>
            <Link to="/catalog">
              <Button variant="hero">Перейти в каталог</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const isExpanded = expandedOrder === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-card rounded-2xl border border-border/50 overflow-hidden"
                >
                  {/* Order Header */}
                  <button
                    onClick={() => toggleOrder(order.id)}
                    className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                        {statusInfo.icon}
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold">#{order.id}</span>
                          <Badge variant={statusInfo.color as any}>{statusInfo.label}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {order.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-lg">{order.total.toLocaleString()}₸</p>
                        <p className="text-xs text-muted-foreground">{order.items.length} товаров</p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {/* Order Details */}
                  {isExpanded && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-border animate-slide-in-bottom">
                      {/* Items */}
                      <div className="py-4 space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.quantity} × {item.price}₸
                              </p>
                            </div>
                            <span className="font-medium">
                              {(item.price * item.quantity).toLocaleString()}₸
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Order Info */}
                      <div className="py-4 border-t border-border space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <span className="text-sm">{order.address}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">Оплата:</span>
                          <span className="text-sm font-medium">{order.paymentMethod}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Доставка:</span>
                          <span className={order.deliveryFee === 0 ? 'text-success font-medium' : ''}>
                            {order.deliveryFee === 0 ? 'Бесплатно' : `${order.deliveryFee}₸`}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-4 border-t border-border flex gap-3">
                        <Button variant="default" className="flex-1 gap-2">
                          <RefreshCw className="h-4 w-4" />
                          Повторить заказ
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Phone className="h-4 w-4" />
                          Поддержка
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
};

export default Orders;
