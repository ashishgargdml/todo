import React from "react";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import AddTask from "./components/Actions/Add";
import Edit from "./components/Actions/Edit";
const App = () => {
  return (
    <>
      <NAV>
        <A to="/">Home</A>
        <A to="/about">About</A>
        <A to="/contact">Contact</A>
        <Add to="/task/add">Add Task</Add>
      </NAV>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/task/add" element={<AddTask />} />
        <Route path="/task/edit/:id" element={<Edit />} />
      </Routes>
    </>
  );
};

const A = styled(Link)`
  text-decoration: none;
  margin-left: 2rem;
  color: red;
  cursor: pointer;
`;

const NAV = styled.nav`
  ${"" /* display: flex; */}
  width: 100%;
  padding: 1rem 1rem;
  border: 2px solid gray;
  box-shadow: 2px 2px gray;
  background: mintcream;
  overflow: hidden;
`;

const Add = styled(Link)`
  text-decoration: none;
  position: absolute;
  right: 10px;
  color: red;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  border: 2px solid gray;
`;

export default App;
