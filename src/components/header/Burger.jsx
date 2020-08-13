import React, { useState } from "react";
import RightNav from "./RightNav";
import styled from "styled-components";

const StyledBurger = styled.div`
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    width: 2rem;
    height: 2rem;
    position: fixed;
    top: 25px;
    right: 40px;

    div {
      width: 2rem;
      height: 0.25rem;
      background-color: ${({ open }) => (open ? "#ffffff" : "#ffffff")};
      border-radius: 10px;
      transform-origin: 1px;
      transition: all 0.3s linear;

      &:nth-child(1) {
        transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
      }

      &:nth-child(2) {
        transform: ${({ open }) =>
          open ? "translateX(100%)" : "translateX(0)"};

        opacity: ${({ open }) => (open ? 0 : 1)};
      }

      &:nth-child(3) {
        transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
      }
    }
  }
`;

export default function Burger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <RightNav open={open} setOpen={setOpen} />
    </>
  );
}
