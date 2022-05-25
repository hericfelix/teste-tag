import React, { useState } from 'react';
import { IProduct } from '../../ts/interfaces';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Input,
} from 'reactstrap';
import { useLogin } from '../../providers/login';
import { useProducts } from '../../providers/products';
import './style.css';
import { useModal } from '../../providers/modal';

const ProductCard = ({
  category,
  created,
  id,
  imageUrl,
  name,
  status,
}: IProduct) => {
  const { token } = useLogin();
  const { setEditId, setDeleteIds, deleteIds } = useProducts();
  const { setEditModalVisible, setDeleteModalVisible } = useModal();

  const [checked, setChecked] = useState<boolean>();

  const handleCheck = () => {
    if (checked) {
      setDeleteIds(deleteIds.filter((el) => el !== id));
      return setChecked(!checked);
    }
    setDeleteIds([id, ...deleteIds]);
    setChecked(!checked);
  };

  return (
    <Card className=" p-3 border app-card">
      <Input
        checked={checked}
        onClick={handleCheck}
        className="pointer mb-3"
        type="checkbox"
      />
      <CardImg className="img" alt={name} src={imageUrl} top width="100%" />
      <CardBody className="overflow-auto body">
        <CardTitle tag="h5">
          {name[0].toUpperCase() + name.substring(1)}
        </CardTitle>
        <CardSubtitle className="mb-2 font text-muted" tag="h6">
          {category.name}
        </CardSubtitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          <strong className="text-black-50 ">created:</strong>{' '}
          {created.split('T')[0]}
        </CardSubtitle>

        {token && (
          <div className="space">
            <Button
              className="bg-danger"
              onClick={() => {
                setDeleteIds([id]);
                setDeleteModalVisible(true);
              }}
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                setEditId(id);
                setEditModalVisible(true);
              }}
            >
              Edit
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default ProductCard;
