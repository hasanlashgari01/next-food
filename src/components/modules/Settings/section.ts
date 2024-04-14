import { IUser } from "@/common/interface/user";

export interface Props {
  isLoading: boolean;
  data: IUser | undefined;
  refetch: () => void;
  mutateAsync: (data: any) => Promise<any>;
}
