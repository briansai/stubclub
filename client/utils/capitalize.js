export const capitalize = str => {
  const sentence = [];
  const words = str.split(' ');
  for (let word of words) {
    sentence.push(word[0].toUpperCase() + word.slice(1));
  }
  return sentence.join(' ');
};
