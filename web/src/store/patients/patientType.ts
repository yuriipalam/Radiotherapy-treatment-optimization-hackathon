export interface Patient {
  fullname: string;
  tajNumber: string;
  numberOfFractions: number;
  region: string;
  birthDate: string;
  weight: number;
  height: number;
  inpatient: boolean;
  sessionsLeft: number;
  finished?: boolean;
}