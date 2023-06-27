import moment from "moment";

export function shuffleArray<T>(array: Array<T>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function parseSeconds(seconds: number) {
  const duration = moment.duration(seconds, "seconds");
  const formattedTime = moment.utc(duration.asMilliseconds()).format("m:ss");
  return formattedTime;
}
