import React from 'react';
import { Card } from '@/components/ui/Card';
import PaginationPage from '@/components/pagination/PaginationPage';
import type { QuestionCard } from '@/features/master-data/modules/question-card/api/questionCard.api';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Search, HelpCircle } from 'lucide-react';

export interface QuestionCardListProps {
  data?: QuestionCard[];
  totalData?: number;
  pageSize: number;
  currentPage: number;
  isLoading?: boolean;
  isError?: boolean;
  searchValue: string;
  kategoriValue: string;
  tingkatValue: string;
  onSearchChange: (value: string) => void;
  onKategoriChange: (value: string) => void;
  onTingkatChange: (value: string) => void;
  onPageChange: (key: string, value: number) => void;
  onCardClick: (card: QuestionCard) => void;
  title?: string;
  subtitle?: string;
  variant?: 'standalone' | 'embedded';
}

const colorMap: Record<string, 'info' | 'success' | 'warning' | 'default'> = {
  materi: 'default',
  teknis: 'info',
  kepribadian: 'warning',
  motivasi: 'success',
};

export const QuestionCardList: React.FC<QuestionCardListProps> = ({
  data,
  totalData = 0,
  pageSize,
  currentPage,
  isLoading = false,
  isError = false,
  searchValue,
  kategoriValue,
  tingkatValue,
  onSearchChange,
  onKategoriChange,
  onTingkatChange,
  onPageChange,
  onCardClick,
  title,
  subtitle,
  variant = 'standalone',
}) => {
  const isEmbedded = variant === 'embedded';

  return (
    <Card
      className={`flex flex-col gap-6 ${
        isEmbedded
          ? 'rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm'
          : 'bg-transparent shadow-none border-none'
      }`}
    >
      {/* Optional Header for Embedded Mode */}
      {isEmbedded && title && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-50 text-lepkom-green">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{title}</h2>
              {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Control Bar (Search & Filters) */}
      <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            placeholder="Cari judul pertanyaan..."
            className="pl-10 h-10 w-full bg-white border-gray-200 text-sm focus:border-lepkom-green"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <select
            className="h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lepkom-green/20 focus:border-lepkom-green bg-white text-sm min-w-[150px]"
            value={kategoriValue}
            onChange={(e) => onKategoriChange(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            <option value="materi">Materi</option>
            <option value="teknis">Teknis</option>
            <option value="kepribadian">Kepribadian</option>
            <option value="motivasi">Motivasi</option>
          </select>

          <select
            className="h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lepkom-green/20 focus:border-lepkom-green bg-white text-sm min-w-[140px]"
            value={tingkatValue}
            onChange={(e) => onTingkatChange(e.target.value)}
          >
            <option value="">Semua Tingkat</option>
            <option value="1">Tingkat 1</option>
            <option value="2">Tingkat 2</option>
            <option value="3">Tingkat 3</option>
          </select>
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 mt-2">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(pageSize)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl border border-gray-200 h-36 animate-pulse flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-14"></div>
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm text-center">
            <p className="text-red-500 font-medium">Gagal memuat data question card.</p>
          </div>
        ) : data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((qc) => (
              <div
                key={qc._id}
                onClick={() => onCardClick(qc)}
                className="group flex flex-col justify-between bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-lepkom-green/40 transition-all cursor-pointer min-h-[148px]"
              >
                <p className="font-medium text-gray-800 line-clamp-3 leading-relaxed group-hover:text-lepkom-green transition-colors text-sm">
                  {qc.judulPertanyaan}
                </p>
                <div className="mt-4 flex items-end justify-between pt-2 border-t border-gray-100 gap-2">
                  <div className="flex flex-col items-start gap-1 min-w-0">
                    <Badge variant={colorMap[qc.kategori] || 'default'} className="capitalize text-xs">
                      {qc.kategori}
                    </Badge>
                    {qc.namaMateri && (
                      <span
                        className="text-xs text-gray-500 font-medium truncate max-w-[150px]"
                        title={qc.namaMateri}
                      >
                        {qc.namaMateri}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 font-medium whitespace-nowrap mb-0.5">
                    Tingkat {qc.tingkat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm text-center">
            <p className="text-lg font-medium text-gray-700">Tidak ada pertanyaan</p>
            <p className="text-sm text-gray-500 mt-1">
              Belum ada question card yang ditambahkan atau sesuai filter.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm mt-3">
        <PaginationPage
          totalData={totalData}
          pageSize={pageSize}
          currentPage={currentPage}
          setPageSize={onPageChange}
          loading={isLoading}
        />
      </div>
    </Card>
  );
};

export default QuestionCardList;
