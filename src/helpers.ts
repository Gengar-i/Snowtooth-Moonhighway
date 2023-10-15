export const LIFT_STATUS = {
  OPEN: "OPEN",
  HOLD: "HOLD",
  CLOSED: "CLOSED",
} as const;

export const LIFTS_STATUS = {
  ...LIFT_STATUS,
  ALL: "ALL",
} as const;
