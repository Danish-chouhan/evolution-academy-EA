'use client';

import { useState, useEffect } from 'react';

type ContentBlock = {
  page: string;
  section: string;
  data: Record<string, string>;
};

export default function ContentEditor() {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedPage, setSelectedPage] = useState('home');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');

  const fetchContent = async (page: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/content?page=${page}`);
      const data = await res.json();
      if (res.ok) {
        setContentBlocks(data.content || []);
        if (data.content && data.content.length > 0) {
          handleSelectSection(data.content[0]);
        } else {
          setSelectedSection(null);
          setFormData({});
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent(selectedPage);
  }, [selectedPage]);

  const handleSelectSection = (block: ContentBlock) => {
    setSelectedSection(block.section);
    setFormData(block.data);
    setMessage('');
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!selectedSection) return;
    
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: selectedPage,
          section: selectedSection,
          data: formData
        })
      });
      
      if (res.ok) {
        setMessage('Saved successfully!');
        // Update local state
        setContentBlocks(prev => prev.map(block => 
          block.section === selectedSection ? { ...block, data: formData } : block
        ));
      } else {
        setMessage('Failed to save.');
      }
    } catch (err) {
      setMessage('Error saving content.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[700px]">
      {/* Page & Section Selector Sidebar */}
      <div className="w-full md:w-64 border-r border-gray-700 bg-gray-800/50 p-4 overflow-y-auto">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Pages</h3>
        <select 
          className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white mb-6"
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
        >
          <option value="home">Home Page</option>
          <option value="about">About Page</option>
          {/* Add more pages later */}
        </select>

        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Sections</h3>
        {loading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : contentBlocks.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No editable sections found for this page yet.</p>
        ) : (
          <ul className="space-y-1">
            {contentBlocks.map((block) => (
              <li key={block.section}>
                <button
                  onClick={() => handleSelectSection(block)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedSection === block.section 
                      ? 'bg-red-600 text-white font-medium' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {block.section}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Editor Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {!selectedSection ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <p>Select a section from the left sidebar to edit its content.</p>
          </div>
        ) : (
          <div className="max-w-3xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedSection} Editor</h2>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            {message && (
              <div className={`mb-6 p-4 rounded-lg ${message.includes('success') ? 'bg-green-900/50 text-green-200 border border-green-500' : 'bg-red-900/50 text-red-200 border border-red-500'}`}>
                {message}
              </div>
            )}

            <div className="space-y-6">
              {Object.keys(formData).map((key) => {
                const value = formData[key];
                const isImage = key.toLowerCase().includes('image') || value.startsWith('http') || value.startsWith('/');
                const isLongText = value.length > 50 || key.toLowerCase().includes('subtitle') || key.toLowerCase().includes('description');

                return (
                  <div key={key} className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                    <label className="block text-sm font-semibold text-gray-300 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    
                    {isImage ? (
                      <div className="space-y-3">
                        {value && <img src={value} alt="Preview" className="h-32 object-contain bg-gray-800 rounded border border-gray-600 p-2" />}
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500 outline-none"
                          placeholder="/images/example.png or https://..."
                        />
                      </div>
                    ) : isLongText ? (
                      <textarea
                        value={value}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500 outline-none h-32"
                      />
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500 outline-none"
                      />
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      {key.includes('Html') ? 'Note: HTML tags (like <span>, <br/>) are allowed here.' : ''}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
