import { useState } from 'react';
import { X, Plus, Minus, Check, Bold, Italic, Underline, Link, Image, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Quote, Code } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  type: string;
  originalPrice: number;
  currentPrice: number;
  coverImage: string;
  carouselImages: string[];
  detailLink: string;
  status: 'active' | 'inactive' | 'out_of_stock';
}

interface ProductEditModalProps {
  product: Product;
  onClose: () => void;
  onSave: () => void;
}

export function ProductEditModal({ product, onClose, onSave }: ProductEditModalProps) {
  const [productType, setProductType] = useState('虚拟');
  const [productName, setProductName] = useState(product.name);
  const [originalPrice, setOriginalPrice] = useState(product.originalPrice);
  const [currentPrice, setCurrentPrice] = useState(product.currentPrice);
  const [description, setDescription] = useState('');
  const [carouselImages, setCarouselImages] = useState<string[]>(product.carouselImages);

  const handleAddImage = () => {
    console.log('添加轮播图');
  };

  const handleRemoveImage = (index: number) => {
    setCarouselImages(carouselImages.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* 标题栏 */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-gray-800">编辑商品</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 商品封面 */}
          <div>
            <label className="block text-gray-700 mb-3 text-sm">商品封面</label>
            <div className="relative w-32 h-32 border-2 border-gray-200 rounded-lg overflow-hidden group">
              <img
                src={product.coverImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* 商品类型 */}
          <div>
            <label className="block text-gray-700 mb-3 text-sm">商品类型</label>
            <div className="flex gap-6">
              {['虚拟', '开箱', '兑点'].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="productType"
                    value={type}
                    checked={productType === type}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 商品名称 */}
          <div>
            <label className="block text-gray-700 mb-3 text-sm">商品名称</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="请输入商品名称"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* 商品单价 */}
          <div>
            <label className="block text-gray-700 mb-3 text-sm">商品单价</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOriginalPrice(Math.max(0, originalPrice - 100))}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <input
                type="number"
                value={originalPrice.toFixed(2)}
                onChange={(e) => setOriginalPrice(parseFloat(e.target.value) || 0)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              />
              <button
                onClick={() => setOriginalPrice(originalPrice + 100)}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            {originalPrice <= 0 && (
              <p className="text-red-600 text-xs mt-2">让：网站必须大于0</p>
            )}
          </div>

          {/* 商品现价 */}
          <div>
            <label className="block text-gray-700 mb-3 text-sm">商品现价</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPrice(Math.max(0, currentPrice - 100))}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <input
                type="number"
                value={currentPrice.toFixed(2)}
                onChange={(e) => setCurrentPrice(parseFloat(e.target.value) || 0)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              />
              <button
                onClick={() => setCurrentPrice(currentPrice + 100)}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* 商品轮播图 */}
          <div>
            <label className="block text-gray-700 mb-3 text-sm">商品轮播图</label>
            <div className="flex gap-3 flex-wrap">
              {carouselImages.map((img, index) => (
                <div key={index} className="relative w-32 h-32 border-2 border-gray-200 rounded-lg overflow-hidden group">
                  <img
                    src={img}
                    alt={`轮播图 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              ))}
              
              {/* 添加按钮 */}
              <button
                onClick={handleAddImage}
                className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-colors group"
              >
                <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-500" />
              </button>
            </div>
          </div>

          {/* 描述（富文本编辑器） */}
          <div>
            <label className="block text-gray-700 mb-3 text-sm">描述</label>
            
            {/* 富文本工具栏 */}
            <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex items-center gap-1 flex-wrap">
              <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="粗体">
                <Bold className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="斜体">
                <Italic className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="下划线">
                <Underline className="w-4 h-4 text-gray-600" />
              </button>
              
              <div className="w-px h-6 bg-gray-300 mx-1" />
              
              <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="引用">
                <Quote className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="代码">
                <Code className="w-4 h-4 text-gray-600" />
              </button>
              
              <div className="w-px h-6 bg-gray-300 mx-1" />
              
              <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="无序列表">
                <List className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="有序列表">
                <ListOrdered className="w-4 h-4 text-gray-600" />
              </button>
              
              <div className="w-px h-6 bg-gray-300 mx-1" />
              
              <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="左对齐">
                <AlignLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="居中">
                <AlignCenter className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="右对齐">
                <AlignRight className="w-4 h-4 text-gray-600" />
              </button>
              
              <div className="w-px h-6 bg-gray-300 mx-1" />
              
              <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="插入链接">
                <Link className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="插入图片">
                <Image className="w-4 h-4 text-gray-600" />
              </button>
              
              <div className="w-px h-6 bg-gray-300 mx-1" />
              
              <select className="px-2 py-1 text-xs border-0 bg-transparent text-gray-600 cursor-pointer focus:outline-none">
                <option>14px</option>
                <option>16px</option>
                <option>18px</option>
                <option>20px</option>
                <option>24px</option>
              </select>
            </div>
            
            {/* 编辑区域 */}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="请输入内容"
              className="w-full px-4 py-3 border border-t-0 border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
              rows={8}
            />
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all"
          >
            自动检测
          </button>
        </div>
      </div>
    </div>
  );
}
