/* eslint-disable import/prefer-default-export */
/**
 * min =< ret < max
 */
export function randInt(min, max) {
  const range = max - min;
  const rand = Math.random() * range;
  return Math.floor(Math.random() * range) + min;
}
export async function asyncForEach(array, callback) {
  await Promise.all(array.map((e, i) => callback(e, i, array)));
}
