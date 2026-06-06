export type SidebarProps = {
    isExpanded: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    setIsExpanded: (isExpanded: boolean) => void;
    selectedItem: string;
    setSelectedItem: (item: string) => void;
  }