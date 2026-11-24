import type { Glow } from "./glow";

// The Figma «Фон» layer (page «Сайт — 1440»), in the 1440px frame with
// y = 0 at the top of the page, under the header.

// A first-screen glow drifts to its phase-2 place and back (Figma's
// component «Туманность — первый экран», Фаза 1 ↔ 2). Brighter in
// phase 2 when alpha2 is set.
export interface DriftingGlow extends Glow {
  x2: number;
  y2: number;
  alpha2?: number;
}

const TOP_HAZE: DriftingGlow = {
  x: -287.3, y: -298.9, w: 1000, h: 520, rot: -10, color: "#0084ff", alpha: 0.26, blur: 190, x2: -207.3, y2: -268.9,
};

// Home: a nebula behind the particle logo, kept dim enough that the
// logo's light-blue dots stand out on it (the mockup's alphas washed them
// out: core 0.34→0.16, clump 0.32→0.12, the rest about two thirds).
export const HOME_NEBULA: DriftingGlow[] = [
  TOP_HAZE,
  { x: 572.4, y: 8.3, w: 1150, h: 720, rot: -12, color: "#0084ff", alpha: 0.14, blur: 200, x2: 622.4, y2: -16.7 },
  { x: 791.1, y: 153.2, w: 640, h: 420, rot: -20, color: "#0084ff", alpha: 0.24, blur: 130, x2: 731.1, y2: 183.2 },
  { x: 848.3, y: 359.5, w: 420, h: 300, rot: 15, color: "#55bbff", alpha: 0.16, blur: 110, x2: 883.3, y2: 384.5, alpha2: 0.2 },
  { x: 447, y: 60.3, w: 760, h: 210, rot: -22, color: "#389fff", alpha: 0.18, blur: 120, x2: 377, y2: 35.3 },
  { x: 1000.5, y: 712, w: 560, h: 180, rot: 28, color: "#55bbff", alpha: 0.15, blur: 110, x2: 1055.5, y2: 747 },
  { x: 1035, y: 335, w: 170, h: 150, color: "#bfe6ff", alpha: 0.12, blur: 60, x2: 1055, y2: 315, alpha2: 0.15 },
  // Dust lanes: darker streaks across the bright core.
  { x: 743.7, y: 406.8, w: 620, h: 120, rot: -14, color: "#000000", alpha: 0.45, blur: 55, x2: 703.7, y2: 421.8 },
  { x: 1046.1, y: 342.7, w: 380, h: 90, rot: 20, color: "#000000", alpha: 0.35, blur: 45, x2: 1076.1, y2: 322.7 },
];

// Inner pages: a lighter cloud in the top-right corner.
export const SECTION_NEBULA: DriftingGlow[] = [
  TOP_HAZE,
  { x: 663.8, y: -153.6, w: 1100, h: 640, rot: -14, color: "#0084ff", alpha: 0.285, blur: 190, x2: 713.8, y2: -178.6 },
  { x: 747.3, y: 59.5, w: 600, h: 300, rot: -6, color: "#389fff", alpha: 0.285, blur: 140, x2: 687.3, y2: 89.5 },
  { x: 957.2, y: 369.1, w: 420, h: 150, rot: 22, color: "#55bbff", alpha: 0.25, blur: 100, x2: 1007.2, y2: 399.1 },
  { x: 1060, y: 186, w: 200, h: 160, color: "#bfe6ff", alpha: 0.18, blur: 70, x2: 1080, y2: 166, alpha2: 0.225 },
];

// Stars of the home nebula: [x, y, size, opacity].
export const HOME_STARS: [number, number, number, number][] = [
  [1368, 310, 1, 0.245], [1112, 340, 2, 0.488], [1118, 610, 3, 0.436], [920, 374, 3, 0.469], [796, 610, 2, 0.361],
  [1293, 183, 3, 0.381], [1214, 579, 3, 0.41], [1360, 373, 3, 0.301], [979, 206, 3, 0.284], [955, 802, 2, 0.401],
  [1339, 135, 2, 0.273], [1096, 410, 2, 0.237], [796, 368, 3, 0.305], [1370, 481, 2, 0.224], [947, 367, 2, 0.341],
  [1111, 557, 2, 0.255], [1062, 746, 3, 0.436], [1101, 474, 2, 0.46], [1022, 628, 3, 0.263], [991, 341, 2, 0.326],
  [1339, 174, 3, 0.519], [1028, 207, 1, 0.185], [905, 571, 3, 0.215], [1151, 195, 2, 0.565], [1348, 763, 3, 0.558],
  [942, 98, 3, 0.262], [761, 559, 1, 0.254], [1083, 612, 2, 0.257], [915, 374, 3, 0.552], [1083, 92, 1, 0.561],
];

// «Туманность — по странице»: a cloud of three glows every 1300px on the
// left, another 917px lower on the right, each nudged sideways in turn.
const PAGE_PERIOD = 1300;
const LEFT_SHIFT = [0, 80, 40];
const RIGHT_SHIFT = [0, 40, -40];

const leftCloud = (top: number, dx: number): Glow[] => [
  { x: -286.2 + dx, y: top, w: 1100, h: 640, rot: -14, color: "#0084ff", alpha: 0.15, blur: 190 },
  { x: -202.7 + dx, y: top + 213.1, w: 600, h: 300, rot: -6, color: "#389fff", alpha: 0.15, blur: 140 },
  { x: 7.2 + dx, y: top + 522.7, w: 420, h: 150, rot: 22, color: "#55bbff", alpha: 0.13, blur: 100 },
];

const rightCloud = (top: number, dx: number): Glow[] => [
  { x: 618.9 + dx, y: top, w: 1100, h: 640, rot: 14, color: "#0084ff", alpha: 0.15, blur: 190 },
  { x: 1006 + dx, y: top + 9.6, w: 600, h: 300, rot: 6, color: "#389fff", alpha: 0.15, blur: 140 },
  { x: 1003.4 + dx, y: top + 99.2, w: 420, h: 150, rot: -22, color: "#55bbff", alpha: 0.13, blur: 100 },
];

// Enough clouds for the longest page (home, ~7300px); the layer clips the rest.
export const PAGE_CLOUDS: Glow[] = Array.from({ length: 6 }, (_, index) => [
  ...leftCloud(676.4 + index * PAGE_PERIOD, LEFT_SHIFT[index % 3]),
  ...rightCloud(1592.6 + index * PAGE_PERIOD, RIGHT_SHIFT[index % 3]),
]).flat();

// The compact glow by the closing call's card, relative to the closing
// call's section; and the haze under the footer, relative to the footer.
export const CALL_GLOW: Glow = {
  x: 839.6, y: 97.3, w: 520, h: 280, rot: 10, color: "#55bbff", alpha: 0.14, blur: 120,
};

export const FOOTER_HAZE: Glow = {
  x: -30, y: 327.1, w: 1500, h: 380, color: "#0084ff", alpha: 0.1, blur: 190,
};
