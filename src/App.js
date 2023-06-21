import React, { useState } from "react";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import Edit from "./components/Actions/Edit";
import AddTask from "./components/Actions/AddTask";
import EditTask from "./components/Actions/EditTask";
import Search from "antd/es/input/Search";
import { Col, Row } from "antd";

const App = () => {
  const [value, setValue] = useState()
  const handleChange = (e) => {   
    setValue(e.target.value);
  }

  return (
    <>
    <Row>
      <Col span={12}>
        <A to="/">Home</A>
        <A to="/about">About</A>
        <A to="/contact">Contact</A>
        </Col>
        <Col span={4}>
        <Search
              style={{
                width: "100%",
              }}
              placeholder="Search location"
              onChange={handleChange}
              allowClear
              enterButton
            />
            </Col>
        <Add to="/task/add">Add Task</Add>
      </Row>
      <Routes>
        <Route path="/" element={<Home value={value}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/task/edit/:id" element={<Edit />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="/task/add" element=<AddTask /> />
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
  ${'' /* opacity: 0.5; */}
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
