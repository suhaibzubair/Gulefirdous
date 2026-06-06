export type ModalWrapperProps = {
    title: React.ReactNode;
    visible: boolean;
    onCancel: () => void;
    onOk: () => void;
    size: string;
    children: React.ReactNode;
  }