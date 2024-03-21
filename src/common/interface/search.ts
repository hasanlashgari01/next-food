import { Dispatch, FormEvent, SetStateAction } from "react";

export interface SearchBar {
  search?: string | undefined;
  setSearch?: Dispatch<SetStateAction<string>> | undefined;
  searchHandler?: (e: FormEvent) => void | undefined;
}
