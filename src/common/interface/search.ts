import { Dispatch, FormEvent, SetStateAction } from "react";

export interface SearchBarProps {
  search?: string | undefined;
  setSearch?: Dispatch<SetStateAction<string>> | undefined;
  searchHandler?: (e: React.FormEvent) => Promise<void> | void;
}
