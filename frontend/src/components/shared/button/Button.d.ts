export type CustomButtonProps = {
  children?: ReactNode;
  variant: "primary" | "secondary" | "default";
  className?: string;
  customStyle?: CSSProperties;
  onClick: MouseEventHandler<HTMLButtonElement>;
  childClasses?: string;
  showPlusButton?: Boolean;
};
