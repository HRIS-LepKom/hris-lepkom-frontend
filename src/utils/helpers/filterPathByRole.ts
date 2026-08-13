import { path } from '../consts';

export type UserRole = 'super_admin' | 'pj_soal_materi' | 'penanggung_jawab_ruangan' | 'koordinator_lapangan' | 'asisten_penilai' | 'asisten' | 'staff' | 'calas' | string;

export const filterPathByRole = (role: UserRole): string[] => {
  if (!role) return [];
  
  const accessRules: Record<string, string[]> = {
    super_admin: [
      path.lepkom.default, 
    ],
    pj_soal_materi: [
      path.lepkom.dashboard.default,
      path.lepkom.masterData.asisten.default,
      path.lepkom.masterData.asisten.detailAsisten,
      path.lepkom.masterData.calas.default,
      path.lepkom.masterData.calas.detailCalas,
      path.lepkom.masterData.materi.default,
      path.lepkom.masterData.soal.default,
      path.lepkom.masterData.questionCard.default,
      path.lepkom.calasSoal.default,
      path.lepkom.calasSoal.daftarSoal.default,
      path.lepkom.calasSoal.uploadJawaban.default,
      path.lepkom.jadwal.default,
      path.lepkom.jadwal.jadwalKosong.default,
      path.lepkom.jadwal.jadwalKosong.detail,
    ],
    penanggung_jawab_ruangan: [
      path.lepkom.dashboard.default,
      path.lepkom.masterData.asisten.default,
      path.lepkom.masterData.asisten.detailAsisten,
      path.lepkom.masterData.calas.default,
      path.lepkom.masterData.calas.detailCalas,
      path.lepkom.masterData.materi.default,
      path.lepkom.masterData.questionCard.default,
      path.lepkom.penugasan.default,
      path.lepkom.penugasan.checkUploadJawaban.default,
      path.lepkom.penugasan.penempatanRuanganAsisten.default,
      path.lepkom.penugasan.penempatanRuanganCalas.default,
      path.lepkom.penugasan.historyPenilaian.default,
      path.lepkom.jadwal.default,
      path.lepkom.jadwal.jadwalKosong.default,
      path.lepkom.jadwal.jadwalKosong.detail,
    ],
    koordinator_lapangan: [
      path.lepkom.dashboard.default,
      path.lepkom.masterData.asisten.default,
      path.lepkom.masterData.asisten.detailAsisten,
      path.lepkom.masterData.calas.default,
      path.lepkom.masterData.calas.detailCalas,
      path.lepkom.penugasan.default,
      path.lepkom.penugasan.checkUploadJawaban.default,
      path.lepkom.penugasan.penempatanRuanganAsisten.default,
      path.lepkom.penugasan.penempatanRuanganCalas.default,
      path.lepkom.masterData.materi.default,
      path.lepkom.masterData.questionCard.default,
      path.lepkom.masterData.calas.default,
      path.lepkom.jadwal.default,
      path.lepkom.jadwal.jadwalKosong.default,
      path.lepkom.jadwal.jadwalKosong.detail,
    ],
    asisten_penilai: [
      path.lepkom.dashboard.default,
      path.lepkom.masterData.asisten.default,
      path.lepkom.masterData.asisten.detailAsisten,
      path.lepkom.masterData.calas.default,
      path.lepkom.masterData.calas.detailCalas,
      path.lepkom.masterData.materi.default,
      path.lepkom.masterData.questionCard.default,
      path.lepkom.penugasan.default,
      path.lepkom.penugasan.praktek.default,
      path.lepkom.penugasan.praktek.form,
      path.lepkom.penugasan.project.default,
      path.lepkom.penugasan.project.form,
      path.lepkom.penugasan.checkUploadJawaban.default,
      path.lepkom.jadwal.default,
      path.lepkom.jadwal.jadwalKosong.default,
      path.lepkom.jadwal.jadwalKosong.detail,
    ],
    asisten: [
      path.lepkom.masterData.materi.default,
      path.lepkom.dashboard.default,
      path.lepkom.masterData.asisten.default,
      path.lepkom.masterData.asisten.detailAsisten,
      path.lepkom.jadwal.default,
      path.lepkom.jadwal.jadwalKosong.default,
      path.lepkom.jadwal.jadwalKosong.detail,
    ],
    staff: [
      path.lepkom.masterData.materi.default,
      path.lepkom.masterData.questionCard.default,
      path.lepkom.dashboard.default,
      path.lepkom.masterData.asisten.default,
      path.lepkom.masterData.asisten.detailAsisten,
      path.lepkom.jadwal.default,
      path.lepkom.jadwal.jadwalKosong.default,
      path.lepkom.jadwal.jadwalKosong.detail,
    ],
    calas: [
      path.lepkom.dashboard.default,
      path.lepkom.biodata.default,
      path.lepkom.biodata.personal.default,
      path.lepkom.biodata.pendidikan.default,
      path.lepkom.biodata.keluarga.default,
      path.lepkom.biodata.berkas.default,
      path.lepkom.calasSoal.default,
      path.lepkom.calasSoal.daftarSoal.default,
      path.lepkom.calasSoal.uploadJawaban.default,
      path.lepkom.biodata.hasil.default
    ]
  };

  const commonPaths = [
    path.lepkom.dashboard.default,
    path.lepkom.profile.default, 
    path.lepkom.profile.changePassword,
    path.lepkom.dashboard.pengumuman.default
  ];
  
  const rolePaths = accessRules[role] || [];

  return [...new Set([...commonPaths, ...rolePaths])];
};
