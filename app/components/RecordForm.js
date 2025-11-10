'use client';

import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Star, X, Upload, Link as LinkIcon } from 'lucide-react';

export default function RecordForm({ type, editingRecord, onClose }) {
  const { language, addRecord, updateRecord } = useApp();
  const [formData, setFormData] = useState({
    type: type,
    title: '',
    image: '',
    note: '',
    feelings: '',
    rating: 0,
    status: 'wishlist', // wishlist or watched
  });

  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (editingRecord) {
      setFormData(editingRecord);
      setImagePreview(editingRecord.image);
    }
  }, [editingRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImagePreview(url);
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRecord) {
      updateRecord(editingRecord.id, formData);
    } else {
      addRecord(formData);
    }
    onClose();
  };

  const typeLabels = {
    books: { cn: '书籍', en: 'Book' },
    games: { cn: '游戏', en: 'Game' },
    movies: { cn: '电影', en: 'Movie' },
    anime: { cn: '动漫', en: 'Anime' },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingRecord
              ? language === 'cn'
                ? '编辑记录'
                : 'Edit Record'
              : language === 'cn'
              ? `添加${typeLabels[type].cn}记录`
              : `Add ${typeLabels[type].en} Record`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Status Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'cn' ? '状态' : 'Status'}
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, status: 'wishlist' }))
                }
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                  formData.status === 'wishlist'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {language === 'cn' ? '想看' : 'Wishlist'}
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, status: 'watched' }))
                }
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                  formData.status === 'watched'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {language === 'cn' ? '已看' : 'Watched'}
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'cn' ? '标题' : 'Title'} *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder={
                language === 'cn'
                  ? `输入${typeLabels[type].cn}标题`
                  : `Enter ${typeLabels[type].en} title`
              }
            />
          </div>

          {/* Image Upload/URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'cn' ? '图片' : 'Image'}
            </label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">
                  {language === 'cn' ? '或输入图片链接：' : 'Or enter image URL:'}
                </span>
              </div>
              <input
                type="url"
                value={formData.image}
                onChange={handleImageUrlChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'cn' ? '备注' : 'Note'}
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder={
                language === 'cn' ? '添加一些备注...' : 'Add some notes...'
              }
            />
          </div>

          {/* Feelings */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'cn' ? '内心感受' : 'Feelings'}
            </label>
            <textarea
              name="feelings"
              value={formData.feelings}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder={
                language === 'cn'
                  ? '记录你的感受和想法...'
                  : 'Record your feelings and thoughts...'
              }
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'cn' ? '评分' : 'Rating'}
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, rating: star }))
                  }
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={star <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                </button>
              ))}
              <span className="ml-2 text-gray-600 self-center">
                {formData.rating > 0 ? `${formData.rating}/5` : language === 'cn' ? '未评分' : 'Not rated'}
              </span>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-semibold"
            >
              {language === 'cn' ? '取消' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-semibold"
            >
              {editingRecord
                ? language === 'cn'
                  ? '保存'
                  : 'Save'
                : language === 'cn'
                ? '添加'
                : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
