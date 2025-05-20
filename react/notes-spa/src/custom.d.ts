export interface btnProps {
  text: string;
  onClick?: () => void;
  imgSrc?: string[];
  colors?: "all" | "home" | "personal" | "work" | "completed";
}
