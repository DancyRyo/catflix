'use client';

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecordForm from '../components/RecordForm';
import RecordCard from '../components/RecordCard';
import { useRouter } from 'next/navigation';
import { BookOpen, Gamepad2, Film, Palette, Star, Plus } from 'lucide-react';

export default function RecordsPage() {
  const { language, records, getRecordsByType } = useApp();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('books');
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all'); // all, watched, wishlist

  const tabs = [
    { id: 'books', cn: '书籍', en: 'Books', icon: BookOpen },
    { id: 'games', cn: '游戏', en: 'Games', icon: Gamepad2 },
    { id: 'movies', cn: '电影', en: 'Movies', icon: Film },
    { id: 'anime', cn: '动漫', en: 'Anime', icon: Palette },
  ];

  const currentTabData = tabs.find((tab) => tab.id === activeTab);
  const tabRecords = getRecordsByType(activeTab);

  // Filter by status
  const filteredRecords = tabRecords.filter((record) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'watched') return record.status === 'watched';
    if (statusFilter === 'wishlist') return record.status === 'wishlist';
    return true;
  });

  const handleEdit = (record) => {
    setEditingRecord(record);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingRecord(null);
  };

  return (
    <div className="min-h-screen bg-purple-50 text-gray-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto py-12 px-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-purple-600">
              {language === 'cn' ? '我的记录' : 'My Records'}
            </h1>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/records/reading-mode')}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2"
              >
                <BookOpen size={18} />
                {language === 'cn' ? '阅读模式' : 'Reading Mode'}
              </button>
              <button
                onClick={() => router.push('/featured-lists')}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2"
              >
                <Star size={18} />
                {language === 'cn' ? '精选榜单' : 'Featured Lists'}
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2"
              >
                <Plus size={18} />
                {language === 'cn' ? '添加记录' : 'Add Record'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-gray-200">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <IconComponent size={20} />
                {language === 'cn' ? tab.cn : tab.en}
              </button>
            );
          })}
        </div>

        {/* Status Filter */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              statusFilter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {language === 'cn' ? '全部' : 'All'} ({tabRecords.length})
          </button>
          <button
            onClick={() => setStatusFilter('watched')}
            className={`px-4 py-2 rounded-lg transition-all ${
              statusFilter === 'watched'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {language === 'cn' ? '已看' : 'Watched'} (
            {tabRecords.filter((r) => r.status === 'watched').length})
          </button>
          <button
            onClick={() => setStatusFilter('wishlist')}
            className={`px-4 py-2 rounded-lg transition-all ${
              statusFilter === 'wishlist'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {language === 'cn' ? '想看' : 'Wishlist'} (
            {tabRecords.filter((r) => r.status === 'wishlist').length})
          </button>
        </div>

        {/* Records Grid */}
        {filteredRecords.length === 0 ? (
          <div className="text-center py-20">
            {currentTabData && (
              <>
                {(() => {
                  const IconComponent = currentTabData.icon;
                  return <IconComponent className="w-24 h-24 mx-auto mb-4 text-purple-300" />;
                })()}
              </>
            )}
            <p className="text-gray-500 text-lg">
              {language === 'cn'
                ? `还没有${currentTabData?.cn}记录，点击上方按钮添加吧！`
                : `No ${currentTabData?.en} records yet. Click the button above to add one!`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map((record) => (
              <RecordCard key={record.id} record={record} onEdit={handleEdit} />
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Record Form Modal */}
      {showForm && (
        <RecordForm
          type={activeTab}
          editingRecord={editingRecord}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
