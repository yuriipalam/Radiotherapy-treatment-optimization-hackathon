type RegionsType =
  | "Craniospinal"
  | "Breast"
  | "Breast special"
  | "Head & neck"
  | "Abdomen"
  | "Pelvis"
  | "Lung"
  | "Crane"
  | "Lung special"
  | "Whole brain";

type ResourceType = "TB1" | "TB2" | "VB1" | "VB2" | "U";

interface Appointment {
  start: Date;
  end: Date;
  title: string; // full name
  id?: string; // unique id
  region?: RegionsType;
  resource: ResourceType; // doctor
  taj?: string; // taj number
}

export default Appointment;
