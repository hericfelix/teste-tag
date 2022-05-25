import React from 'react';
import { Button, Form } from 'reactstrap';
import { useProducts } from '../../providers/products';

interface EditProductFormProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModal = ({ setModalVisible }: EditProductFormProps) => {
  const { deleteProducts } = useProducts();

  return (
    <Form className="flex-column justify-content-center center text-center">
      <p>Do you really wanna delete?</p>
      <Button
        className="bg-danger"
        onClick={() => {
          setModalVisible(false);
          deleteProducts();
        }}
      >
        Delete
      </Button>
    </Form>
  );
};

export default DeleteModal;
