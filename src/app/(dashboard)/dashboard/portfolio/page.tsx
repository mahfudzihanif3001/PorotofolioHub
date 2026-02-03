'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useCloudinary } from '@/hooks/useCloudinary';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaEyeSlash,
  FaProjectDiagram,
  FaCertificate,
  FaFileAlt,
  FaBriefcase,
  FaGraduationCap,
  FaLink,
  FaImage,
  FaFilePdf,
  FaVideo,
  FaTimes,
  FaCloudUploadAlt
} from 'react-icons/fa';

interface Attachment {
  fileType: 'IMAGE' | 'PDF' | 'LINK' | 'VIDEO';
  url: string;
  publicId?: string;
  label?: string;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  attachments: Attachment[];
  techStack: string[];
  startDate: string;
  endDate: string;
}

const initialFormData: FormData = {
  title: '',
  description: '',
  category: 'PROJECT',
  attachments: [],
  techStack: [],
  startDate: '',
  endDate: '',
};

const categories = [
  { value: 'PROJECT', label: 'Project', icon: FaProjectDiagram },
  { value: 'CERTIFICATE', label: 'Certificate', icon: FaCertificate },
  { value: 'RESUME', label: 'Resume/CV', icon: FaFileAlt },
  { value: 'EXPERIENCE', label: 'Experience', icon: FaBriefcase },
  { value: 'EDUCATION', label: 'Education', icon: FaGraduationCap },
];

