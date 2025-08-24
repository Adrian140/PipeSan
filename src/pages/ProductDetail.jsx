import React, { useState } from 'react';
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw, Info } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Mock product data
  const product = {
    id: 1,
    name: 'Professional Pipe Fitting DN25 - Brass Connection',
    sku: 'PF-DN25-001',
    price: 45.99,
    salePrice: 39.99,
    currency: 'EUR',
    rating: 4.5,
    reviewCount: 23,
    inStock: true,
    stockCount: 15,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600'
    ],
    variants: [
      { id: 1, name: 'DN25 Brass', sku: 'PF-DN25-001', price: 39.99, inStock: true },
      { id: 2, name: 'DN25 Stainless Steel', sku: 'PF-DN25-002', price: 49.99, inStock: true },
      { id: 3, name: 'DN32 Brass', sku: 'PF-DN32-001', price: 54.99, inStock: false }
    ],
    description: 'High-quality professional pipe fitting designed for industrial and commercial applications. Made from premium brass with excellent corrosion resistance and durability.',
    specifications: {
      'Nominal Diameter': 'DN25 (1")',
      'Material': 'CW617N Brass',
      'Pressure Rating': 'PN16 (16 bar)',
      'Temperature Range': '-20°C to +120°C',
      'Thread Type': 'BSP (British Standard Pipe)',
      'Certification': 'CE, ACS, WRAS',
      'Weight': '0.45 kg',
      'Dimensions': '85 x 45 x 32 mm'
    },
    amazonLinks: {
      IT: 'https://amazon.it/dp/B08EXAMPLE1',
      FR: 'https://amazon.fr/dp/B08EXAMPLE2',
      DE: 'https://amazon.de/dp/B08EXAMPLE3',
      ES: 'https://amazon.es/dp/B08EXAMPLE4',
      NL: 'https://amazon.nl/dp/B08EXAMPLE5',
      BE: 'https://amazon.com.be/dp/B08EXAMPLE6',
      PL: 'https://amazon.pl/dp/B08EXAMPLE7',
      SE: 'https://amazon.se/dp/B08EXAMPLE8'
    },
    features: [
      'Premium CW617N brass construction',
      'Excellent corrosion resistance',
      'Precision machined threads',
      'Suitable for potable water',
      'CE certified for EU compliance',
      'Professional grade quality'
    ],
    compatibility: [
      'Standard BSP threaded pipes',
      'Copper pipes with adapters',
      'PEX pipes with compression fittings',
      'CPVC pipes with threaded adapters'
    ],
    documents: [
      { name: 'Technical Datasheet', url: '#', type: 'PDF' },
      { name: 'Installation Guide', url: '#', type: 'PDF' },
      { name: 'CE Declaration', url: '#', type: 'PDF' },
      { name: 'Safety Data Sheet', url: '#', type: 'PDF' }
    ]
  };

  const reviews = [
    {
      id: 1,
      author: 'Jean-Pierre M.',
      rating: 5,
      date: '2024-01-15',
      title: 'Excellent quality',
      comment: 'Perfect fit and finish. Exactly what I needed for my plumbing project.'
    },
    {
      id: 2,
      author: 'Maria S.',
      rating: 4,
      date: '2024-01-10',
      title: 'Good product',
      comment: 'Good quality brass fitting. Fast delivery and well packaged.'
    }
  ];

  const relatedProducts = [
    {
      id: 2,
      name: 'Pipe Gasket Set',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200'
    },
    {
      id: 3,
      name: 'Thread Sealant',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200'
    }
  ];

  const currentVariant = product.variants[selectedVariant];
  const displayPrice = currentVariant.price;
  const hasDiscount = product.salePrice && product.salePrice < product.price;

  const handleAddToCart = () => {
    const selectedVariantData = product.variants.length > 0 ? currentVariant : null;
    addItem(product, quantity, selectedVariantData);
  };

  const handleBuyOnAmazon = () => {
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
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><a href="/" className="text-primary hover:text-primary-dark">Home</a></li>
            <li className="text-gray-500">/</li>
            <li><a href="/products" className="text-primary hover:text-primary-dark">Products</a></li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-500">Pipe Fittings</li>
            <li className="text-gray-500">/</li>
            <li className="text-text-primary font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="aspect-square mb-4 bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">SKU: {currentVariant.sku}</p>
              <h1 className="text-3xl font-bold text-text-primary mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-primary">
                  €{displayPrice.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-xl text-gray-500 line-through">
                    €{product.price.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">Price includes VAT</p>
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-text-primary mb-3">Variant:</h3>
                <div className="grid grid-cols-1 gap-2">
                  {product.variants.map((variant, index) => (
                    <label
                      key={variant.id}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedVariant === index
                          ? 'border-primary bg-blue-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      } ${!variant.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="variant"
                          value={index}
                          checked={selectedVariant === index}
                          onChange={() => setSelectedVariant(index)}
                          disabled={!variant.inStock}
                          className="mr-3"
                        />
                        <span className="font-medium">{variant.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">€{variant.price.toFixed(2)}</span>
                        {!variant.inStock && (
                          <p className="text-xs text-red-500">Out of Stock</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="mb-6">
              {currentVariant.inStock ? (
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                  <span className="text-sm font-medium">
                    In Stock ({product.stockCount} available)
                  </span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-2" />
                  <span className="text-sm font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  Total: €{(displayPrice * quantity).toFixed(2)}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!currentVariant.inStock}
                  className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                {product.amazonLinks && Object.keys(product.amazonLinks).length > 0 && (
                  <button
                    onClick={handleBuyOnAmazon}
                    className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                  >
                    🛒 Cumpără pe Amazon
                  </button>
                )}
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Shipping & Returns */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-green-600" />
                <span>Free shipping on orders over €100</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="w-5 h-5 text-blue-600" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-5 h-5 text-purple-600" />
                <span>2-year warranty included</span>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-text-primary mb-3">Key Features:</h3>
              <ul className="space-y-1 text-sm">
                {product.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'specifications', label: 'Specifications' },
                { id: 'compatibility', label: 'Compatibility' },
                { id: 'documents', label: 'Documents' },
                { id: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="max-w-4xl">
            {activeTab === 'description' && (
              <div>
                <p className="text-text-secondary leading-relaxed mb-6">{product.description}</p>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Features:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-text-primary">{key}:</span>
                    <span className="text-text-secondary">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'compatibility' && (
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Compatible with:</h3>
                <ul className="space-y-2">
                  {product.compatibility.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.documents.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.url}
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Info className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium text-text-primary">{doc.name}</div>
                      <div className="text-sm text-gray-500">{doc.type}</div>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-text-primary">Customer Reviews</h3>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
                    Write a Review
                  </button>
                </div>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium text-text-primary">{review.title}</span>
                      </div>
                      <p className="text-text-secondary mb-2">{review.comment}</p>
                      <div className="text-sm text-gray-500">
                        By {review.author} on {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-text-primary mb-2">{relatedProduct.name}</h3>
                  <p className="text-primary font-semibold">€{relatedProduct.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
