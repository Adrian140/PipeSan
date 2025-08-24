import React from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const { addItem } = useCart();
  const { user } = useAuth();
  
  const {
    id,
    name,
    sku,
    price,
    salePrice,
    currency = 'EUR',
    image,
    rating = 0,
    reviewCount = 0,
    inStock = true,
    badge,
    variants = []
  } = product;

  const displayPrice = salePrice || price;
  const hasDiscount = salePrice && salePrice < price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };
  
  const handleBuyOnAmazon = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const userCountry = user?.deliveryCountry;
    const amazonLinks = product.amazonLinks || {};
    
    let amazonUrl = '';
    
    // Check if user country has specific Amazon link
    if (userCountry && ['IT', 'FR', 'DE', 'ES', 'NL', 'BE', 'PL', 'SE'].includes(userCountry) && amazonLinks[userCountry]) {
      amazonUrl = amazonLinks[userCountry];
    } else if (amazonLinks.DE) {
      // Fallback to Germany
      amazonUrl = amazonLinks.DE;
    }
    
    if (amazonUrl) {
      window.open(amazonUrl, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
    <Link to={`/products/${id}`} className="block" onClick={handleAddToCart}>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {hasDiscount && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              -{Math.round(((price - salePrice) / price) * 100)}%
            </span>
          )}
          {badge && (
            <span className="bg-primary text-white px-2 py-1 rounded-md text-xs font-medium">
              {badge}
            </span>
          )}
          {!inStock && (
            <span className="bg-gray-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </Link>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* SKU */}
        <p className="text-xs text-gray-500 mb-1">SKU: {sku}</p>
        
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
          {name}
        </h3>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({reviewCount})</span>
          </div>
        )}

        {/* Variants */}
        {variants.length > 0 && (
          <div className="flex gap-1 mb-3">
            {variants.slice(0, 4).map((variant, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded border border-gray-300"
                style={{ backgroundColor: variant.color }}
                title={variant.name}
              />
            ))}
            {variants.length > 4 && (
              <span className="text-xs text-gray-500 ml-1">+{variants.length - 4}</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-primary">
            {displayPrice.toFixed(2)} {currency}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {price.toFixed(2)} {currency}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors ${
            inStock
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>

        {/* Buy on Amazon Button */}
        {product.amazonLinks && Object.keys(product.amazonLinks).length > 0 && (
          <button
            onClick={handleBuyOnAmazon}
            className="w-full mt-2 flex items-center justify-center gap-2 py-2 px-4 border border-orange-400 text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-colors"
          >
            🛒 Cumpără pe Amazon
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;