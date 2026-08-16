import React from 'react';
import useTableFiltersSortUrlSync from '@/hooks/shared/useTableFiltersSortUrlSync';
import { path } from '@/utils/consts';
import { useGetAllQuestionCards } from '../api/questionCard.api';
import type { QuestionCard } from '../api/questionCard.api';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import QuestionCardDetail from './QuestionCardDetail';
import { QuestionCardList } from '@/features/shared/question-card';

const QuestionCardGrid: React.FC = () => {
  const { setDialogContent, setOpenDialog } = useDialogStore();

  const {
    columnFilters,
    setColumnFilters,
    setState,
    pageSize,
    currentPage,
  } = useTableFiltersSortUrlSync({ listUrlBase: path.lepkom.masterData.questionCard.default });

  const queryParams = new URLSearchParams();
  queryParams.set('page', String(currentPage));
  queryParams.set('limit', String(pageSize));

  columnFilters.forEach((filter) => {
    queryParams.set(filter.id, filter.value);
  });

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

  const getFilterValue = (id: string) => columnFilters.find((f) => f.id === id)?.value || '';

  const handleFilterChange = (id: string, value: string) => {
    setColumnFilters((prev) => {
      const existing = prev.find((f) => f.id === id);
      if (value === '') {
        return prev.filter((f) => f.id !== id);
      }
      if (existing) {
        return prev.map((f) => (f.id === id ? { ...f, value } : f));
      }
      return [...prev, { id, value }];
    });
  };

  return (
    <QuestionCardList
      variant="standalone"
      data={data?.data}
      totalData={data?.totalData || 0}
      pageSize={pageSize}
      currentPage={currentPage}
      isLoading={isLoading}
      isError={isError}
      searchValue={getFilterValue('search')}
      kategoriValue={getFilterValue('kategori')}
      tingkatValue={getFilterValue('tingkat')}
      onSearchChange={(val) => handleFilterChange('search', val)}
      onKategoriChange={(val) => handleFilterChange('kategori', val)}
      onTingkatChange={(val) => handleFilterChange('tingkat', val)}
      onPageChange={setState}
      onCardClick={handleCardClick}
    />
  );
};

export default QuestionCardGrid;
