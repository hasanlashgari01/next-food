interface ITab {
  id: number;
  name: string;
  path: string;
  default?: boolean;
}

export const tabs: ITab[] = [
  { id: 0, name: "درباره شما", path: "about", default: true },
  { id: 1, name: "امنیت", path: "security" },
  { id: 2, name: "تنظیمات پیشرفته", path: "advanced" },
];

export const listTabs: ITab[] = [
  { id: 0, name: "لایک شده ها", path: "likes", default: true },
  { id: 1, name: "نشان شده ها", path: "bookmarks" },
];
