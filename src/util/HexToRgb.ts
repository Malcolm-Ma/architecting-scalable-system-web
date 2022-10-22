/**
 * @file convert hex to rgb
 * @author Mingze Ma
 */

export function convertToRGB(h: string) {
  const r = parseInt(h.slice(1, 3), 16);
  const g = parseInt(h.slice(3, 5), 16);
  const b = parseInt(h.slice(5, 7), 16);

  return "rgb("+ +r + "," + +g + "," + +b + ")";
}

