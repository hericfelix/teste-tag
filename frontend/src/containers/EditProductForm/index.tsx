import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useCategories } from '../../providers/categories';
import { useProducts } from '../../providers/products';

interface EditProductFormProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProductForm = ({ setModalVisible }: EditProductFormProps) => {
  const { products, editId } = useProducts();
  const { categories } = useCategories();

  const product = products.find((el) => el.id === editId);

  const { updateProduct } = useProducts();

  const { register, handleSubmit } = useForm();

  const { ref: nameRef, ...nameField } = register('name');
  const { ref: statusRef, ...statusField } = register('status');
  const { ref: categoryRef, ...categoryField } = register('category');
  const { ref: imageRef, ...imageField } = register('image');

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();

    if (data.image.length > 0) {
      formData.append('image', data.image[0]);
    }
    formData.append('name', data.name);
    formData.append('status', data.status);
    formData.append('category', data.category);

    updateProduct(formData);
    setModalVisible(false);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          id="name"
          placeholder="write the name here"
          type="text"
          defaultValue={product?.name}
          required
          innerRef={nameRef}
          {...nameField}
        />
      </FormGroup>
      <FormGroup>
        <Label for="status">Status</Label>
        <Input
          required
          id="status"
          type="select"
          innerRef={statusRef}
          {...statusField}
        >
          <option defaultChecked={product?.status === 'a'}>a</option>
          <option defaultChecked={product?.status === 'd'}>d</option>
          <option defaultChecked={product?.status === 'i'}>i</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="category">Category</Label>
        <Input
          required
          id="category"
          type="select"
          innerRef={categoryRef}
          {...categoryField}
        >
          {categories.map((el) => (
            <option
              key={el.id}
              defaultChecked={product?.category.name === el.name}
            >
              {el.name}
            </option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="image">Image</Label>
        <Input id="image" type="file" innerRef={imageRef} {...imageField} />
      </FormGroup>

      <Button>Edit</Button>
    </Form>
  );
};

export default EditProductForm;
