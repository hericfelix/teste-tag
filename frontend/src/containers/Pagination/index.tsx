import React, { MouseEvent, useState } from 'react';
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import { usePagination } from '../../providers/pagination';

const AppPagination = () => {
  const { currentPage, lastPage, setCurrentPage, setItemsPerPage } =
    usePagination();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handlePageChange = (
    evt: MouseEvent<HTMLAnchorElement>,
    value: number
  ) => {
    evt.preventDefault();

    setCurrentPage(value);
  };

  return (
    <div className="w-100 d-flex justify-content-between">
      <ButtonDropdown
        isOpen={dropdownOpen}
        className="btn-sm"
        toggle={() => setDropdownOpen(!dropdownOpen)}
      >
        <DropdownToggle className="btn-sm" caret>
          Items Per Page
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setItemsPerPage(5)}>5</DropdownItem>
          <DropdownItem onClick={() => setItemsPerPage(10)}>10</DropdownItem>
          <DropdownItem onClick={() => setItemsPerPage(15)}>15</DropdownItem>
          <DropdownItem onClick={() => setItemsPerPage(20)}>20</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
      <Pagination>
        <PaginationItem disabled={currentPage <= 0}>
          <PaginationLink
            onClick={(evt) => handlePageChange(evt, currentPage)}
            previous
            href="#"
          />
        </PaginationItem>

        {lastPage > 0
          ? [...Array(lastPage)].map((_, index) => (
              <PaginationItem key={index} active={index === currentPage}>
                <PaginationLink onClick={(evt) => handlePageChange(evt, index)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))
          : ''}
        <PaginationItem disabled={currentPage >= lastPage - 1}>
          <PaginationLink
            onClick={(e) => handlePageChange(e, currentPage + 1)}
            next
            href="#"
          />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default AppPagination;
