export interface IData<T> {
  isLoading: boolean;
  data: T | undefined | [];
  refetch: () => void;
  mutateAsync?: (data: any) => Promise<any>;
}
