import { path } from '../consts';

export type UserRole = 'super_admin' | 'koordinator_lapangan' | 'pj_ruangan' | 'penilai' | 'asisten' | 'calas';

/**
 * Mengembalikan daftar root paths yang boleh diakses berdasarkan role
 */
export const filterPathByRole = (role: UserRole | string): string[] => {
  if (!role) return [];
  
  const accessRules: Record<string, string[]> = {
    super_admin: [
      path.lepkom.dashboard.asisten.default,
      path.lepkom.masterData.default,
      path.lepkom.masterData.asisten.default,
      path.lepkom.masterData.calas.default,
      path.lepkom.masterData.rekrutmen.default,
      path.lepkom.masterData.asisten.resetRequests,
    ],
    koordinator_lapangan: [
      path.lepkom.dashboard.asisten.default,
      path.lepkom.penjadwalan.default,
      path.lepkom.penjadwalan.session.default,
      path.lepkom.penjadwalan.roomAssignment.default,
      path.lepkom.penjadwalan.roomPlacement.default,
      path.lepkom.masterData.calas.default, // Koor butuh melihat data calas untuk timeline
    ],
    pj_ruangan: [
      path.lepkom.dashboard.asisten.default,
      path.lepkom.soal.default,
      path.lepkom.soal.materi.default,
      path.lepkom.soal.daftarSoal.default,
      path.lepkom.soal.questionCard.default,
      path.lepkom.penjadwalan.roomPlacement.default, // PJ Ruangan butuh melihat room placement juga
    ],
    penilai: [
      path.lepkom.dashboard.asisten.default,
      path.lepkom.penilaian.default,
      path.lepkom.penilaian.praktek.default,
      path.lepkom.penilaian.project.default,
    ],
    asisten: [
      path.lepkom.dashboard.asisten.default,
    ],
    calas: [
      path.lepkom.dashboard.calas.default,
      path.lepkom.biodata.default,
      path.lepkom.biodata.personal.default,
      path.lepkom.biodata.pendidikan.default,
      path.lepkom.biodata.keluarga.default,
      path.lepkom.biodata.berkas.default,
      path.lepkom.ujian.default,
      path.lepkom.ujian.praktek.default,
      path.lepkom.ujian.project.default,
    ]
  };

  // Semua user yang login pasti memiliki akses ke halaman profile dan pengumuman umum
  const commonPaths = [
    path.lepkom.default, 
    path.lepkom.profile.default, 
    path.lepkom.profile.changePassword,
    path.lepkom.dashboard.pengumuman.default
  ];
  
  const rolePaths = accessRules[role] || [];

  return [...new Set([...commonPaths, ...rolePaths])];
};
