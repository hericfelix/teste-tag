import React, { ReactNode } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

interface AppModalProps {
  children: ReactNode;
  toggle: () => void;
  title: string;
  isOpen: boolean;
}

const AppModal = ({ children, toggle, title, isOpen }: AppModalProps) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};

export default AppModal;
