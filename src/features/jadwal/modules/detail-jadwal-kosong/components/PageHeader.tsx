import React from 'react';
import { Download } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface PageHeaderProps {
  judul: string;
  dibuatOleh: { nama: string; idAsisten: string; };
  createdAt: string;
  onExport: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ judul, dibuatOleh, createdAt, onExport }) => {
  return (
    <Card className="p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{judul}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <p>
              <span className="font-semibold text-gray-600">Dibuat oleh:</span> {dibuatOleh?.nama} ({dibuatOleh?.idAsisten})
            </p>
            <p>
              <span className="font-semibold text-gray-600">Tanggal dibuat:</span> {new Date(createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium shadow-sm"
        >
          <Download size={18} />
          Export Excel
        </button>
      </div>
    </Card>
  );
};
