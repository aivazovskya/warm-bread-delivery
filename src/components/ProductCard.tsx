import { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { items, addItem, updateQuantity } = useCart();
  
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="group relative bg-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:scale-[1.02]">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.isSale && <Badge variant="sale">Акция</Badge>}
        {product.isHit && <Badge variant="hit">Хит</Badge>}
        {product.isNew && <Badge variant="new">Новинка</Badge>}
      </div>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="text-muted-foreground font-medium">Нет в наличии</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-foreground line-clamp-2 leading-tight mb-1">
            {product.name}
          </h3>
          {product.weight && (
            <span className="text-xs text-muted-foreground">{product.weight}</span>
          )}
        </div>

        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">
              {product.price.toLocaleString()}₸
            </span>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {product.oldPrice.toLocaleString()}₸
              </span>
            )}
          </div>

          {product.inStock && (
            <>
              {quantity === 0 ? (
                <Button
                  variant="default"
                  size="icon"
                  className="rounded-full"
                  onClick={() => addItem(product)}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              ) : (
                <div className="flex items-center gap-2 bg-primary rounded-full p-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-full h-7 w-7 hover:bg-primary-foreground/20 text-primary-foreground"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-bold text-primary-foreground min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-full h-7 w-7 hover:bg-primary-foreground/20 text-primary-foreground"
                    onClick={() => addItem(product)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
