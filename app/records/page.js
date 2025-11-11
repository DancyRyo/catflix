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
    <div className="min-h-screen text-gray-900 flex flex-col relative">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto py-16 px-8 w-full">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-5xl font-bold gradient-text">
              {language === 'cn' ? '我的记录' : 'My Records'}
            </h1>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/records/reading-mode')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl hover:scale-105"
              >
                <BookOpen size={18} />
                {language === 'cn' ? '阅读模式' : 'Reading Mode'}
              </button>
              <button
                onClick={() => router.push('/featured-lists')}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Star size={18} />
                {language === 'cn' ? '精选榜单' : 'Featured Lists'}
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Plus size={18} />
                {language === 'cn' ? '添加记录' : 'Add Record'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-3 bg-white/80 backdrop-blur-lg p-2 rounded-2xl border border-white/60 shadow-lg w-fit">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold transition-all duration-300 flex items-center gap-2 rounded-xl ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <IconComponent size={20} />
                {language === 'cn' ? tab.cn : tab.en}
              </button>
            );
          })}
        </div>

        {/* Status Filter */}
        <div className="mb-8 flex gap-4">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:scale-105 ${statusFilter === 'all'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-white/60'
              }`}
          >
            {language === 'cn' ? '全部' : 'All'} ({tabRecords.length})
          </button>
          <button
            onClick={() => setStatusFilter('watched')}
            className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:scale-105 ${statusFilter === 'watched'
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
              : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-white/60'
              }`}
          >
            {language === 'cn' ? '已看' : 'Watched'} (
            {tabRecords.filter((r) => r.status === 'watched').length})
          </button>
          <button
            onClick={() => setStatusFilter('wishlist')}
            className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:scale-105 ${statusFilter === 'wishlist'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
              : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-white/60'
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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredRecords.map((record, index) => (
              <RecordCard key={index} record={record} onEdit={handleEdit} />
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
