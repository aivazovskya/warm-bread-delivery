import { Link } from 'react-router-dom';
import { storeConfig } from '@/data/products';
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle, Send } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <span className="text-xl">🍞</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">{storeConfig.name}</h3>
                <p className="text-xs opacity-70">Доставка продуктов</p>
              </div>
            </div>
            <p className="text-sm opacity-70">
              Свежие продукты с быстрой доставкой по Астане. Работаем для вас каждый день!
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-4">Навигация</h4>
            <nav className="space-y-2">
              <Link to="/" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                Главная
              </Link>
              <Link to="/catalog" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                Каталог
              </Link>
              <Link to="/promotions" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                Акции
              </Link>
              <Link to="/contacts" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                Контакты
              </Link>
              <Link to="/install" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                Установить приложение
              </Link>
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-bold mb-4">Контакты</h4>
            <div className="space-y-3 text-sm opacity-70">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{storeConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href={`tel:${storeConfig.phone.replace(/\s/g, '')}`} className="hover:opacity-100">
                  {storeConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${storeConfig.email}`} className="hover:opacity-100">
                  {storeConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{storeConfig.workingHours}</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://instagram.com/ystyqnan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/77771234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/ystyqnan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h4 className="font-bold mb-4">Оплата</h4>
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-kaspi rounded-lg text-kaspi-foreground font-bold text-sm">
                Kaspi Pay
              </div>
              <div className="px-4 py-2 bg-kaspi rounded-lg text-kaspi-foreground font-bold text-sm">
                Kaspi QR
              </div>
              <div className="px-4 py-2 bg-background/10 rounded-lg font-medium text-sm">
                Наличные
              </div>
            </div>
            <div className="mt-4 text-sm opacity-70">
              <p>Минимальный заказ: {storeConfig.minOrderAmount.toLocaleString()}₸</p>
              <p>Бесплатная доставка от: {storeConfig.freeDeliveryFrom.toLocaleString()}₸</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-background/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm opacity-50">
          <p>© {currentYear} {storeConfig.name}. Все права защищены.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:opacity-100">Политика конфиденциальности</Link>
            <Link to="/terms" className="hover:opacity-100">Условия использования</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
