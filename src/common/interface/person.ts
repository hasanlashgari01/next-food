export interface Person {
  _id: string;
  fullName: string;
  mobile: string;
  verifiedAccount: boolean;
  gender: "male" | "female" | "other";
  role: "ADMIN" | "USER";
}
