 export function formatSeconds(sec) {
  const totalSec = Math.floor(sec);
  const min = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${min}:${s.toString().padStart(2, '0')}`;
}