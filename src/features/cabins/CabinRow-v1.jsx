import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import {
  HiPencil,
  HiTrash,
  HiSquare2Stack,
  HiCircleStack,
  HiEllipsisVertical,
  HiMiniEllipsisVertical,
} from "react-icons/hi2";
import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Button from "../../ui/Button";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, name, description, maxCapacity, regularPrice, discount, image } =
    cabin;

  // Mutations
  const { isDeleteting, deleteCabin } = useDeleteCabin();

  // Duplicate cabin
  const { createCabin, isCreating } = useCreateCabin();
  const newCabin = {
    name: `${name} copy`,
    description,
    maxCapacity,
    regularPrice,
    discount,
    image,
  };

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={() => createCabin(newCabin)} disabled={isCreating}>
            <HiSquare2Stack />
          </button>

          <Modal>
            <Modal.OpenButton opens="edit-cabin">
              <button disabled={isDeleteting}>
                <HiPencil />
              </button>
            </Modal.OpenButton>
            <Modal.Window name="edit-cabin">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.OpenButton opens="delete">
              <button>
                <HiTrash />
              </button>
            </Modal.OpenButton>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleteting}
                onConfirm={() => deleteCabin(id)}
              />
            </Modal.Window>
          </Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} icon={<HiMiniEllipsisVertical />} />

            <Menus.List id={id}>
              <Menus.Button>Duplicate</Menus.Button>
              <Menus.Button>Edit</Menus.Button>
              <Menus.Button>Delete</Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
