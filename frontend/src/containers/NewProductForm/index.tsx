import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useCategories } from '../../providers/categories';
import { FieldValues, useForm } from 'react-hook-form';
import { useProducts } from '../../providers/products';

interface EditProductFormProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewProductForm = ({ setModalVisible }: EditProductFormProps) => {
  const { categories } = useCategories();
  const { createProduct } = useProducts();

  const { register, handleSubmit } = useForm();

  const { ref: nameRef, ...nameField } = register('name');
  const { ref: statusRef, ...statusField } = register('status');
  const { ref: categoryRef, ...categoryField } = register('category');
  const { ref: imageRef, ...imageField } = register('image');

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();

    formData.append('image', data.image[0]);
    formData.append('name', data.name);
    formData.append('status', data.status);
    formData.append('category', data.category);

    createProduct(formData);
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
          <option defaultChecked></option>
          <option>a</option>
          <option>d</option>
          <option>i</option>
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
          <option defaultChecked></option>
          {categories.map((el) => (
            <option key={el.id}>{el.name}</option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="image">File</Label>
        <Input
          required
          id="image"
          type="file"
          innerRef={imageRef}
          {...imageField}
        />
      </FormGroup>

      <Button>Create</Button>
    </Form>
  );
};

export default NewProductForm;
