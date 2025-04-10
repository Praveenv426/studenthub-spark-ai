
import React from 'react';
import { FileText, BookOpen, Video, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  type: 'pdf' | 'ppt' | 'video';
  uploadedAt: string;
  size?: string;
}

interface StudyMaterialCardProps {
  materials: StudyMaterial[];
  className?: string;
}

const StudyMaterialCard: React.FC<StudyMaterialCardProps> = ({ materials, className }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText size={18} className="text-red-500" />;
      case 'ppt':
        return <BookOpen size={18} className="text-orange-500" />;
      case 'video':
        return <Video size={18} className="text-blue-500" />;
      default:
        return <FileText size={18} />;
    }
  };

  return (
    <div className={cn("bg-studenthub-card rounded-lg border border-gray-700 shadow-lg", className)}>
      <div className="p-4 border-b border-gray-700">
        <h3 className="font-medium text-lg">Latest Study Materials</h3>
      </div>
      <div className="divide-y divide-gray-700">
        {materials.map((material) => (
          <div key={material.id} className="p-4 hover:bg-gray-800 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getIcon(material.type)}
                <div>
                  <h4 className="font-medium">{material.title}</h4>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-studenthub-text-secondary">{material.subject}</span>
                    <span className="mx-2 text-xs text-studenthub-text-secondary">•</span>
                    <span className="text-xs text-studenthub-text-secondary">{material.uploadedAt}</span>
                    {material.size && (
                      <>
                        <span className="mx-2 text-xs text-studenthub-text-secondary">•</span>
                        <span className="text-xs text-studenthub-text-secondary">{material.size}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-studenthub-primary/20 text-studenthub-primary">
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gray-700 text-center">
        <button className="text-sm text-studenthub-primary hover:underline">
          View All Materials
        </button>
      </div>
    </div>
  );
};

export default StudyMaterialCard;
