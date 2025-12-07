import { useState } from 'react';
import { Save, Power, UserX, Tag, EyeOff, DollarSign, MessageSquare, Bell, Coins, Image, Link, Upload } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function SystemConfig() {
  const [toggles, setToggles] = useState({
    maintenance: false,
    registration: true,
    promotion: true,
    priceDisplay: true,
  });

  const [params, setParams] = useState({
    exchangeRate: '7.25',
    platformFee: '2.5',
    whatsappLink: 'https://wa.me/1234567890',
    announcement: '欢迎使用我们的平台！限时促销活动进行中...',
    currencyFormat: 'CNY',
  });

  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [frontendLink, setFrontendLink] = useState('https://www.example.com');

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleParamChange = (key: keyof typeof params, value: string) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // 模拟保存过程
    toast.loading('正在保存配置...', { id: 'save-config' });
    
    setTimeout(() => {
      toast.success('配置已成功保存！', {
        id: 'save-config',
        description: '所有设���已应用到系统',
        duration: 3000,
      });
      console.log('保存配置:', { toggles, params, bannerImage, logoImage, frontendLink });
    }, 1000);
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        toast.error('上传失败', {
          description: '请选择有效的图片文件',
        });
        return;
      }

      // 验证文件大小（限制5MB）
      if (file.size > 5 * 1024 * 1024) {
        toast.error('上传失败', {
          description: '图片大小不能超过 5MB',
        });
        return;
      }

      toast.loading('正在上传横幅图片...', { id: 'banner-upload' });

      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result as string);
        toast.success('横幅图片上传成功！', {
          id: 'banner-upload',
          description: `${file.name} 已上传`,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        toast.error('上传失败', {
          description: '请选择有效的图片文件',
        });
        return;
      }

      // 验证文件大小（限制5MB）
      if (file.size > 5 * 1024 * 1024) {
        toast.error('上传失败', {
          description: '图片大小不能超过 5MB',
        });
        return;
      }

      toast.loading('正在上传 Logo 图片...', { id: 'logo-upload' });

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result as string);
        toast.success('Logo 图片上传成功！', {
          id: 'logo-upload',
          description: `${file.name} 已上传`,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const featureToggles = [
    {
      key: 'maintenance' as const,
      label: '开启维护模式',
      description: '启用后用户将无法访问系统',
      icon: Power,
      color: 'text-red-600',
    },
    {
      key: 'registration' as const,
      label: '允许新用户注册',
      description: '控制新用户注册功能',
      icon: UserX,
      color: 'text-blue-600',
    },
    {
      key: 'promotion' as const,
      label: '开启促销横幅',
      description: '在首页显示促销活动横幅',
      icon: Tag,
      color: 'text-purple-600',
    },
    {
      key: 'priceDisplay' as const,
      label: '显示价格信息',
      description: '控制产品价格的显示',
      icon: EyeOff,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h1 className="text-gray-800 mb-2">系统配置中心</h1>
        <p className="text-gray-600">远程控制移动端应用的行为和参数</p>
      </div>

      {/* 功能开关组 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Power className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-gray-800">功能开关</h2>
            <p className="text-gray-600 text-sm">实时控制应用端的功能状态</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {featureToggles.map((toggle) => {
            const Icon = toggle.icon;
            const isEnabled = toggles[toggle.key];
            
            return (
              <div 
                key={toggle.key}
                className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <Icon className={`w-5 h-5 ${toggle.color} mt-0.5`} />
                    <div className="flex-1">
                      <h3 className="text-gray-800 mb-1">{toggle.label}</h3>
                      <p className="text-gray-500 text-sm">{toggle.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle(toggle.key)}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${isEnabled ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-300'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${isEnabled ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 全局参数设置 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-gray-800">全局参数设置</h2>
            <p className="text-gray-600 text-sm">配置系统运行的关键参数</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">
              货币格式选择
            </label>
            <div className="relative">
              <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={params.currencyFormat}
                onChange={(e) => handleParamChange('currencyFormat', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white cursor-pointer"
              >
                <option value="CNY">CNY - 人民币 (¥)</option>
                <option value="USD">USD - 美元 ($)</option>
                <option value="EUR">EUR - 欧元 (€)</option>
                <option value="GBP">GBP - 英镑 (£)</option>
                <option value="JPY">JPY - 日元 (¥)</option>
                <option value="KRW">KRW - 韩元 (₩)</option>
                <option value="HKD">HKD - 港币 (HK$)</option>
                <option value="SGD">SGD - 新币 (S$)</option>
              </select>
            </div>
            <p className="text-gray-500 text-sm mt-1">选择平台默认货币格式</p>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              当前汇率
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={params.exchangeRate}
                onChange={(e) => handleParamChange('exchangeRate', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="7.25"
              />
            </div>
            <p className="text-gray-500 text-sm mt-1">1 USD = CNY</p>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              平台手续费 (%)
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={params.platformFee}
                onChange={(e) => handleParamChange('platformFee', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="2.5"
              />
            </div>
            <p className="text-gray-500 text-sm mt-1">每笔交易收取的手续费比例</p>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              客服 WhatsApp 链接
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={params.whatsappLink}
                onChange={(e) => handleParamChange('whatsappLink', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://wa.me/1234567890"
              />
            </div>
            <p className="text-gray-500 text-sm mt-1">用户点击客服时跳转的链接</p>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              滚动公告内容
            </label>
            <div className="relative">
              <Bell className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                value={params.announcement}
                onChange={(e) => handleParamChange('announcement', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="输入公告内容..."
              />
            </div>
            <p className="text-gray-500 text-sm mt-1">显示在应用顶部的滚动通知</p>
          </div>
        </div>
      </div>

      {/* 前端资源设置 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
            <Image className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-gray-800">前端资源设置</h2>
            <p className="text-gray-600 text-sm">管理前端应用的视觉资源和链接</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* 上传横幅 */}
          <div>
            <label className="block text-gray-700 mb-2">
              上传横幅图片
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-purple-400 transition-colors">
              {bannerImage ? (
                <div className="relative">
                  <img
                    src={bannerImage}
                    alt="横幅预览"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setBannerImage(null);
                      toast.info('横幅图片已移除');
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-gray-600 text-sm mb-1">点击上传横幅图片</span>
                  <span className="text-gray-400 text-xs">推荐尺寸: 1920x400px</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-gray-500 text-sm mt-1">用于首页顶部横幅展示</p>
          </div>

          {/* 上传Logo */}
          <div>
            <label className="block text-gray-700 mb-2">
              上传前端 Logo
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-purple-400 transition-colors">
              {logoImage ? (
                <div className="relative">
                  <img
                    src={logoImage}
                    alt="Logo预览"
                    className="w-full h-40 object-contain rounded-lg bg-gray-50"
                  />
                  <button
                    onClick={() => {
                      setLogoImage(null);
                      toast.info('Logo 图片已移除');
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-gray-600 text-sm mb-1">点击上传 Logo 图片</span>
                  <span className="text-gray-400 text-xs">推荐尺寸: 400x400px (PNG)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-gray-500 text-sm mt-1">用于前端应用的品牌标识</p>
          </div>

          {/* 前端链接 */}
          <div className="col-span-2">
            <label className="block text-gray-700 mb-2">
              前端应用链接
            </label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={frontendLink}
                onChange={(e) => setFrontendLink(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://www.example.com"
              />
            </div>
            <div className="flex items-start gap-2 mt-2">
              <p className="text-gray-500 text-sm flex-1">
                前端应用的访问地址，用户将通过此链接访问您的应用
              </p>
              {frontendLink && (
                <a
                  href={frontendLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 text-sm whitespace-nowrap flex items-center gap-1"
                >
                  <span>访问链接</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 悬浮保存按钮 */}
      <div className="fixed bottom-6 right-6 z-10">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105"
        >
          <Save className="w-5 h-5" />
          <span>保存配置</span>
        </button>
      </div>
    </div>
  );
}