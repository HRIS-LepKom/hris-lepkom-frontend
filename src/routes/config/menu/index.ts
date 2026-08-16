import { dashboardMenu } from './dashboard';
import { masterDataMenu } from './master-data';
import { biodataMenu } from './biodata';
import { calasSoalMenu } from './soal-calas';
import { penugasanMenu } from './penugasan';
import { jadwalMenu } from './jadwal';

export * from './dashboard';
export * from './master-data';
export * from './biodata';
export * from './penugasan';
export * from './soal-calas';
export * from './jadwal';

export const mainMenus = [
  dashboardMenu,
  masterDataMenu,
  biodataMenu,
  calasSoalMenu,
  penugasanMenu,
  jadwalMenu,
];