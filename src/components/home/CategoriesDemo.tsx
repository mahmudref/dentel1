'use client'

import { useState } from 'react';
import ProfessionalCategories from './ProfessionalCategories';

const variants = [
  { key: 'carousel', name: 'Carousel Design', description: 'تصميم carousel متفاعل مع حركة تلقائية' },
  { key: 'grid', name: 'Grid Layout', description: 'تخطيط شبكي احترافي مع تأثيرات hover' },
  { key: 'cards', name: 'Premium Cards', description: 'بطاقات فاخرة مع تفاصيل كاملة' },
] as const;

export default function CategoriesDemo() {
  const [selectedVariant, setSelectedVariant] = useState<'carousel' | 'grid' | 'cards'>('carousel');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Controls */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">عرض تصاميم الفئات الاحترافية</h1>
          
          <div className="flex flex-wrap gap-3">
            {variants.map((variant) => (
              <button
                key={variant.key}
                onClick={() => setSelectedVariant(variant.key)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedVariant === variant.key
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-left">
                  <div className="font-semibold">{variant.name}</div>
                  <div className="text-sm opacity-80">{variant.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Design */}
      <ProfessionalCategories variant={selectedVariant} />
      
      {/* Information Panel */}
      <div className="bg-white border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              كيفية استخدام التصميم المحدد:
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                {variants.find(v => v.key === selectedVariant)?.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {variants.find(v => v.key === selectedVariant)?.description}
              </p>
              
              <div className="bg-white rounded border p-4">
                <code className="text-sm text-gray-800">
                  {`<ProfessionalCategories variant="${selectedVariant}" />`}
                </code>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <h4 className="font-semibold mb-2">المميزات:</h4>
                <ul className="space-y-1">
                  {selectedVariant === 'carousel' && (
                    <>
                      <li>• حركة تلقائية مع إمكانية التحكم اليد��ي</li>
                      <li>• تأثيرات hover احترافية</li>
                      <li>• تصميم متجاوب لجميع الشاشات</li>
                      <li>• مؤشرات تفاعلية للصفحات</li>
                    </>
                  )}
                  {selectedVariant === 'grid' && (
                    <>
                      <li>• تخطيط شبكي متكيف</li>
                      <li>• تأثيرات hover مع عرض التفاصيل</li>
                      <li>• تصميم مدمج وأنيق</li>
                      <li>• سهولة في التصفح</li>
                    </>
                  )}
                  {selectedVariant === 'cards' && (
                    <>
                      <li>• بطاقات فاخرة مع تفاصيل كاملة</li>
                      <li>• أزرار تفاعلية للحجز</li>
                      <li>• تصميم مفصل مع قائمة الإجراءات</li>
                      <li>• مناسب لعرض محتوى تفصيلي</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
