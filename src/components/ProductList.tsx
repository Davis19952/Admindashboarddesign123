import { useState } from 'react';
import { Search, Filter, RefreshCw, ChevronLeft, ChevronRight, Edit2, Trash2, Eye, X, ChevronRight as ChevronRightIcon, ChevronLeft as ChevronLeftIcon, Copy, Check, Plus, Minus, Upload, Bold, Italic, Underline, Link, Image, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Quote, Code, ShoppingBag, ImagePlus } from 'lucide-react';
import { ProductEditModal } from './ProductEditModal';
import { toast } from 'sonner@2.0.3';

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

export function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showCarouselModal, setShowCarouselModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showRefreshToast, setShowRefreshToast] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [productStatuses, setProductStatuses] = useState<Record<string, Product['status']>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [productType, setProductType] = useState('虚拟');
  const [description, setDescription] = useState('');
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [editForm, setEditForm] = useState({
    name: '',
    type: '',
    originalPrice: '',
    currentPrice: '',
    detailLink: '',
    status: 'active' as Product['status']
  });
  const [addForm, setAddForm] = useState({
    name: '',
    type: '',
    originalPrice: '',
    currentPrice: '',
    coverImage: '',
    carouselImages: [] as string[],
    detailLink: '',
    status: 'active' as Product['status']
  });
  
  const itemsPerPage = 10;

  const products: Product[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      type: '手机',
      originalPrice: 9999.00,
      currentPrice: 8999.00,
      coverImage: 'https://images.unsplash.com/photo-1696446702807-22c02123d8a6?w=400',
      carouselImages: [
        'https://images.unsplash.com/photo-1696446702807-22c02123d8a6?w=800',
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
        'https://images.unsplash.com/photo-1678652197635-57b88b1f4d87?w=800'
      ],
      detailLink: '/products/iphone-15-pro-max',
      status: 'active'
    },
    {
      id: '2',
      name: 'MacBook Pro 14寸',
      type: '笔记本电脑',
      originalPrice: 15999.00,
      currentPrice: 14999.00,
      coverImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      carouselImages: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800'
      ],
      detailLink: '/products/macbook-pro-14',
      status: 'active'
    },
    {
      id: '3',
      name: 'AirPods Pro 2',
      type: '耳机',
      originalPrice: 1899.00,
      currentPrice: 1699.00,
      coverImage: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400',
      carouselImages: [
        'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800',
        'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800'
      ],
      detailLink: '/products/airpods-pro-2',
      status: 'active'
    },
    {
      id: '4',
      name: 'iPad Air',
      type: '平板电脑',
      originalPrice: 4799.00,
      currentPrice: 4299.00,
      coverImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
      carouselImages: [
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
        'https://images.unsplash.com/photo-1585790050230-5dd28404f32d?w=800'
      ],
      detailLink: '/products/ipad-air',
      status: 'inactive'
    },
    {
      id: '5',
      name: 'Apple Watch Ultra 2',
      type: '智能手表',
      originalPrice: 6499.00,
      currentPrice: 5999.00,
      coverImage: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400',
      carouselImages: [
        'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'
      ],
      detailLink: '/products/apple-watch-ultra-2',
      status: 'active'
    },
    {
      id: '6',
      name: 'Mac Studio',
      type: '台式电脑',
      originalPrice: 14999.00,
      currentPrice: 13999.00,
      coverImage: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400',
      carouselImages: [
        'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800',
        'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800'
      ],
      detailLink: '/products/mac-studio',
      status: 'out_of_stock'
    },
    {
      id: '7',
      name: 'HomePod mini',
      type: '音响',
      originalPrice: 749.00,
      currentPrice: 699.00,
      coverImage: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400',
      carouselImages: [
        'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800',
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800'
      ],
      detailLink: '/products/homepod-mini',
      status: 'active'
    },
    {
      id: '8',
      name: 'iMac 24寸',
      type: '一体机',
      originalPrice: 10499.00,
      currentPrice: 9999.00,
      coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
      carouselImages: [
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
        'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800'
      ],
      detailLink: '/products/imac-24',
      status: 'active'
    },
    {
      id: '9',
      name: 'Magic Keyboard',
      type: '键盘',
      originalPrice: 1099.00,
      currentPrice: 999.00,
      coverImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
      carouselImages: [
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800',
        'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800'
      ],
      detailLink: '/products/magic-keyboard',
      status: 'inactive'
    },
    {
      id: '10',
      name: 'Apple TV 4K',
      type: '机顶盒',
      originalPrice: 1499.00,
      currentPrice: 1299.00,
      coverImage: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400',
      carouselImages: [
        'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800',
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800'
      ],
      detailLink: '/products/apple-tv-4k',
      status: 'active'
    },
  ];

  const getStatusConfig = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return { label: '上架', className: 'bg-green-100 text-green-700' };
      case 'inactive':
        return { label: '下架', className: 'bg-gray-100 text-gray-700' };
      case 'out_of_stock':
        return { label: '缺货', className: 'bg-red-100 text-red-700' };
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setProductType('虚拟');
    setDescription('');
    setCarouselImages(product.carouselImages);
    setEditForm({
      name: product.name,
      type: product.type,
      originalPrice: product.originalPrice.toString(),
      currentPrice: product.currentPrice.toString(),
      detailLink: product.detailLink,
      status: product.status
    });
    setShowEditModal(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    console.log('删除商品:', selectedProduct?.name);
    setShowDeleteConfirm(false);
    setSelectedProduct(null);
  };

  const handleSaveEdit = () => {
    console.log('保存编辑:', editForm);
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  const handleRefresh = () => {
    setShowRefreshToast(true);
    setTimeout(() => setShowRefreshToast(false), 2000);
  };

  const handleViewCover = (product: Product) => {
    setSelectedProduct(product);
    setShowImageModal(true);
  };

  const handleViewCarousel = (product: Product) => {
    setSelectedProduct(product);
    setCarouselIndex(0);
    setShowCarouselModal(true);
  };

  const nextImage = () => {
    if (selectedProduct) {
      setCarouselIndex((prev) => 
        prev === selectedProduct.carouselImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      setCarouselIndex((prev) => 
        prev === 0 ? selectedProduct.carouselImages.length - 1 : prev - 1
      );
    }
  };

  const handleStatusToggle = (productId: string, currentStatus: Product['status']) => {
    // 只允许在上架和下架之间切换，缺货状态需要手动编辑
    if (currentStatus === 'out_of_stock') {
      return;
    }
    
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    setProductStatuses(prev => ({
      ...prev,
      [productId]: newStatus
    }));
    
    console.log(`商品 ${productId} 状态已切换: ${currentStatus} -> ${newStatus}`);
  };

  const getProductStatus = (productId: string, defaultStatus: Product['status']) => {
    return productStatuses[productId] || defaultStatus;
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyLink = (link: string, productId: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(productId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenAddModal = () => {
    setAddForm({
      name: '',
      type: '',
      originalPrice: '',
      currentPrice: '',
      coverImage: '',
      carouselImages: [],
      detailLink: '',
      status: 'active'
    });
    setShowAddModal(true);
  };

  const handleAddProduct = () => {
    // 验证必填字段
    if (!addForm.name || !addForm.type || !addForm.originalPrice || !addForm.currentPrice) {
      toast.error('请填写所有必填字段');
      return;
    }

    toast.loading('正在添加商品...', { id: 'add-product' });

    setTimeout(() => {
      console.log('添加商品:', addForm);
      
      toast.success('商品添加成功！', {
        id: 'add-product',
        description: `${addForm.name} 已成功添加到商品列表`,
        duration: 3000,
      });

      setShowAddModal(false);
    }, 1000);
  };

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        toast.error('请选择图片文件');
        return;
      }

      // 验证文件大小 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('图片大小不能超过 5MB');
        return;
      }

      // 创建预览URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setAddForm({ ...addForm, coverImage: imageUrl });
        toast.success('封面图片已上传');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCarouselImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // 验证文件数量
      if (addForm.carouselImages.length + files.length > 10) {
        toast.error('轮播图最多只能上传10张');
        return;
      }

      const newImages: string[] = [];
      let filesProcessed = 0;

      Array.from(files).forEach((file) => {
        // 验证文件类型
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} 不是图片文件`);
          return;
        }

        // 验证文件大小 (5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} 大小超过 5MB`);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          newImages.push(imageUrl);
          filesProcessed++;

          if (filesProcessed === files.length) {
            setAddForm({ 
              ...addForm, 
              carouselImages: [...addForm.carouselImages, ...newImages] 
            });
            toast.success(`成功上传 ${newImages.length} 张轮播图`);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveCarouselImage = (index: number) => {
    const newCarouselImages = addForm.carouselImages.filter((_, i) => i !== index);
    setAddForm({ ...addForm, carouselImages: newCarouselImages });
    toast.success('已删除轮播图');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-800 mb-2">商品列表</h1>
        <p className="text-gray-600">管理商品信息和状态</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* 搜索和筛选栏 */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索商品名称或类型..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white cursor-pointer"
                >
                  <option value="all">全部状态</option>
                  <option value="active">上架</option>
                  <option value="inactive">下架</option>
                  <option value="out_of_stock">缺货</option>
                </select>
              </div>
              
              <button 
                onClick={handleRefresh}
                className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                刷新
              </button>
              
              <button 
                onClick={handleOpenAddModal}
                className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-md transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                添加商品
              </button>
            </div>
          </div>
        </div>

        {/* 商品表格 */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-3 text-gray-700 whitespace-nowrap">ID</th>
                <th className="text-left py-4 px-3 text-gray-700 whitespace-nowrap">商品名称</th>
                <th className="text-left py-4 px-3 text-gray-700 whitespace-nowrap">商品类型</th>
                <th className="text-right py-4 px-3 text-gray-700 whitespace-nowrap">商品原价</th>
                <th className="text-right py-4 px-3 text-gray-700 whitespace-nowrap">商品现价</th>
                <th className="text-center py-4 px-3 text-gray-700 whitespace-nowrap">商品封面</th>
                <th className="text-center py-4 px-3 text-gray-700 whitespace-nowrap">商品轮播图</th>
                <th className="text-left py-4 px-3 text-gray-700 whitespace-nowrap">商品详情链接</th>
                <th className="text-center py-4 px-3 text-gray-700 whitespace-nowrap">商品状态</th>
                <th className="text-center py-4 px-3 text-gray-700 whitespace-nowrap sticky right-0 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.05)]">操作</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => {
                const statusConfig = getStatusConfig(getProductStatus(product.id, product.status));
                const discount = ((product.originalPrice - product.currentPrice) / product.originalPrice * 100).toFixed(0);
                
                return (
                  <tr key={product.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-3 text-gray-600 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span>{product.id}</span>
                        <button
                          onClick={() => handleCopyId(product.id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          title="复制ID"
                        >
                          {copiedId === product.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-3 whitespace-nowrap">
                      <span className="text-gray-800">{product.name}</span>
                    </td>
                    <td className="py-4 px-3 whitespace-nowrap">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                        {product.type}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right whitespace-nowrap">
                      <span className="text-gray-500 line-through text-sm">{product.originalPrice.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-3 text-right whitespace-nowrap">
                      <div className="flex flex-col items-end">
                        <span className="text-green-600">{product.currentPrice.toFixed(2)}</span>
                        <span className="text-xs text-red-600">-{discount}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleViewCover(product)}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-xs"
                      >
                        <Eye className="w-3 h-3" />
                        查看
                      </button>
                    </td>
                    <td className="py-4 px-3 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleViewCarousel(product)}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-xs"
                      >
                        <Eye className="w-3 h-3" />
                        {product.carouselImages.length}张
                      </button>
                    </td>
                    <td className="py-4 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <a
                          href={product.detailLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {product.detailLink}
                        </a>
                        <button
                          onClick={() => handleCopyLink(product.detailLink, product.id)}
                          className="text-gray-400 hover:text-purple-600 transition-colors flex-shrink-0"
                          title="复制链接"
                        >
                          {copiedId === product.id ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs ${statusConfig.className}`}>
                          {statusConfig.label}
                        </span>
                        {getProductStatus(product.id, product.status) !== 'out_of_stock' && (
                          <button
                            onClick={() => handleStatusToggle(product.id, getProductStatus(product.id, product.status))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                              getProductStatus(product.id, product.status) === 'active'
                                ? 'bg-green-500'
                                : 'bg-gray-300'
                            }`}
                            title={getProductStatus(product.id, product.status) === 'active' ? '点击下架' : '点击上架'}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                getProductStatus(product.id, product.status) === 'active'
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-3 whitespace-nowrap sticky right-0 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1"
                          title="编辑商品"
                        >
                          <Edit2 className="w-3 h-3" />
                          编辑
                        </button>
                        <button
                          onClick={() => handleDelete(product)}
                          className="px-3 py-1.5 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1"
                          title="删除商品"
                        >
                          <Trash2 className="w-3 h-3" />
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 分页器 */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <p className="text-gray-600 text-sm">
            显示 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} 条，
            共 {filteredProducts.length} 条记录
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 删除确认对话框 */}
      {showDeleteConfirm && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-800 text-center">删除商品</h2>
            </div>

            <div className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <p className="text-gray-600 mb-2">确定要删除以下商品吗？</p>
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <p className="text-gray-800">商品名称：<span className="font-medium">{selectedProduct.name}</span></p>
                  <p className="text-gray-600 text-sm mt-1">类型：{selectedProduct.type}</p>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm text-center">此操作不可撤销，请谨慎操作！</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedProduct(null);
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg transition-all"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑商品对话框 */}
      {showEditModal && selectedProduct && (
        <ProductEditModal
          product={selectedProduct}
          onClose={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
          onSave={handleSaveEdit}
        />
      )}

      {/* 封面图查看对话框 */}
      {showImageModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setShowImageModal(false)}>
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedProduct.coverImage}
              alt={selectedProduct.name}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <div className="text-center mt-4 text-white">
              <p className="text-lg">{selectedProduct.name} - 商品封面</p>
            </div>
          </div>
        </div>
      )}

      {/* 轮播图查看对话框 */}
      {showCarouselModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setShowCarouselModal(false)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowCarouselModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative">
              <img
                src={selectedProduct.carouselImages[carouselIndex]}
                alt={`${selectedProduct.name} - ${carouselIndex + 1}`}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              
              {selectedProduct.carouselImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all shadow-lg"
                  >
                    <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all shadow-lg"
                  >
                    <ChevronRightIcon className="w-6 h-6 text-gray-800" />
                  </button>
                </>
              )}
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 px-4 py-2 rounded-full">
                <p className="text-white text-sm">
                  {carouselIndex + 1} / {selectedProduct.carouselImages.length}
                </p>
              </div>
            </div>
            
            <div className="text-center mt-4 text-white">
              <p className="text-lg">{selectedProduct.name} - 商品轮播图</p>
            </div>

            {/* 缩略图导航 */}
            <div className="flex justify-center gap-2 mt-4">
              {selectedProduct.carouselImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === carouselIndex ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`缩略图 ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 刷新提示 Toast */}
      {showRefreshToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>刷新成功！</span>
          </div>
        </div>
      )}

      {/* 添加商品模态框 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-gray-800 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-purple-600" />
                  添加新商品
                </h2>
                <p className="text-sm text-gray-500">填写商品详细信息</p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* 基本信息 */}
              <div>
                <h3 className="text-gray-800 mb-4">基本信息</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      商品名称 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={addForm.name}
                      onChange={(e) => setAddForm({...addForm, name: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="请输入商品名称"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      商品类型 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={addForm.type}
                      onChange={(e) => setAddForm({...addForm, type: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="请输入商品类型"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      商品原价 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={addForm.originalPrice}
                      onChange={(e) => setAddForm({...addForm, originalPrice: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      商品现价 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={addForm.currentPrice}
                      onChange={(e) => setAddForm({...addForm, currentPrice: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              {/* 图片信息 */}
              <div>
                <h3 className="text-gray-800 mb-4">图片信息</h3>
                <div className="space-y-4">
                  {/* 商品封面 */}
                  <div>
                    <label className="block text-gray-700 mb-2">商品封面图片</label>
                    
                    {/* 文件上传按钮 */}
                    <div className="flex gap-3 mb-3">
                      <label className="flex-1 cursor-pointer">
                        <div className="px-4 py-2.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center gap-2 border-2 border-dashed border-purple-300">
                          <Upload className="w-4 h-4" />
                          <span>点击上传图片</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCoverImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* 图片预览 */}
                    {addForm.coverImage && (
                      <div className="mt-3 border-2 border-dashed border-purple-300 rounded-lg p-4 bg-purple-50/30">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-gray-700 text-sm">封面预览：</p>
                          <button
                            onClick={() => setAddForm({...addForm, coverImage: ''})}
                            className="text-red-600 hover:text-red-700 transition-colors"
                            title="删除封面"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <img
                          src={addForm.coverImage}
                          alt="封面预览"
                          className="w-full h-48 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E无法加载%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* 商品轮播图 */}
                  <div>
                    <label className="block text-gray-700 mb-2">
                      商品轮播图
                      <span className="text-gray-500 text-sm ml-2">
                        (最多10张)
                      </span>
                    </label>
                    
                    {/* 文件上传按钮 */}
                    <label className="cursor-pointer block">
                      <div className="px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 border-2 border-dashed border-blue-300">
                        <ImagePlus className="w-5 h-5" />
                        <span>点击上传轮播图 (可多选)</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleCarouselImageUpload}
                        className="hidden"
                      />
                    </label>

                    {/* 轮播图列表 */}
                    {addForm.carouselImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        {addForm.carouselImages.map((img, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={img}
                              alt={`轮播图 ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <button
                                onClick={() => handleRemoveCarouselImage(index)}
                                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                title="删除此图片"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-0.5 rounded text-xs">
                              {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {addForm.carouselImages.length === 0 && (
                      <div className="mt-3 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-center">
                        <ImagePlus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">暂无轮播图</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 商品状态 */}
              <div>
                <h3 className="text-gray-800 mb-4">商品状态</h3>
                <select
                  value={addForm.status}
                  onChange={(e) => setAddForm({...addForm, status: e.target.value as Product['status']})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white cursor-pointer"
                >
                  <option value="active">上架</option>
                  <option value="inactive">下架</option>
                  <option value="out_of_stock">缺货</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddProduct}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-md transition-all"
              >
                添加商品
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}