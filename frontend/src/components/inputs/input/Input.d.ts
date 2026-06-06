export type CustomInputProps = {
    placeholder?: string;
    customClass?: string;
    height?: number;
    width?: number;
    value?:any
    customStyles?: CSSProperties;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  }
  