export const parseBadgeEvents = (tags) => {
  const badgeEvents = [];

  for (let i = 0; i < tags.length; i++) {
    if (tags[i][0] === "a" && tags[i + 1][0] === "e") {
      const splitted = tags[i][1].split(":");
      badgeEvents.push({
        award: {
          id: splitted[1],
          kind: splitted[0],
          dTag: splitted[2],
        },
        definition: { id: tags[i + 1][1] },
      });
    }
  }

  return badgeEvents;
};
