import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import ProductCard from '../../components/Card';
import AppModal from '../../components/Modal';
import DeleteModal from '../../containers/DeleteModal';
import DropdownFilter from '../../containers/DropdownFilter';
import EditProductForm from '../../containers/EditProductForm';
import NewProductForm from '../../containers/NewProductForm';
import AppPagination from '../../containers/Pagination';
import { useLogin } from '../../providers/login';
import { useModal } from '../../providers/modal';
import { usePagination } from '../../providers/pagination';
import { useProducts } from '../../providers/products';

import './style.css';

const Home = () => {
  const navigate = useNavigate();
  const { getProducts, deleteIds } = useProducts();
  const { token, logout } = useLogin();
  const { paginatedProducts } = usePagination();

  const {
    createModalVisible,
    deleteModalVisible,
    editModalVisible,
    setCreateModalVisible,
    setDeleteModalVisible,
    setEditModalVisible,
  } = useModal();

  useEffect(() => {
    getProducts('');
  }, []);

  return (
    <>
      <header className="header rounded-bottom">
        <DropdownFilter />
        {token && (
          <>
            <Button
              className="bg-success"
              onClick={() => setCreateModalVisible(true)}
            >
              New product
            </Button>
            <Button
              onClick={() => setDeleteModalVisible(true)}
              disabled={deleteIds.length === 0}
              className="bg-danger"
            >
              Mass delete
            </Button>
          </>
        )}
        <Button
          onClick={token ? logout : () => navigate('/login')}
          className="bg-dark"
        >
          {token ? 'Logout' : 'Login'}
        </Button>
      </header>
      <Container>
        <Row
          className="w-auto center p-5 g-1 justify-content-center"
          xs={1}
          sm={2}
          md={3}
          lg={3}
          xl={5}
        >
          {paginatedProducts.map((el) => (
            <Col key={el.id} className="column center">
              <ProductCard
                key={el.id}
                category={el.category}
                name={el.name}
                status={el.status}
                imageUrl={el.imageUrl}
                id={el.id}
                created={el.created}
              />
            </Col>
          ))}
        </Row>
        <AppPagination />
      </Container>
      <AppModal
        isOpen={editModalVisible}
        toggle={setEditModalVisible}
        title="Edit"
      >
        <EditProductForm setModalVisible={setEditModalVisible} />
      </AppModal>
      <AppModal
        isOpen={createModalVisible}
        toggle={setCreateModalVisible}
        title="Create"
      >
        <NewProductForm setModalVisible={setCreateModalVisible} />
      </AppModal>
      <AppModal
        isOpen={deleteModalVisible}
        title="Delete"
        toggle={setDeleteModalVisible}
      >
        <DeleteModal setModalVisible={setDeleteModalVisible} />
      </AppModal>
    </>
  );
};

export default Home;
