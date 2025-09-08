export type DaisyUIColors =
  | "neutral"
  | "primary"
  | "info"
  | "error"
  | "secondary"
  | "accent"
  | "success";
export type DaisyUISizes = "xs" | "sm" | "md" | "lg";

export interface SelectOption {
  label: string | number;
  value: string | number;
}