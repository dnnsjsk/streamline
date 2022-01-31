export function checkIfStringStartsWith(str, substrs) {
  return substrs.some((substr) =>
    str.toLowerCase().startsWith(substr.toLowerCase())
  );
}
