import React from 'react';
import { IProduct } from '../../ts/interfaces';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import { useLogin } from '../../providers/login';
import { useProducts } from '../../providers/products';

const ProductCard = ({
  category,
  created,
  id,
  imageUrl,
  name,
  status,
}: IProduct) => {
  const { token } = useLogin();
  const { setEditId, setEditModalVisible, setDeleteIds } = useProducts();

  return (
    <Card>
      <CardImg alt={name} src={imageUrl} top width="100%" />
      <CardBody>
        <CardTitle tag="h3">
          {name[0].toUpperCase() + name.substring(1)}
        </CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h4">
          {category.name}
        </CardSubtitle>
        <CardSubtitle className="mb-2 text-muted" tag="h4">
          created: {created}
        </CardSubtitle>

        {token && (
          <>
            <Button
              onClick={() => {
                setDeleteIds([id]);
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
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default ProductCard;
