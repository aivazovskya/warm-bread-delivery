import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { storeConfig } from '@/data/products';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Instagram,
  Send
} from 'lucide-react';

const Contacts = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const contactInfo = [
    { icon: MapPin, label: 'Адрес', value: storeConfig.address },
    { icon: Phone, label: 'Телефон', value: storeConfig.phone, href: `tel:${storeConfig.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: storeConfig.email, href: `mailto:${storeConfig.email}` },
    { icon: Clock, label: 'Режим работы', value: `Ежедневно, ${storeConfig.workingHours}` },
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/ystyqnan', color: 'hover:text-pink-500' },
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/77771234567', color: 'hover:text-green-500' },
    { icon: Send, label: 'Telegram', href: 'https://t.me/ystyqnan', color: 'hover:text-blue-500' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setCartOpen(true)} />
      
      <main className="container py-6 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Контакты</h1>
        <p className="text-muted-foreground mb-8">Свяжитесь с нами любым удобным способом</p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-5 border border-border/50 animate-slide-in-bottom"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-semibold hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-semibold">{item.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <h3 className="font-bold mb-4">Мы в соцсетях</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center transition-colors ${social.color}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-card rounded-2xl p-4 border border-border/50 overflow-hidden">
              <div className="relative w-full h-64 rounded-xl overflow-hidden bg-secondary/30">
                {/* Map placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                    <p className="font-semibold">{storeConfig.address}</p>
                    <a
                      href={`https://2gis.kz/astana/search/${encodeURIComponent(storeConfig.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline mt-2 inline-block"
                    >
                      Открыть в 2GIS →
                    </a>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-card/90 rounded text-xs text-muted-foreground">
                  © 2GIS
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 h-fit">
            <h2 className="text-xl font-bold mb-2">Напишите нам</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Есть вопросы или предложения? Мы ответим в течение часа
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Ваше имя
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Как к вам обращаться?"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Телефон
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+7 (___) ___ __ __"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Сообщение
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Напишите ваш вопрос или предложение..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  required
                />
              </div>

              <Button variant="hero" size="xl" className="w-full" type="submit">
                Отправить сообщение
                <Send className="h-5 w-5" />
              </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
};

export default Contacts;
