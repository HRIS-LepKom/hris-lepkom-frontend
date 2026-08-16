import React from 'react';
import { path } from '@/utils/consts';

export interface CalasInfoData {
  _id?: string;
  idCalas?: string;
  namaCalas?: string;
  npm?: string;
  kelas?: string;
  jurusan?: string;
  ipk?: number;
  asalSekolah?: string;
  wilayah?: string;
}

interface CalasInfoCardProps {
  calas?: CalasInfoData | null;
  isLoading?: boolean;
}

const Field: React.FC<{ label: string; value?: string | number | null; isBold?: boolean }> = ({
  label,
  value,
  isBold = false,
}) => {
  if (value === undefined || value === null || value === '') return null;
  return (
    <li className="flex items-start justify-between gap-3">
      <span className="text-gray-500 text-xs font-medium flex-shrink-0 pt-0.5">{label}</span>
      <span
        className={`text-sm text-right ${
          isBold ? 'font-bold text-gray-900' : 'font-medium text-gray-800'
        }`}
      >
        {value}
      </span>
    </li>
  );
};

export const CalasInfoCard: React.FC<CalasInfoCardProps> = ({ calas, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm animate-pulse space-y-4">
        <div className="space-y-2 pb-3 border-b border-gray-100">
          <div className="h-3 bg-gray-200 rounded w-24" />
          <div className="h-5 bg-gray-200 rounded w-48" />
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-full" />
        </div>
      </div>
    );
  }

  if (!calas) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Calon Asisten
        </p>
        <p className="text-sm text-gray-500 text-center py-4">Data calas tidak tersedia.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Card Header: Calon Asisten & Nama */}
      <div className="mb-4 pb-3 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
          Calon Asisten
        </p>
        <h3 className="font-bold text-gray-900 text-lg leading-snug">{calas.namaCalas || '-'}</h3>
      </div>

      {/* Field List: ID Calas, NPM, Kelas, IPK, Jurusan, Asal Sekolah */}
      <ul className="space-y-2.5">
        <Field label="ID Calas" value={calas.idCalas} isBold />
        <Field label="NPM" value={calas.npm} />
        <Field label="Kelas" value={calas.kelas} />
        {calas.ipk !== undefined && calas.ipk !== null && (
          <li className="flex items-start justify-between gap-3">
            <span className="text-gray-500 text-xs font-medium flex-shrink-0 pt-0.5">IPK</span>
            <span className="font-bold text-gray-900 text-sm text-right">{calas.ipk}</span>
          </li>
        )}
        <Field label="Jurusan" value={calas.jurusan} />
        <Field label="Asal Sekolah" value={calas.asalSekolah} />
      </ul>

      {/* Action Button: Detail Calas */}
      {calas._id && (
        <button
          type="button"
          onClick={() =>
            window.open(`${path.lepkom.masterData.calas.detailCalas}/${calas._id}`, '_blank')
          }
          className="mt-4 w-full text-xs text-lepkom-green border border-lepkom-green/30 hover:bg-lepkom-green hover:text-white rounded-lg py-2 font-semibold transition-colors"
        >
          Lihat Detail
        </button>
      )}
    </div>
  );
};
