export const save = (s) => {
  localStorage.setItem('state', JSON.stringify({ ...load(), ...s }));
};
export const load = () => {
  const s = localStorage.getItem('state');
  try {
    return JSON.parse(s);
  } catch (_) {
    return {};
  }
};
