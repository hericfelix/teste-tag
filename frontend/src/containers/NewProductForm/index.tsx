import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useCategories } from '../../providers/categories';
import { FieldValues, useForm } from 'react-hook-form';

type Props = {};

const NewProductForm = () => {
  const { categories } = useCategories();

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
          required
          {...register('name')}
        />
      </FormGroup>
      <FormGroup>
        <Label for="status">Status</Label>
        <Input required id="status" type="select" {...register('status')}>
          <option>a</option>
          <option>d</option>
          <option>i</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="category">Category</Label>
        <Input required id="category" type="select" {...register('category')}>
          {categories.map((el) => (
            <option>{el.name}</option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="image">File</Label>
        <Input required id="image" type="file" {...register('image')} />
      </FormGroup>

      <Button>Create</Button>
    </Form>
  );
};

export default NewProductForm;
