'use client';

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Edit2, Trash2, Star } from 'lucide-react';

export default function RecordCard({ record, onEdit }) {
  const { language, deleteRecord } = useApp();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    deleteRecord(record.id);
    setShowDeleteConfirm(false);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(language === 'cn' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/60 hover:border-purple-400/50">
      {/* Image */}
      {record.image && (
        <div className="h-70 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
          <img
            src={record.image}
            alt={record.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Status Badge */}
        <div className="flex justify-between items-start mb-3">
          <span
            className={`inline-block px-3 py-1 rounded-xl text-xs font-bold shadow-sm ${record.status === 'watched'
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
              }`}
          >
            {record.status === 'watched'
              ? language === 'cn'
                ? '已看'
                : 'Watched'
              : language === 'cn'
                ? '想看'
                : 'Wishlist'}
          </span>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(record)}
              className="text-purple-600 hover:text-purple-800 transition-all p-1.5 rounded-lg hover:bg-purple-50"
              title={language === 'cn' ? '编辑' : 'Edit'}
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-red-600 hover:text-red-800 transition-all p-1.5 rounded-lg hover:bg-red-50"
              title={language === 'cn' ? '删除' : 'Delete'}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {record.title}
        </h3>

        {/* Rating */}
        {record.rating > 0 && (
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < record.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
            <span className="ml-1 text-xs text-gray-600">
              {record.rating}/5
            </span>
          </div>
        )}

        {/* Note */}
        {record.note && (
          <p className="text-gray-600 text-xs mb-2 line-clamp-2">
            {record.note}
          </p>
        )}

        {/* Feelings */}
        {record.feelings && (
          <div className="mb-2 p-2 bg-purple-50 rounded-lg">
            <p className="text-xs text-gray-700 line-clamp-2">
              {record.feelings}
            </p>
          </div>
        )}

        {/* Date */}
        <p className="text-xs text-gray-500">
          {language === 'cn' ? '添加于：' : 'Added on: '}
          {formatDate(record.createdAt)}
        </p>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 max-w-sm mx-4 shadow-2xl border border-white/60 transform transition-all">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'cn' ? '确认删除' : 'Confirm Delete'}
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {language === 'cn'
                ? '确定要删除这条记录吗？此操作无法撤销。'
                : 'Are you sure you want to delete this record? This action cannot be undone.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold shadow-md hover:shadow-lg"
              >
                {language === 'cn' ? '取消' : 'Cancel'}
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl hover:from-red-600 hover:to-rose-600 transition-all font-semibold shadow-md hover:shadow-lg"
              >
                {language === 'cn' ? '删除' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
