const randomEl = (list) => {
  var i = Math.floor(Math.random() * list.length);
  return list[i];
}

export const generateRandomName = () => {
  return randomEl(adjectives) + " " + randomEl(nouns);
}

const adjectives = ["smelly", "silly", "funny"];
const nouns = ["bananas", "socks", "elephants"];