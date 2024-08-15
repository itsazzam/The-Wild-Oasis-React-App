import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";
import { HiCircleStack } from "react-icons/hi2";
import {
  HiDotsCircleHorizontal,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  // active menuId
  const [activeId, setActiveId] = useState("");

  // list position
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // open/close
  const openMenu = setActiveId;
  const closeMenu = () => setActiveId("");

  return (
    <MenusContext.Provider
      value={{ activeId, openMenu, closeMenu, setPosition, position }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id, icon }) {
  const { activeId, openMenu, closeMenu, setPosition } =
    useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button");
    const position = rect.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.offsetWidth - position.x,
      y: position.y + rect.offsetHeight + 10,
    });

    if (activeId !== id || activeId === "") {
      openMenu(id);
    } else {
      closeMenu();
    }
  }

  return (
    <StyledToggle onClick={handleClick}>
      {icon || <HiOutlineDotsCircleHorizontal />}
    </StyledToggle>
  );
}

function List({ children, id }) {
  const { closeMenu, position } = useContext(MenusContext);

  const ref = useOutsideClick(closeMenu, false);

  const { activeId } = useContext(MenusContext);

  if (activeId !== id) return null;

  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, onClick, icon }) {
  const { closeMenu } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    closeMenu();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {" "}
        <span>{icon}</span>
        {children}
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.Button = Button;
Menus.List = List;

export default Menus;
