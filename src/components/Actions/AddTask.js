import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddTask = () => {
  let navigate = useNavigate();
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
  });
  const onFinish = async (values) => {
    await axios.post("http://localhost:3003/tasks", values);
    navigate("/");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onInputChange = (value) => {
    setTask({ ...task, name: value });
  };
  return (
    <Form
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
        remember: true,
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
          },
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
        <TextArea />
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          // onChange={onGenderChange}
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
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddTask;
