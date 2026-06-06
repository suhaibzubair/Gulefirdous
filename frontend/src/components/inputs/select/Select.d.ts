export type CustomSelectProps = {
    customStyle?: React.CSSProperties;
    options?: Array<{ value: string; label: string }>;
    variant: 'multi-select' | 'single-select';
    handleChange?: (value: string) => void;
    selected?: string;
    children?:any
  }