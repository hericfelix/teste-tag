import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { useCategories } from '../../providers/categories';
import { useProducts } from '../../providers/products';

const DropdownFilter = () => {
  const { register, handleSubmit } = useForm();

  const { products, setFilteredProducts } = useProducts();
  const { categories } = useCategories();

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleDropdown = () => setDropdownVisible(!dropdownVisible);

  const { ref: nameRef, ...nameField } = register('name');
  const { ref: statusRef, ...statusField } = register('status');
  const { ref: categoryRef, ...categoryField } = register('category');

  const handleFilter = ({ name, status, category }: FieldValues) => {
    const treatedName = name.toLowerCase();

    setFilteredProducts(
      products
        .filter((el) => (treatedName ? el.name.includes(treatedName) : true))
        .filter((el) => (status ? el.status === status : true))
        .filter((el) => (category ? el.category.name === category : true))
    );
    handleDropdown();
  };

  return (
    <Dropdown isOpen={dropdownVisible} toggle={handleDropdown}>
      <DropdownToggle caret>Filter</DropdownToggle>
      <DropdownMenu className="p-3" container="body">
        <Form onSubmit={handleSubmit(handleFilter)}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              id="name"
              placeholder=""
              type="text"
              innerRef={nameRef}
              {...nameField}
            />
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input
              id="status"
              type="select"
              innerRef={statusRef}
              {...statusField}
            >
              <option></option>
              <option>a</option>
              <option>d</option>
              <option>i</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="categorySelect">Category</Label>
            <Input type="select" innerRef={categoryRef} {...categoryField}>
              <option></option>
              {categories?.map((el) => (
                <option key={el.id}>{el.name}</option>
              ))}
            </Input>
          </FormGroup>
          <Button type="submit">Filter</Button>
        </Form>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownFilter;
