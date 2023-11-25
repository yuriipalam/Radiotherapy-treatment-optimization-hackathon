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

const initialPatients: Patient[] = [
  {
    fullname: "Nagy Erzsébet",
    tajNumber: "234567890",
    numberOfFractions: 25,
    region: "Breast",
    birthDate: "1985-05-15",
    weight: 65,
    height: 165,
    inpatient: true,
    sessionsLeft: 20,
  },
  {
    fullname: "Szabó Gábor",
    tajNumber: "345678901",
    numberOfFractions: 28,
    region: "Head & neck",
    birthDate: "1982-09-20",
    weight: 75,
    height: 175,
    inpatient: false,
    sessionsLeft: 28,
  },
  {
    fullname: "Kovács Andrea",
    tajNumber: "456789012",
    numberOfFractions: 35,
    region: "Abdomen",
    birthDate: "1978-12-10",
    weight: 68,
    height: 160,
    inpatient: true,
    sessionsLeft: 30,
  },
  {
    fullname: "Tóth József",
    tajNumber: "567890123",
    numberOfFractions: 22,
    region: "Pelvis",
    birthDate: "1995-03-25",
    weight: 90,
    height: 185,
    inpatient: false,
    sessionsLeft: 22,
  },
  {
    fullname: "Molnár Zsuzsanna",
    tajNumber: "678901234",
    numberOfFractions: 30,
    region: "Lung",
    birthDate: "1987-07-07",
    weight: 62,
    height: 170,
    inpatient: true,
    sessionsLeft: 25,
  },
  {
    fullname: "Farkas Béla",
    tajNumber: "789012345",
    numberOfFractions: 28,
    region: "Crane",
    birthDate: "1980-11-18",
    weight: 78,
    height: 175,
    inpatient: false,
    sessionsLeft: 28,
  },
  {
    fullname: "Varga Éva",
    tajNumber: "890123456",
    numberOfFractions: 32,
    region: "Lung special",
    birthDate: "1992-04-30",
    weight: 70,
    height: 160,
    inpatient: true,
    sessionsLeft: 30,
  },
  {
    fullname: "Balázs István",
    tajNumber: "901234567",
    numberOfFractions: 26,
    region: "Whole Brain",
    birthDate: "1983-08-14",
    weight: 85,
    height: 180,
    inpatient: false,
    sessionsLeft: 26,
  },
];

export default initialPatients;