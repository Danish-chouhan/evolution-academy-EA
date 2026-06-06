'use client';

import React, { useState, useEffect } from 'react';
import { useContent } from './ContentProvider';
import { createPortal } from 'react-dom';

type EditableTextProps = {
  contentKey: string;
  defaultText: string;
  className?: string;
  as?: React.ElementType;
  allowHtml?: boolean;
};

type TextSegment = {
  id: number;
  type: 'text' | 'br' | 'element';
  content: string;
  tagName?: string;
  attributes?: { name: string; value: string }[];
};

export default function EditableText({
  contentKey,
  defaultText,
  className = '',
  as: Component = 'span',
  allowHtml = false,
}: EditableTextProps) {
  const { isAdmin, content, updateContent } = useContent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const [segments, setSegments] = useState<TextSegment[]>([]);
  const [mounted, setMounted] = useState(false);
  
  const textContent = content[contentKey] ?? defaultText;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isAdmin) {
    if (allowHtml) {
      return <Component className={className} dangerouslySetInnerHTML={{ __html: textContent }} />;
    }
    return <Component className={className}>{textContent}</Component>;
  }

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (allowHtml) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(textContent, 'text/html');
      const newSegments: TextSegment[] = [];
      
      doc.body.childNodes.forEach((node, index) => {
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.textContent && node.textContent.trim() !== '') {
            newSegments.push({ id: index, type: 'text', content: node.textContent });
          } else if (node.textContent) {
            newSegments.push({ id: index, type: 'text', content: node.textContent });
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          if (el.tagName === 'BR') {
            newSegments.push({ id: index, type: 'br', content: '<br />' });
          } else {
            newSegments.push({ 
              id: index, 
              type: 'element', 
              tagName: el.tagName.toLowerCase(), 
              attributes: Array.from(el.attributes).map(a => ({ name: a.name, value: a.value })),
              content: el.textContent || ''
            });
          }
        }
      });
      setSegments(newSegments);
    } else {
      setTempValue(textContent);
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    let newValue = tempValue;
    if (allowHtml) {
      newValue = segments.map(seg => {
        if (seg.type === 'text') return seg.content;
        if (seg.type === 'br') return '<br />';
        if (seg.type === 'element') {
          const attrs = seg.attributes?.map(a => `${a.name}="${a.value}"`).join(' ') || '';
          return `<${seg.tagName}${attrs ? ' ' + attrs : ''}>${seg.content}</${seg.tagName}>`;
        }
        return '';
      }).join('');
    }
    
    if (newValue !== textContent) {
      updateContent(contentKey, newValue);
    }
    setIsModalOpen(false);
  };

  const modal = mounted && isModalOpen ? createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm" onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}>
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-3xl border border-gray-100 flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Edit Content</h3>
          <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors">✕</button>
        </div>
        
        <div className="mb-6">
          <span className="text-xs font-bold text-brand-purple bg-purple-50 px-2 py-1 rounded font-mono border border-purple-100">{contentKey}</span>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 mb-6 space-y-4">
          {allowHtml ? (
            <>
              {segments.map((seg, i) => {
                if (seg.type === 'br') {
                  return (
                    <div key={seg.id} className="flex justify-between items-center p-3 rounded-xl border border-gray-200 bg-gray-100/50">
                      <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-1 rounded">LINE BREAK (↵)</span>
                      <button onClick={() => setSegments(segments.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500 transition-colors w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-50">✕</button>
                    </div>
                  );
                }
                
                const getColorOption = () => {
                  if (seg.type === 'text') return 'normal';
                  const classAttr = seg.attributes?.find(a => a.name === 'class' || a.name === 'className');
                  if (!classAttr) return 'normal';
                  if (classAttr.value.includes('text-transparent')) return 'gradient';
                  if (classAttr.value.includes('text-brand-purple')) return 'purple';
                  if (classAttr.value.includes('text-brand-orange') || classAttr.value.includes('text-orange')) return 'orange';
                  if (classAttr.value.includes('text-red')) return 'red';
                  return 'normal';
                };

                const handleColorChange = (color: string) => {
                  const newSegments = [...segments];
                  const s = newSegments[i];
                  if (color === 'normal') {
                    s.type = 'text';
                    s.tagName = undefined;
                    s.attributes = [];
                  } else {
                    s.type = 'element';
                    s.tagName = 'span';
                    let className = '';
                    if (color === 'gradient') className = 'text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-purple';
                    else if (color === 'purple') className = 'text-brand-purple';
                    else if (color === 'orange') className = 'text-brand-orange';
                    else if (color === 'red') className = 'text-red-500';
                    s.attributes = [{ name: 'class', value: className }];
                  }
                  setSegments(newSegments);
                };

                return (
                  <div key={seg.id} className="flex flex-col gap-2 p-3 rounded-xl border border-gray-200 bg-gray-50 relative group">
                     <div className="flex justify-between items-center">
                       <select 
                         value={getColorOption()} 
                         onChange={(e) => handleColorChange(e.target.value)}
                         className="text-xs font-bold uppercase tracking-wider px-2 py-1.5 rounded-lg bg-white border border-gray-300 text-black outline-none focus:ring-2 focus:ring-brand-purple/30 cursor-pointer shadow-sm"
                       >
                         <option value="normal">⚫ Normal Text</option>
                         <option value="gradient">🌈 Gradient Text</option>
                         <option value="purple">🟣 Purple Text</option>
                         <option value="orange">🟠 Orange Text</option>
                         <option value="red">🔴 Red Text</option>
                       </select>
                       
                       <button onClick={() => setSegments(segments.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500 transition-colors w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-50" title="Delete Segment">
                         ✕
                       </button>
                     </div>
                     <textarea
                       value={seg.content}
                       onChange={(e) => {
                         const newSegments = [...segments];
                         newSegments[i].content = e.target.value;
                         setSegments(newSegments);
                       }}
                       className="w-full min-h-[40px] p-2 bg-transparent text-black placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none border border-transparent hover:border-gray-300 rounded-lg font-medium text-sm transition-all resize-y mt-1"
                       placeholder="Enter text..."
                     />
                  </div>
                );
              })}
              
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => {
                    const newId = segments.length > 0 ? Math.max(...segments.map(s => s.id)) + 1 : 0;
                    setSegments([...segments, { id: newId, type: 'text', content: 'New Text' }]);
                  }} 
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 rounded-xl text-sm border border-gray-200 border-dashed transition-colors flex justify-center items-center gap-2"
                >
                  <span className="text-lg leading-none">+</span> Add Text
                </button>
                <button 
                  onClick={() => {
                    const newId = segments.length > 0 ? Math.max(...segments.map(s => s.id)) + 1 : 0;
                    setSegments([...segments, { id: newId, type: 'br', content: '<br />' }]);
                  }} 
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-xl text-sm border border-gray-200 border-dashed transition-colors flex justify-center items-center gap-2"
                  title="Add Line Break"
                >
                  <span className="text-lg leading-none">↵</span> Break
                </button>
              </div>
            </>
          ) : (
            <textarea
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full h-48 p-4 border border-gray-300 rounded-xl font-medium text-sm text-black placeholder-gray-500 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all resize-y"
              placeholder="Enter text here..."
            />
          )}
        </div>
        
        <div className="flex justify-end gap-3 mt-auto pt-4 border-t border-gray-100">
          <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl text-gray-700 font-bold hover:bg-gray-100 transition-colors">Cancel</button>
          <button onClick={handleSave} className="px-6 py-2.5 rounded-xl bg-brand-purple text-white font-bold shadow-lg shadow-purple-500/30 hover:bg-brand-purple/90 transition-all hover:-translate-y-0.5">Save Changes</button>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  const editClassName = `${className} hover:outline hover:outline-2 hover:outline-dashed hover:outline-red-500 hover:bg-red-50/50 cursor-pointer transition-all ${className.includes('inline') || className.includes('block') || className.includes('flex') ? '' : 'inline-block'}`;

  return (
    <>
      {allowHtml ? (
        <Component
          onClick={handleOpenModal}
          className={editClassName}
          dangerouslySetInnerHTML={{ __html: textContent }}
        />
      ) : (
        <Component
          onClick={handleOpenModal}
          className={editClassName}
        >
          {textContent}
        </Component>
      )}
      {modal}
    </>
  );
}
