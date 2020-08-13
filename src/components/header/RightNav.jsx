import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const UL = styled.ul`
  width: 40%;
  list-style-type: none;
  display: flex;
  justify-content: space-between;

  li > a {
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: -0.08px;
    line-height: 20.0167px;
    color: #ffffff;
    cursor: pointer;
  }

  #cta {
    align-items: center;
    background-color: #ffb129;
    border-radius: 5px;
    color: #ffffff;
    letter-spacing: 0.32px;
    padding: 16px 22px;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #ffffff;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 60px;
    right: 0;
    height: 100vh;
    padding: 40px;
    transition: transform 0.3s ease-in-out;

    li {
      margin-top: 60px;
      a {
        color: #333d47;
        font-size: 1.5rem;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: -0.08px;
        line-height: 34.3167px;
      }
    }
  }
`;

export default function RightNav({ open, setOpen }) {
  return (
    <UL className="info" open={open}>
      <li>
        <Link to="/dashboard" onClick={() => setOpen(false)}>
          Add Product
        </Link>
      </li>
      <li>
        <Link to="/catalog" onClick={() => setOpen(false)}>
          Product Catalog
        </Link>
      </li>
      <li>
        <Link to="/orders" onClick={() => setOpen(false)}>
          Orders
        </Link>
      </li>
    </UL>
  );
}
