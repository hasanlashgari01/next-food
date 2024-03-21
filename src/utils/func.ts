const recursivePath = (pathname: string) => {
  const currentPath = pathname.split("/").slice(-1).toString();
  const parentPath = pathname.split("/")[2].toString();

  return { currentPath, parentPath };
};

const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
  fixNumbers = function (str: string | number) {
    if (typeof str === "string") {
      for (var i = 0; i < 10; i++) {
        str = str.replace(persianNumbers[i], i.toString());
      }
    }
    return str;
  };

export { fixNumbers, recursivePath };
