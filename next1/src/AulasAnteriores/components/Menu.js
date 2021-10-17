import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <header>
        <h1>Isso é um header</h1>
        <nav>
            <Link to="/">Home</Link> <br />
            <Link to="/sobre">Sobre</Link> <br />
            <Link to="/contato">Contato</Link> <br />
        </nav>
    </header>
  );
};

export default Menu;
