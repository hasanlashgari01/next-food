const recursivePath = (pathname: string) => {
  return pathname.split("/").slice(-1).toString();
};

export { recursivePath };
