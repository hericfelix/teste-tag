import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

interface AppModalProps {
  children: ReactNode;
  toggle: Dispatch<SetStateAction<boolean>>;
  title: string;
  isOpen: boolean;
}

const AppModal = ({ children, toggle, title, isOpen }: AppModalProps) => {
  const handleToggle = () => {
    toggle(!isOpen);
  };
  return (
    <Modal isOpen={isOpen} toggle={handleToggle}>
      <ModalHeader toggle={handleToggle}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};

export default AppModal;
