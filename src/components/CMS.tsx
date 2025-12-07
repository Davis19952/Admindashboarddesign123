import { useState } from 'react';
import { GripVertical, Image, Plus, Edit, Trash2, Save, X, FileText, Tag as TagIcon, Eye, EyeOff } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from 'sonner@2.0.3';

interface HomeIcon {
  id: string;
  title: string;
  icon: string;
}

interface FAQ {
  id: string;
  title: string;
  category: string;
  content: string;
  updatedAt: string;
  published: boolean;
}

const ItemType = 'HOME_ICON';

function DraggableIcon({ icon, index, moveIcon }: { icon: HomeIcon; index: number; moveIcon: (from: number, to: number) => void }) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveIcon(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-move hover:border-purple-300 transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <GripVertical className="w-5 h-5 text-gray-400" />
      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white">
        {icon.icon}
      </div>
      <span className="flex-1 text-gray-800">{icon.title}</span>
    </div>
  );
}

function CMSContent() {
  const [homeIcons, setHomeIcons] = useState<HomeIcon[]>([
    { id: '1', title: '扫一扫', icon: '📷' },
    { id: '2', title: '我的订单', icon: '📦' },
    { id: '3', title: '优惠券', icon: '🎫' },
    { id: '4', title: '充值中心', icon: '💳' },
    { id: '5', title: '客服中心', icon: '💬' },
    { id: '6', title: '帮助中心', icon: '❓' },
  ]);

  const [faqs, setFaqs] = useState<FAQ[]>([
    { id: '1', title: '如何充值账户余额？', category: '账户相关', content: '进入充值中心选择金额...', updatedAt: '2024-12-05', published: true },
    { id: '2', title: '订单发货需要多久？', category: '物流相关', content: '一般24小时内发货...', updatedAt: '2024-12-04', published: true },
    { id: '3', title: '如何申请退款？', category: '售后相关', content: '在订单详情页点击退款...', updatedAt: '2024-12-03', published: true },
    { id: '4', title: '支持哪些支付方式？', category: '支付相关', content: '支持微信、支付宝...', updatedAt: '2024-12-02', published: false },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    published: true,
  });

  const moveIcon = (fromIndex: number, toIndex: number) => {
    const newIcons = [...homeIcons];
    const [movedIcon] = newIcons.splice(fromIndex, 1);
    newIcons.splice(toIndex, 0, movedIcon);
    setHomeIcons(newIcons);
  };

  const handleSaveHomeConfig = () => {
    toast.loading('正在保存首页配置...', { id: 'save-home' });
    
    setTimeout(() => {
      toast.success('首页配置已保存！', {
        id: 'save-home',
        description: '功能图标顺序已更新',
        duration: 3000,
      });
      console.log('保存首页配置:', homeIcons);
    }, 1000);
  };

  const handleCreateArticle = () => {
    setFormData({
      title: '',
      category: '',
      content: '',
      published: true,
    });
    setShowCreateModal(true);
  };

  const handleEditArticle = (faq: FAQ) => {
    setCurrentFaq(faq);
    setFormData({
      title: faq.title,
      category: faq.category,
      content: faq.content,
      published: faq.published,
    });
    setShowEditModal(true);
  };

  const handleDeleteArticle = (faq: FAQ) => {
    setCurrentFaq(faq);
    setShowDeleteModal(true);
  };

  const handleSubmitCreate = () => {
    if (!formData.title || !formData.category || !formData.content) {
      toast.error('请填写所有必填字段');
      return;
    }

    toast.loading('正在创建文章...', { id: 'create-article' });

    setTimeout(() => {
      const newFaq: FAQ = {
        id: String(faqs.length + 1),
        title: formData.title,
        category: formData.category,
        content: formData.content,
        updatedAt: new Date().toISOString().split('T')[0],
        published: formData.published,
      };

      setFaqs([newFaq, ...faqs]);
      setShowCreateModal(false);
      
      toast.success('文章创建成功！', {
        id: 'create-article',
        description: `《${formData.title}》已${formData.published ? '发布' : '保存为草稿'}`,
        duration: 3000,
      });

      console.log('创建文章:', newFaq);
    }, 800);
  };

  const handleSubmitEdit = () => {
    if (!formData.title || !formData.category || !formData.content) {
      toast.error('请填写所有必填字段');
      return;
    }

    toast.loading('正在更新文章...', { id: 'edit-article' });

    setTimeout(() => {
      setFaqs(faqs.map(faq => 
        faq.id === currentFaq?.id 
          ? { ...faq, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
          : faq
      ));
      setShowEditModal(false);
      
      toast.success('文章更新成功！', {
        id: 'edit-article',
        description: `《${formData.title}》已保存`,
        duration: 3000,
      });

      console.log('更新文章:', { ...currentFaq, ...formData });
    }, 800);
  };

  const handleConfirmDelete = () => {
    if (!currentFaq) return;

    toast.loading('正在删除文章...', { id: 'delete-article' });

    setTimeout(() => {
      setFaqs(faqs.filter(faq => faq.id !== currentFaq.id));
      setShowDeleteModal(false);
      
      toast.success('文章已删除', {
        id: 'delete-article',
        description: `《${currentFaq.title}》已从系统中移除`,
        duration: 3000,
      });

      console.log('删除文章:', currentFaq);
    }, 800);
  };

  const handleTogglePublish = (faq: FAQ) => {
    const newStatus = !faq.published;
    
    setFaqs(faqs.map(f => 
      f.id === faq.id 
        ? { ...f, published: newStatus }
        : f
    ));

    toast.success(
      newStatus ? '文章已发布' : '文章已下线',
      {
        description: `《${faq.title}》状态已更新`,
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-800 mb-2">���容运营管理</h1>
        <p className="text-gray-600">管理应用端的内容展示和用户帮助信息</p>
      </div>

      {/* 首页装修 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="mb-6">
          <h2 className="text-gray-800 mb-1">首页装修</h2>
          <p className="text-gray-600 text-sm">拖拽调整功能图标顺序，更换首页横幅</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* 功能图标排序 */}
          <div>
            <h3 className="text-gray-700 mb-3">功能图标顺序</h3>
            <div className="space-y-2">
              {homeIcons.map((icon, index) => (
                <DraggableIcon key={icon.id} icon={icon} index={index} moveIcon={moveIcon} />
              ))}
            </div>
            <button className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              添加新图标
            </button>
          </div>

          {/* 首页 Banner */}
          <div>
            <h3 className="text-gray-700 mb-3">首页 Banner</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
              <Image className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">点击上传或拖拽图片到此处</p>
              <p className="text-gray-400 text-sm">建议尺寸：750x300px，格式：JPG/PNG</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded"></div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm">双十二促销活动.jpg</p>
                  <p className="text-gray-500 text-xs">750x300px · 245KB</p>
                </div>
                <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                  <Trash2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={handleSaveHomeConfig}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            保存首页配置
          </button>
        </div>
      </div>

      {/* 帮助中心管理 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-gray-800 mb-1">帮助中心管理</h2>
            <p className="text-gray-600 text-sm">管理常见问题和帮助文档</p>
          </div>
          <button 
            onClick={handleCreateArticle}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            新建文章
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700">文章标题</th>
                <th className="text-left py-3 px-4 text-gray-700">分类</th>
                <th className="text-left py-3 px-4 text-gray-700">内容摘要</th>
                <th className="text-left py-3 px-4 text-gray-700">更新时间</th>
                <th className="text-center py-3 px-4 text-gray-700">状态</th>
                <th className="text-center py-3 px-4 text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">{faq.title}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {faq.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-sm">{faq.content}</td>
                  <td className="py-3 px-4 text-gray-500 text-sm">{faq.updatedAt}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleTogglePublish(faq)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          faq.published 
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
                            : 'bg-gray-300'
                        }`}
                        title={faq.published ? '点击下线' : '点击发布'}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            faq.published ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleEditArticle(faq)}
                        className="p-2 hover:bg-blue-50 rounded transition-colors"
                        title="编辑文章"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => handleDeleteArticle(faq)}
                        className="p-2 hover:bg-red-50 rounded transition-colors"
                        title="删除文章"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {faqs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">暂无文章</p>
          </div>
        )}
      </div>

      {/* 新建文章模态框 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  新建文章
                </h2>
                <p className="text-sm text-gray-500">创建新的帮助文档或常见问题</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">文章标题 *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="输入文章标题..."
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">文章分类 *</label>
                <div className="relative">
                  <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white cursor-pointer"
                  >
                    <option value="">请选择分类</option>
                    <option value="账户相关">账户相关</option>
                    <option value="物流相关">物流相关</option>
                    <option value="售后相关">售后相关</option>
                    <option value="支付相关">支付相关</option>
                    <option value="其他问题">其他问题</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">文章内容 *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows={8}
                  placeholder="输入文章内容..."
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-gray-800 text-sm">立即发布</p>
                  <p className="text-gray-500 text-xs">文章将对用户可见</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={formData.published}
                    onChange={(e) => setFormData({...formData, published: e.target.checked})}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-600 peer-checked:to-emerald-600"></div>
                </label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSubmitCreate}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-md transition-all"
              >
                创建文章
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑文章模态框 */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-gray-800 flex items-center gap-2">
                  <Edit className="w-5 h-5 text-blue-600" />
                  编辑文章
                </h2>
                <p className="text-sm text-gray-500">修改文章内容和设置</p>
              </div>
              <button 
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">文章标题 *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="输入文章标题..."
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">文章分类 *</label>
                <div className="relative">
                  <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white cursor-pointer"
                  >
                    <option value="">请选择分类</option>
                    <option value="账户相关">账户相关</option>
                    <option value="物流相关">物流相关</option>
                    <option value="售后相关">售后相关</option>
                    <option value="支付相关">支付相关</option>
                    <option value="其他问题">其他问题</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">文章内容 *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows={8}
                  placeholder="输入文章内容..."
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-gray-800 text-sm">发布状态</p>
                  <p className="text-gray-500 text-xs">控制文章是否对用户可见</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={formData.published}
                    onChange={(e) => setFormData({...formData, published: e.target.checked})}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-600 peer-checked:to-emerald-600"></div>
                </label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSubmitEdit}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-md transition-all"
              >
                保存修改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 删除确认模态框 */}
      {showDeleteModal && currentFaq && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-gray-800 mb-2">确认删除文章？</h2>
                <p className="text-gray-500 text-sm mb-3">
                  您即将删除文章：
                </p>
                <p className="text-gray-800">《{currentFaq.title}》</p>
                <p className="text-red-600 text-sm mt-3">
                  此操作无法撤销，文章将从系统中永久移除
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-md transition-all"
                >
                  确认删除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function CMS() {
  return (
    <DndProvider backend={HTML5Backend}>
      <CMSContent />
    </DndProvider>
  );
}