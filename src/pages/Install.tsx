import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Smartphone, 
  Share, 
  Plus, 
  Check,
  Apple,
  Wifi,
  Bell,
  Zap
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Install = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Check for iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const features = [
    { icon: Zap, title: 'Быстрый доступ', desc: 'Открывайте приложение одним нажатием' },
    { icon: Wifi, title: 'Работает офлайн', desc: 'Просматривайте каталог без интернета' },
    { icon: Bell, title: 'Уведомления', desc: 'Получайте статусы заказов мгновенно' },
    { icon: Smartphone, title: 'Как настоящее приложение', desc: 'Полноэкранный режим без браузера' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setCartOpen(true)} />
      
      <main className="container py-8 md:py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Hero */}
          <div className="mb-8 animate-slide-in-bottom">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary to-accent shadow-lg flex items-center justify-center">
              <span className="text-5xl">🍞</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Установите Ыстық нан
            </h1>
            <p className="text-lg text-muted-foreground">
              Добавьте приложение на главный экран для быстрого доступа к заказам
            </p>
          </div>

          {/* Install Status */}
          {isInstalled ? (
            <div className="p-6 bg-success/10 rounded-2xl border border-success/20 mb-8 animate-scale-in">
              <div className="flex items-center justify-center gap-3 text-success">
                <Check className="h-6 w-6" />
                <span className="text-lg font-bold">Приложение установлено!</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Найдите «Ыстық нан» на главном экране вашего устройства
              </p>
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              {/* Android / Desktop Install */}
              {deferredPrompt && (
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="w-full max-w-sm gap-3"
                  onClick={handleInstall}
                >
                  <Download className="h-5 w-5" />
                  Установить приложение
                </Button>
              )}

              {/* iOS Instructions */}
              {isIOS && (
                <div className="p-6 bg-card rounded-2xl border border-border/50 text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <Apple className="h-6 w-6" />
                    <span className="font-bold">Установка на iPhone/iPad</span>
                  </div>
                  
                  <ol className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Нажмите «Поделиться»</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Share className="h-4 w-4" /> в нижней панели Safari
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Выберите «На экран Домой»</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Plus className="h-4 w-4" /> прокрутите вниз в меню
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Нажмите «Добавить»</p>
                        <p className="text-sm text-muted-foreground">
                          Приложение появится на главном экране
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              )}

              {/* Generic Instructions */}
              {!deferredPrompt && !isIOS && (
                <div className="p-6 bg-card rounded-2xl border border-border/50">
                  <p className="text-muted-foreground">
                    Откройте эту страницу в браузере Chrome или Safari на мобильном устройстве
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-4 bg-card rounded-xl border border-border/50 text-left animate-slide-in-bottom"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
};

export default Install;
