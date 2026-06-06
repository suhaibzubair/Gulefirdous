export type ItemProps ={
    Icon: React.ElementType;
    label: string;
    href?: string;
    options?: {
      icon?: React.ComponentType;
      label: string;
      href: string;
    }[];
    selectedOption:  {
      option: number;
      subOption: number;
    };
    setSelectedOption: (option: number, subOption: number) => void;
    optionIndex: number;
    isSidebarCollapsed?:boolean
  }