export interface IData<T> {
  isLoading?: boolean;
  data: T;
  refetch?: () => void;
  mutateAsync?: (data: any) => Promise<any>;
}
