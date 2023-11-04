enum EnumS_N {
  N,
  S
}

enum Enum_Steering {
  manual,
  electrical,
  hydraulics
}

enum Enum_Windows {
  two,
  four
}

export type EnumSN = keyof typeof EnumS_N;

export type EnumSteering = keyof typeof Enum_Steering;

export type EnumWindows = keyof typeof Enum_Windows;
