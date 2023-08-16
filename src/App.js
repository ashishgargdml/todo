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
  const [value, setValue] = useState();
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <StyledRow>
        <Col span={12} style={{ display: "flex", alignItems: "center" }}>
          <A to="/">Home</A>
          <A to="/about" style={{margin:'0 2em'}}>About</A>
          <A to="/contact">Contact</A>
        </Col>
        <Col className="styled-search" span={4}>
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
        <Add className="add-task" to="/task/add">Add Task</Add>
      </StyledRow>
      <Routes>
        <Route path="/" element={<Home value={value} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/task/edit/:id" element={<Edit />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="/task/add" element=<AddTask /> />
      </Routes>
    </>
  );
};
const StyledRow = styled(Row)`
padding: 20px;
@media (max-width:767px){
  display: block;
  .styled-search {
    margin: 10px 0;
    max-width: 100% !important;
  }
  .add-task {
    left: 7%;
    width: 25%;
    margin-bottom: 20px;
  }
}
`;

const A = styled(Link)`
  text-decoration: none;
  color: red;
  cursor: pointer;
  text-align: center;
`;

const NAV = styled.nav`
  ${"" /* display: flex; */}
  width: 100%;
  padding: 1rem 1rem;
  border: 2px solid gray;
  box-shadow: 2px 2px gray;
  background: mintcream;
  overflow: hidden;
  ${"" /* opacity: 0.5; */}
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
  text-align: center;
`;

export default App;
