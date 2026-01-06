import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { storeConfig } from '@/data/products';

interface Map2GISProps {
  onAddressSelect: (address: string, isInZone: boolean) => void;
  selectedAddress?: string;
}

export const Map2GIS = ({ onAddressSelect, selectedAddress }: Map2GISProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [address, setAddress] = useState(selectedAddress || '');
  const [isInDeliveryZone, setIsInDeliveryZone] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  // Simulated address suggestions for Astana
  const astanaAddresses = [
    'Астана, пр. Республики 1',
    'Астана, пр. Республики 15',
    'Астана, ул. Кенесары 40',
    'Астана, ул. Кенесары 65',
    'Астана, пр. Мангилик Ел 55',
    'Астана, ул. Сарыарка 12',
    'Астана, ул. Сыганак 25',
    'Астана, ул. Достык 5',
    'Астана, ул. Туран 37',
    'Астана, ул. Кабанбай батыра 11',
    'Астана, ул. Акмешит 7',
    'Астана, ул. Иманова 19',
    'Астана, Ақмола 58',
  ];

  const handleAddressChange = (value: string) => {
    setAddress(value);
    
    if (value.length > 2) {
      const filtered = astanaAddresses.filter(addr => 
        addr.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectAddress = (addr: string) => {
    setAddress(addr);
    setShowSuggestions(false);
    
    // Check if address is in delivery zone (simplified check)
    const inZone = addr.toLowerCase().includes('астана');
    setIsInDeliveryZone(inZone);
    onAddressSelect(addr, inZone);
  };

  const getCurrentLocation = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we'd reverse geocode this
          const simulatedAddress = 'Астана, пр. Мангилик Ел 55';
          setAddress(simulatedAddress);
          setIsInDeliveryZone(true);
          onAddressSelect(simulatedAddress, true);
          setIsLocating(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setIsLocating(false);
        }
      );
    } else {
      setIsLocating(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Address Input */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Введите адрес доставки"
              value={address}
              onChange={(e) => handleAddressChange(e.target.value)}
              onFocus={() => address.length > 2 && setShowSuggestions(true)}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="h-12 w-12 rounded-xl"
            onClick={getCurrentLocation}
            disabled={isLocating}
          >
            <Navigation className={`h-5 w-5 ${isLocating ? 'animate-pulse' : ''}`} />
          </Button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-20 w-full mt-2 bg-card rounded-xl border border-border shadow-lg overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => selectAddress(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors flex items-center gap-3"
              >
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map Placeholder with 2GIS branding */}
      <div 
        ref={mapRef}
        className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden bg-secondary/30 border border-border"
      >
        {/* Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-muted/50">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Store Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center animate-bounce-gentle">
            <span className="text-2xl">🏪</span>
          </div>
          <div className="mt-2 px-3 py-1 bg-card rounded-lg shadow-md text-xs font-medium">
            {storeConfig.address}
          </div>
        </div>

        {/* Delivery Zone Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-primary/30 bg-primary/5" />

        {/* 2GIS Attribution */}
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-card/90 rounded text-xs text-muted-foreground">
          © 2GIS
        </div>
      </div>

      {/* Delivery Zone Status */}
      {address && (
        <div className={`flex items-center gap-2 p-3 rounded-xl ${
          isInDeliveryZone 
            ? 'bg-success/10 border border-success/20' 
            : 'bg-destructive/10 border border-destructive/20'
        }`}>
          {isInDeliveryZone ? (
            <>
              <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                <MapPin className="h-3 w-3 text-success" />
              </div>
              <span className="text-sm text-success font-medium">
                Адрес в зоне доставки
              </span>
            </>
          ) : (
            <>
              <AlertCircle className="h-5 w-5 text-destructive" />
              <span className="text-sm text-destructive font-medium">
                Адрес вне зоны доставки ({storeConfig.deliveryRadius} км)
              </span>
            </>
          )}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Зона доставки: {storeConfig.deliveryRadius} км от магазина ({storeConfig.address})
      </p>
    </div>
  );
};
