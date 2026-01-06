import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Package, 
  Heart, 
  Settings, 
  LogOut,
  ChevronRight,
  Edit2,
  Plus,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock user data
  const user = {
    name: 'Алия Сериккызы',
    phone: '+7 777 123 45 67',
    email: 'aliya@example.com',
    addresses: [
      { id: '1', address: 'Астана, пр. Республики 15, кв. 42', isDefault: true },
      { id: '2', address: 'Астана, ул. Кенесары 40, офис 12', isDefault: false },
    ],
  };

  const recentOrders = [
    { id: '123456', date: '5 янв 2026', status: 'delivered', total: 4520, items: 5 },
    { id: '123455', date: '2 янв 2026', status: 'delivered', total: 3150, items: 3 },
    { id: '123454', date: '28 дек 2025', status: 'delivered', total: 6780, items: 8 },
  ];

  const menuItems = [
    { icon: Package, label: 'Мои заказы', href: '/orders', badge: '3' },
    { icon: Heart, label: 'Избранное', href: '/favorites', badge: null },
    { icon: MapPin, label: 'Адреса доставки', href: '/addresses', badge: null },
    { icon: Settings, label: 'Настройки', href: '/settings', badge: null },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge variant="new">Доставлен</Badge>;
      case 'preparing':
        return <Badge variant="default">Готовится</Badge>;
      case 'pending':
        return <Badge variant="category">Новый</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header onCartClick={() => setCartOpen(true)} />
        
        <main className="container py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
              <User className="w-12 h-12 text-muted-foreground" />
            </div>
            
            <h1 className="text-2xl font-bold mb-3">Войдите в аккаунт</h1>
            <p className="text-muted-foreground mb-8">
              Чтобы отслеживать заказы, сохранять адреса и получать персональные скидки
            </p>

            <div className="space-y-4">
              <Button variant="hero" size="xl" className="w-full" onClick={() => setIsLoggedIn(true)}>
                Войти по номеру телефона
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Войти через Kaspi
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              Продолжая, вы соглашаетесь с условиями использования сервиса
            </p>
          </div>
        </main>

        <Footer />
        <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setCartOpen(true)} />
      
      <main className="container py-6">
        {/* Profile Header */}
        <div className="bg-card rounded-2xl p-6 border border-border/50 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">АС</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">{user.name}</h1>
                <p className="text-sm text-muted-foreground">{user.phone}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-xs text-muted-foreground">заказов</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">45 000₸</p>
              <p className="text-xs text-muted-foreground">потрачено</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">5%</p>
              <p className="text-xs text-muted-foreground">скидка</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Menu */}
          <div className="md:col-span-1 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center justify-between p-4 bg-card rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <Badge variant="default" className="h-5 min-w-[20px] text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
            ))}

            <button
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center gap-3 w-full p-4 bg-card rounded-xl border border-border/50 hover:border-destructive/30 text-destructive transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <LogOut className="h-5 w-5" />
              </div>
              <span className="font-medium">Выйти</span>
            </button>
          </div>

          {/* Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Addresses */}
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Адреса доставки</h2>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Добавить
                </Button>
              </div>

              <div className="space-y-3">
                {user.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`flex items-start gap-3 p-4 rounded-xl border ${
                      addr.isDefault ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm">{addr.address}</p>
                      {addr.isDefault && (
                        <span className="text-xs text-primary font-medium">По умолчанию</span>
                      )}
                    </div>
                    <Button variant="ghost" size="icon-sm">
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Последние заказы</h2>
                <Link to="/orders">
                  <Button variant="ghost" size="sm">
                    Все заказы
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    to={`/orders/${order.id}`}
                    className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Заказ #{order.id}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {order.date}
                          <span>•</span>
                          {order.items} товаров
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(order.status)}
                      <p className="text-sm font-bold mt-1">{order.total.toLocaleString()}₸</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
};

export default Profile;
