import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useCategories } from '../../providers/categories';
import { useProducts } from '../../providers/products';

const NewProductForm = () => {
  const { products, editId } = useProducts();
  const { categories } = useCategories();

  const product = products.find((el) => el.id === editId);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();

    formData.append('image', data.image[0]);
    formData.append('name', data.name);
    formData.append('status', data.status);
    formData.append('category', data.category);

    console.log(formData);
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
          {...register('name')}
        />
      </FormGroup>
      <FormGroup>
        <Label for="status">Status</Label>
        <Input required id="status" type="select" {...register('status')}>
          <option defaultChecked={product?.status === 'a'}>a</option>
          <option defaultChecked={product?.status === 'd'}>d</option>
          <option defaultChecked={product?.status === 'i'}>i</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="category">Category</Label>
        <Input required id="category" type="select" {...register('category')}>
          {categories.map((el) => (
            <option defaultChecked={product?.category.name === el.name}>
              {el.name}
            </option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="image">Image</Label>
        <Input id="image" type="file" {...register('image')} />
      </FormGroup>

      <Button>Create</Button>
    </Form>
  );
};

export default NewProductForm;
