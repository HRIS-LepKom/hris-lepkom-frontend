import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSubmitPenilaianPraktek } from '../api/penilaianPraktek.api';
import { Button } from '@/components/ui/Button';
import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { useEffect } from 'react';
import { path } from '@/utils/consts';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { usePenilaianPraktekStore } from '../../penilaian-praktek/store/usePenilaianPraktekStore';
import { useGetDetailCalas } from '@/features/master-data/modules/detail-calas/api/detailCalas.api';
import { toast } from 'react-hot-toast';
import { RubricScaleCard } from '../../../shared/components/RubricScaleCard';
import { CalasInfoCard } from '../../../shared/components/CalasInfoCard';
import { QuestionCardSection } from '../../../shared/components/QuestionCardSection';
import { PRAKTEK_CRITERIA_GUIDELINES, getScoreGrade } from '../../../shared/constants/rubric';

const schema = z.object({
  konsep: z.number().min(0).max(100),
  eksekusi: z.number().min(0).max(100),
  analisa: z.number().min(0).max(100),
  klarifikasi: z.number().min(0).max(100),
  deskripsi: z.string().min(5, 'Deskripsi minimal 5 karakter'),
});

type FormValues = z.infer<typeof schema>;

const FormPraktek = () => {
  const { examSessionId, calasId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { setBreadcrumbItems } = useBreadcrumbStore();
  const submitMutation = useSubmitPenilaianPraktek();
  const storeCalas = usePenilaianPraktekStore((state) => state.selectedCalas);

  // Fetch calas detail to ensure complete data from database
  const { data: detailData, isLoading: isDetailLoading } = useGetDetailCalas(calasId || '');
  const calas = (detailData as any) ?? location.state?.calas ?? storeCalas;

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Penilaian Praktek', path: path.lepkom.penugasan.praktek.default },
      { label: 'Form Penilaian', path: '#' },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      konsep: 0,
      eksekusi: 0,
      analisa: 0,
      klarifikasi: 0,
      deskripsi: '',
    },
  });

  const watchValues = watch();
  const totalScore =
    ((Number(watchValues.konsep) || 0) +
      (Number(watchValues.eksekusi) || 0) +
      (Number(watchValues.analisa) || 0) +
      (Number(watchValues.klarifikasi) || 0)) /
    4;
  const currentGrade = getScoreGrade(totalScore);

  const handleScoreInput = (value: string, onChange: (val: number | string) => void) => {
    if (value === '') return onChange('');
    const num = parseInt(value, 10);
    if (isNaN(num)) return;
    if (num < 0) return onChange(0);
    if (num > 100) return onChange(100);
    onChange(num);
  };

  const onSubmit = (data: FormValues) => {
    if (!examSessionId || !calasId) {
      toast.error('Data parameter tidak lengkap!');
      return;
    }
    submitMutation.mutate(
      {
        calasId,
        examSessionId,
        deskripsi: data.deskripsi,
        kriteria: {
          konsep: Number(data.konsep),
          eksekusi: Number(data.eksekusi),
          analisa: Number(data.analisa),
          klarifikasi: Number(data.klarifikasi),
        },
      },
      {
        onSuccess: () => {
          toast.success('Nilai berhasil disimpan!');
          navigate(path.lepkom.penugasan.praktek.default);
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || 'Gagal menyimpan nilai');
        },
      }
    );
  };

  return (
    <ContentLayout>
      {/* Page header */}
      <div className="flex items-center gap-3.5 mb-6">
        <Button
          variant="outline"
          onClick={() => navigate(path.lepkom.penugasan.praktek.default)}
          className="h-10 w-10 p-0 rounded-full flex-shrink-0"
        >
          <FiArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Form Penilaian Praktek</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Wawancara Praktik &amp; Pemahaman Materi
          </p>
        </div>
      </div>

      {/* Two-column layout: Kolom 1 (30% sticky) & Kolom 2 (70% scrollable) */}
      <div className="grid grid-cols-1 lg:grid-cols-[70%_1fr] gap-6 items-start overflow-y-auto max-h-[800px]">
        {/* Left scrollable column 70%*/}
        <div className="w-full min-w-0 flex flex-col gap-5 pb-12">
          {/* Form card */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Section header */}
              <div className="border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">A. Praktik</h3>
                <p className="text-sm text-gray-500 mt-0.5 mb-5">
                  Pemahaman materi, eksekusi soal, dan kemampuan analisa saat praktik.
                </p>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                  Kriteria Penilaian
                </p>
              </div>

              {/* Criteria grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {PRAKTEK_CRITERIA_GUIDELINES.map((item) => {
                  const val = watchValues[item.name as keyof FormValues];
                  const numVal = Number(val) || 0;
                  const fieldGrade = getScoreGrade(numVal);
                  const fieldError = errors[item.name as keyof typeof errors];
                  const hasValue =
                    typeof val === 'number' ? val > 0 : val !== '' && val !== undefined;

                  return (
                    <div key={item.name} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-base font-semibold text-gray-900">
                          {item.number}. {item.label}
                        </label>
                        {hasValue && !fieldError && (
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded border ${fieldGrade.badgeClass}`}
                          >
                            Grade {fieldGrade.grade}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed min-h-[36px]">
                        {item.description}
                      </p>
                      <Controller
                        name={item.name as keyof FormValues}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="number"
                            min={0}
                            max={100}
                            style={{ MozAppearance: 'textfield' } as React.CSSProperties}
                            className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full border rounded-lg px-3.5 py-2.5 text-sm font-semibold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-lepkom-green/20 transition-all ${
                              fieldError
                                ? 'border-red-400 focus:border-red-400'
                                : 'border-gray-200 focus:border-lepkom-green'
                            }`}
                            placeholder="0 – 100"
                            value={
                              typeof field.value === 'number' && field.value === 0
                                ? ''
                                : field.value === ''
                                ? ''
                                : field.value
                            }
                            onChange={(e) => handleScoreInput(e.target.value, field.onChange)}
                          />
                        )}
                      />
                      {fieldError && (
                        <p className="text-red-500 text-xs font-medium">
                          {fieldError.message as string}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Deskripsi */}
              <div className="flex flex-col gap-1.5">
                <label className="text-base font-semibold text-gray-900">
                  Deskripsi &amp; Catatan Penilai
                </label>
                <p className="text-sm text-gray-500">
                  Tuliskan evaluasi naratif, kekuatan, dan catatan penting performa calon asisten
                  selama ujian praktik.
                </p>
                <Controller
                  name="deskripsi"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      rows={4}
                      className={`w-full border rounded-lg px-3.5 py-2.5 text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-lepkom-green/20 resize-none transition-all ${
                        errors.deskripsi
                          ? 'border-red-400 focus:border-red-400'
                          : 'border-gray-200 focus:border-lepkom-green'
                      }`}
                      placeholder="Contoh: Calas mampu menyelesaikan soal fundamental dengan baik, logika analisa tajam dan penjelasan sistematis..."
                    />
                  )}
                />
                {errors.deskripsi && (
                  <p className="text-red-500 text-xs font-medium">{errors.deskripsi.message}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end items-center gap-3 pt-3 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(path.lepkom.penugasan.praktek.default)}
                  className="rounded-lg px-5 text-sm font-medium"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="bg-lepkom-green hover:bg-lepkom-green/90 text-white gap-2 rounded-lg px-6 text-sm font-semibold shadow-sm hover:shadow transition-all"
                >
                  <FiSave className="w-4 h-4" />
                  {submitMutation.isPending ? 'Menyimpan...' : 'Simpan Penilaian'}
                </Button>
              </div>
            </form>
          </div>
        </div>
        {/* Right sticky column 30% */}
        <div className="w-full sticky top-6 flex flex-col gap-4">
          {/* Calas info card */}
          <CalasInfoCard calas={calas} isLoading={isDetailLoading && !calas} />

          {/* Total score card Grade sejajar dengan Skor 0.00/100 */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Total Rata-Rata Sementara
            </p>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-lepkom-green leading-none">
                  {totalScore.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 font-medium">/ 100</span>
              </div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold border ${currentGrade.badgeClass}`}
              >
                Grade {currentGrade.grade} — {currentGrade.label}
              </span>
            </div>
          </div>
          <RubricScaleCard />
        </div>
      </div>

      {/* Question Card */}
      <QuestionCardSection />
    </ContentLayout>
  );
};

export default FormPraktek;
