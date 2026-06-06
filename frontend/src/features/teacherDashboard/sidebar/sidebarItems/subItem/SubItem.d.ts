export type SubitemProps = {
    Icon?: React.ElementType;
    label: string;
    href: string;
    selectedOption: {
      option: number;
      subOption: number;
    };
    setSelectedOption: (option: number, subOption: number) => void;
    subOptionIndex: number;
    optionIndex: number;
  };