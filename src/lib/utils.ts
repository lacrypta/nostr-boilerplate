export const parseTags = (tags: string[][]): { [key: string]: string[] } => {
  const res = {};

  tags.forEach(([k, ...rest]) => {
    if (!res[k]) {
      res[k] = [];
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    res[k].push(rest);
  });
  return res;
};