export default function PortfolioPage() {
  const { items, isLoading, createItem, updateItem, deleteItem } = usePortfolio();
  const { uploadFile, isUploading, uploadProgress } = useCloudinary();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [techInput, setTechInput] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    PROJECT: FaProjectDiagram,
    CERTIFICATE: FaCertificate,
    RESUME: FaFileAlt,
    EXPERIENCE: FaBriefcase,
    EDUCATION: FaGraduationCap,
  };

  const openModal = (item?: typeof items[0]) => {
    if (item) {
      setEditingId(item._id);
      setFormData({
        title: item.title,
        description: item.description,
        category: item.category,
        attachments: item.attachments,
        techStack: item.techStack,
        startDate: item.startDate ? new Date(item.startDate).toISOString().split('T')[0] : '',
        endDate: item.endDate ? new Date(item.endDate).toISOString().split('T')[0] : '',
      });
    } else {
      setEditingId(null);
      setFormData(initialFormData);
    }
    setError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData(initialFormData);
    setTechInput('');
    setLinkInput('');
    setError('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      try {
        const result = await uploadFile(file);
        setFormData(prev => ({
          ...prev,
          attachments: [...prev.attachments, {
            fileType: result.fileType,
            url: result.url,
            publicId: result.publicId,
          }],
        }));
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }
  };

  const addLink = () => {
    if (!linkInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, {
        fileType: 'LINK',
        url: linkInput.trim(),
      }],
    }));
    setLinkInput('');
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const addTechStack = () => {
    if (!techInput.trim()) return;
    if (!formData.techStack.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, techInput.trim()],
      }));
    }
    setTechInput('');
  };

  const removeTechStack = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
      };

      if (editingId) {
        await updateItem(editingId, payload);
      } else {
        await createItem(payload);
      }
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save item');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteItem(id);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const toggleVisibility = async (item: typeof items[0]) => {
    try {
      await updateItem(item._id, { isVisible: !item.isVisible });
    } catch (err) {
      console.error('Toggle visibility failed:', err);
    }
  };

  const filteredItems = filterCategory === 'ALL' 
    ? items 
    : items.filter(item => item.category === filterCategory);

  const attachmentIcon = (type: string) => {
    switch (type) {
      case 'IMAGE': return FaImage;
      case 'PDF': return FaFilePdf;
      case 'VIDEO': return FaVideo;
      default: return FaLink;
    }
  };

  return (
    <Sidebar>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Portfolio Items</h1>
            <p className="text-gray-600">Manage your projects, certificates, and more</p>
          </div>
          <button onClick={() => openModal()} className="btn btn-primary">
            <FaPlus className="w-4 h-4" />
            Add New Item
          </button>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setFilterCategory('ALL')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filterCategory === 'ALL' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All ({items.length})
          </button>
          {categories.map(cat => {
            const count = items.filter(i => i.category === cat.value).length;
            return (
              <button
                key={cat.value}
                onClick={() => setFilterCategory(cat.value)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  filterCategory === cat.value ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Items Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 spinner border-gray-900 mx-auto" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FaFolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No items yet</h3>
            <p className="text-gray-500 mb-6">Start building your portfolio by adding your first item</p>
            <button onClick={() => openModal()} className="btn btn-primary">
              <FaPlus className="w-4 h-4" />
              Add Your First Item
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => {
              const Icon = categoryIcons[item.category] || FaFileAlt;
              return (
                <div key={item._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Preview Image */}
                  {item.attachments.some(a => a.fileType === 'IMAGE') && (
                    <div className="h-40 bg-gray-100">
                      <img
                        src={item.attachments.find(a => a.fileType === 'IMAGE')?.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                    </div>

                    {item.description && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.description}</p>
                    )}

                    {item.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.techStack.slice(0, 3).map(tech => (
                          <span key={tech} className="badge badge-secondary text-xs">{tech}</span>
                        ))}
                        {item.techStack.length > 3 && (
                          <span className="badge badge-secondary text-xs">+{item.techStack.length - 3}</span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <span className={`badge ${item.isVisible ? 'badge-success' : 'badge-secondary'}`}>
                        {item.isVisible ? 'Visible' : 'Hidden'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {item.attachments.length} attachment{item.attachments.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => toggleVisibility(item)}
                        className="flex-1 btn btn-secondary py-2 text-sm"
                      >
                        {item.isVisible ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => openModal(item)}
                        className="flex-1 btn btn-secondary py-2 text-sm"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex-1 btn btn-danger py-2 text-sm"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {editingId ? 'Edit Item' : 'Add New Item'}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Category */}
                <div>
                  <label className="label">Category</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {categories.map(cat => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                          className={`p-3 rounded-lg border-2 transition-all text-center ${
                            formData.category === cat.value
                              ? 'border-gray-900 bg-gray-900 text-white'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-5 h-5 mx-auto mb-1" />
                          <span className="text-xs font-medium">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="label">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="input"
                    placeholder="e.g., E-Commerce Website"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="label">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="input min-h-[100px]"
                    placeholder="Describe your project, experience, etc."
                  />
                </div>

                {/* Tech Stack (for IT) */}
                {formData.category === 'PROJECT' && (
                  <div>
                    <label className="label">Tech Stack</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
                        className="input flex-1"
                        placeholder="e.g., React, Node.js"
                      />
                      <button type="button" onClick={addTechStack} className="btn btn-secondary">
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.techStack.map(tech => (
                        <span key={tech} className="badge badge-primary flex items-center gap-1">
                          {tech}
                          <button type="button" onClick={() => removeTechStack(tech)}>
                            <FaTimes className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dates */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">End Date</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="input"
                    />
                  </div>
                </div>

                {/* Attachments */}
                <div>
                  <label className="label">Attachments</label>
                  
                  {/* File Upload */}
                  <div className="mb-3">
                    <label className="block w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors text-center">
                      <FaCloudUploadAlt className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-gray-600">Click to upload images, PDFs, or videos</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*,.pdf,video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={isUploading}
                      />
                    </label>
                    {isUploading && (
                      <div className="mt-2">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gray-900 transition-all"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Uploading... {uploadProgress}%</p>
                      </div>
                    )}
                  </div>

                  {/* Link Input */}
                  <div className="flex gap-2 mb-3">
                    <input
                      type="url"
                      value={linkInput}
                      onChange={(e) => setLinkInput(e.target.value)}
                      className="input flex-1"
                      placeholder="Add external link (GitHub, YouTube, etc.)"
                    />
                    <button type="button" onClick={addLink} className="btn btn-secondary">
                      <FaLink className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Attachment List */}
                  {formData.attachments.length > 0 && (
                    <div className="space-y-2">
                      {formData.attachments.map((att, index) => {
                        const Icon = attachmentIcon(att.fileType);
                        return (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Icon className="w-5 h-5 text-gray-600" />
                            <span className="flex-1 truncate text-sm">{att.url}</span>
                            <span className="badge badge-secondary text-xs">{att.fileType}</span>
                            <button
                              type="button"
                              onClick={() => removeAttachment(index)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <FaTimes className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={closeModal} className="flex-1 btn btn-secondary py-3">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || isUploading}
                    className="flex-1 btn btn-primary py-3 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Saving...' : editingId ? 'Update Item' : 'Create Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
}

function FaFolderOpen({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 576 512">
      <path d="M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z"/>
    </svg>
  );
}
