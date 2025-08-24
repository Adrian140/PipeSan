import React, { useState, useEffect } from 'react';
import { Wrench, Settings, Droplets, Zap, ArrowRight, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiClient } from '../config/api';
import { useTranslation } from '../translations';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const categoryIcons = {
    valves: Wrench,
    fittings: Settings,
    elbows: ArrowRight,
    tees: Zap,
    nipples: Package,
    reducers: Settings,
    hoses: Droplets,
    gaskets: Package,
    tools: Wrench,
    accessories: Settings
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await apiClient.categories.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Professional Plumbing Categories
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Browse our extensive range of professional plumbing parts, pipe fittings, valves and installation components. 
            All products come with complete technical specifications and CE certifications.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category.slug] || Package;
            return (
              <Link
                key={category.id}
                to={`/products?category=${category.slug}`}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-copper rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {t(category.slug)}
                  </h3>
                  <p className="text-text-secondary mb-4">
                    {category.productCount} products available
                  </p>
                  <div className="flex items-center justify-center text-primary group-hover:text-primary-dark transition-colors">
                    <span className="text-sm font-medium mr-2">Browse Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Featured Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            Featured Product Lines
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 text-center">
              <Wrench className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-4">Ball Valves</h3>
              <p className="text-text-secondary mb-6">
                Professional brass ball valves with full bore design. CW617N construction, 
                BSP/NPT threads, pressure ratings up to PN25.
              </p>
              <Link
                to="/products?category=valves"
                className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
              >
                View Valves <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-copper/10 to-white rounded-xl p-8 text-center">
              <Settings className="w-12 h-12 text-copper mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-4">Pipe Fittings</h3>
              <p className="text-text-secondary mb-6">
                High-quality brass and stainless steel fittings. Various sizes from DN15 to DN50, 
                with BSP and NPT thread options.
              </p>
              <Link
                to="/products?category=fittings"
                className="inline-flex items-center text-copper hover:text-copper-dark font-medium"
              >
                View Fittings <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-steel/10 to-white rounded-xl p-8 text-center">
              <Droplets className="w-12 h-12 text-steel mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-4">Flexible Hoses</h3>
              <p className="text-text-secondary mb-6">
                EPDM rubber hoses with stainless steel braiding. Various lengths and diameters, 
                suitable for hot and cold water applications.
              </p>
              <Link
                to="/products?category=hoses"
                className="inline-flex items-center text-steel hover:text-steel-dark font-medium"
              >
                View Hoses <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Technical Standards */}
        <section className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-6">
            Technical Standards & Certifications
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            All our products meet European technical standards with complete documentation, 
            certificates and technical specifications for professional installations.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <p className="font-semibold text-text-primary">CE Marking</p>
              <p className="text-sm text-text-secondary">European Conformity</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💧</div>
              <p className="font-semibold text-text-primary">WRAS Approved</p>
              <p className="text-sm text-text-secondary">Water Regulations</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="font-semibold text-text-primary">ACS Certified</p>
              <p className="text-sm text-text-secondary">French Standards</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📋</div>
              <p className="font-semibold text-text-primary">ISO 9001</p>
              <p className="text-sm text-text-secondary">Quality Management</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Categories;
