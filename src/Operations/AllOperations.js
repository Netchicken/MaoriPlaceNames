export function GetRandomNumber(length) {
  //  setNumber(randomNumber);
  let min = 0;
  let max = length;
  return Math.floor(Math.random() * (max - min + 1) + min);
}
