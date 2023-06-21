import { Button, Col, Form, Input, Select } from "antd";
import React, { useState, useEffect } from "react";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';

const { Option } = Select;

const EditTask = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
  });

  const { title, description, status } = task;
  const loadTask = async (id) => {
    const data = await axios.get(`http://localhost:3003/tasks/${id}`);
    setTask(data.data);
  };

  useEffect(() => {
    loadTask(id);
  }, []);

  const onFinish =async(values) => {
  await axios.put(`http://localhost:3003/tasks/${id}`, values);
  navigate("/");
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const onInputChange = (value) => {
  setTask({ ...task, name: value });
};

return (
    task.status !== '' ?
    <Col offset={8} span={8}>
  <StyledForm
    name="basic"
    onFieldsChange={onInputChange}
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      id:id,
      title: title,
      description: description,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="id"
      name="id"
      rules={[
        {
          required: true,
          message: "Please input your username!",
        },
      ]}
    >
      <Input type="number" />
    </Form.Item>

    <Form.Item
      label="Title"
      name="title"
      validateStatus="string"
      rules={[
        {
            // pattern:"/[abc]/",
          type: "string",
          required: true,
          message: "Please input Title!",
        },
        {
            pattern: RegExp(/[a-zA-Z]+$/),
            message: "field does not accept numbers",
        }
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Description"
      name="description"
      rules={[
        {
          required: true,
          message: "Please input your username!",
        },
      ]}
    >
      <TextArea value={description} />
    </Form.Item>

    <Form.Item
        name="status"
        label="Status"
        initialValue={status}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          // onChange={onGenderChange}
        //   value={status}
          allowClear
        >
          <Option value="Done">Done</Option>
          <Option value="Pending">Pending</Option>
          <Option value="In Progress">In Progress</Option>
        </Select>
      </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Edit Task
      </Button>
      <Button danger htmlType="button" onClick={() => navigate('/')}>
        Cancel
      </Button>
    </Form.Item>
  </StyledForm>
  </Col>
  :<></>
)
};


const StyledForm = styled(Form)`
margin-top :10px;

`


export default EditTask;
