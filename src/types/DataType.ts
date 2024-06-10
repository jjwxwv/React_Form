import { Dayjs } from "dayjs";

export type DataType = {
  id: number | null;
  title: string | null;
  firstname: string | null;
  lastname: string | null;
  birthday: Dayjs | null;
  nationality: string | null;
  citizen1: string | null;
  citizen2: string | null;
  citizen3: string | null;
  citizen4: string | null;
  citizen5: string | null;
  gender: string | null;
  country: string | null;
  phoneNo: string | null;
  passportNo: string | null;
  salary: string | null;
};
