export interface btnProps {
  text: string;
  onClick?: () => void;
  imgSrc?: string[];
  colors?: "all" | "home" | "personal" | "work" | "completed" | "none";
}

export type task = {
  title: string;
  description: string;
  date: string;
  category: string;
  completed: boolean;
};

export type colorString =
  | "all"
  | "home"
  | "personal"
  | "work"
  | "completed"
  | "none";
