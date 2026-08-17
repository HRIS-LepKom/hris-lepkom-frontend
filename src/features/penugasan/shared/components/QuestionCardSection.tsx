import React, { useState, useEffect } from 'react';
import { useGetAllQuestionCards } from '@/features/master-data/modules/question-card/api/questionCard.api';
import type { QuestionCard } from '@/features/master-data/modules/question-card/api/questionCard.api';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import QuestionCardDetail from '@/features/master-data/modules/question-card/components/QuestionCardDetail';
import { QuestionCardList } from '@/features/shared/question-card';

export const QuestionCardSection: React.FC = () => {
  const { setDialogContent, setOpenDialog } = useDialogStore();

  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [kategori, setKategori] = useState('');
  const [tingkat, setTingkat] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const queryParams = new URLSearchParams();
  queryParams.set('page', String(currentPage));
  queryParams.set('limit', String(pageSize));

  if (debouncedSearch.trim()) {
    queryParams.set('search', debouncedSearch.trim());
  }
  if (kategori) {
    queryParams.set('kategori', kategori);
  }
  if (tingkat) {
    queryParams.set('tingkat', tingkat);
  }

  const queryString = `?${queryParams.toString()}`;
  const { data, isLoading, isError } = useGetAllQuestionCards(queryString);

  const handleCardClick = (qc: QuestionCard) => {
    setDialogContent({
      title: 'Detail Question Card',
      body: <QuestionCardDetail data={qc} />,
      size: 'md',
      action: {
        cancel: { text: 'Tutup', onCallback: () => setOpenDialog('defaultDialog', false) },
      },
    });
  };

  const handleKategoriChange = (val: string) => {
    setKategori(val);
    setCurrentPage(1);
  };

  const handleTingkatChange = (val: string) => {
    setTingkat(val);
    setCurrentPage(1);
  };

  const handlePaginationChange = (key: string, value: number) => {
    if (key === 'currentPage') {
      setCurrentPage(value);
    } else if (key === 'pageSize') {
      setPageSize(value);
      setCurrentPage(1);
    }
  };

  return (
    <QuestionCardList
      variant="embedded"
      title="Question Card (Bank Soal)"
      subtitle="Referensi bank pertanyaan dan pedoman penilaian saat wawancara."
      data={data?.data}
      totalData={data?.totalData || 0}
      pageSize={pageSize}
      currentPage={currentPage}
      isLoading={isLoading}
      isError={isError}
      searchValue={searchInput}
      kategoriValue={kategori}
      tingkatValue={tingkat}
      onSearchChange={setSearchInput}
      onKategoriChange={handleKategoriChange}
      onTingkatChange={handleTingkatChange}
      onPageChange={handlePaginationChange}
      onCardClick={handleCardClick}
    />
  );
};

export default QuestionCardSection;
