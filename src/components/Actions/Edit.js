import styled from "styled-components";
import { Button, Col } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";

const Edit = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
  });

  const { title, description, status } = task;
  const loadTask = async () => {
    const data = await axios.get(`http://localhost:3003/tasks/${id}`);
    setTask(data.data);
  };

  useEffect(() => {
    loadTask();
  }, []);

  const onInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3003/tasks/${id}`, task);
    navigate("/");
  };
  return (
    <div>
      <COL offset={10}>
        <P>Id</P>
        <INPUT
          type="id"
          name="id"
          placeholder="Enter your id"
          value={id}
          onChange={onInputChange}
        />
        <P>Title</P>
        <INPUT
          type="text"
          name="title"
          placeholder="Enter Title of the Task"
          value={title}
          onChange={onInputChange}
        />
        <P>Description</P>
        <INPUT
          type="text"
          name="description"
          placeholder="Enter Description"
          value={description}
          onChange={onInputChange}
        />
        <P>Status</P>
        <INPUT
          type="text"
          name="status"
          placeholder="Status: "
          value={status}
          onChange={onInputChange}
        />
      </COL>
      <Col style={{ marginTop: "10px" }} offset={11}>
        <Button onClick={onSubmit} type="primary">
          <FaCheck />
        </Button>
        <B href="/">Home</B>
      </Col>
    </div>
  );
};

const COL = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const P = styled.p``;

const INPUT = styled.input`
  width: 30%;
  height: 2em;
  ${"" /* margin-bottom:2px; */}
  border: 1px solid;
  border-radius: 4px;
`;
const B = styled(Button)`
  left: 10px;
`;

export default Edit;
