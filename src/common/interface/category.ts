export interface Category {
  _id: string;
  title: string;
  slug: string;
  icon: string;
  parents: string[];
}

export interface CategoryChildren extends Category {
  children: Category[];
  parent: string;
}

export interface CategoryProps extends Category {
  children: Category[];
}
