export const LIFT_STATUS = {
  OPEN: "OPEN",
  HOLD: "HOLD",
  CLOSED: "CLOSED",
} as const;

export const LIFTS_STATUS = {
  ALL: "ALL",
  ...LIFT_STATUS,
} as const;

export const LIFT_EDITABLE_VALUES = {
  name: false,
  elevationGain: false,
  status: true,
};
