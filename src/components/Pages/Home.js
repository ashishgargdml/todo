import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import axios from "axios";
import styled from "styled-components";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";

const Home = () => {
  const [tasks, setTasks] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
  });

  const loadTasks = async () => {
    const data = (await axios.get("http://localhost:3003/tasks")).data;
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3003/tasks/${id}`);
    loadTasks();
  };

  const cols = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "left",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "Actions",
      key: "x",
      align: "left",
      render: (_, record) => (
        <>
          <Button href={`/task/edit/${record.id}`}>
            <AiTwotoneEdit />
          </Button>
          <Button onClick={() => deleteTask(record.id)} danger>
            <AiTwotoneDelete />
          </Button>
        </>
      ),
    },
  ];
  return (
    <div>
      {tasks?.length ? (
        <TABLE
        size="large"
          rowKey={(record) => record.id}
          columns={cols}
          expandable={{
            expandedRowRender: (record) => (
              <p
                style={{
                  margin: 0,
                }}
              >
                Description :
                <br />
                {record.description}
              </p>
            ),
          }}
          dataSource={tasks}
          caption="Task List"
        />
      ) : <Table columns={cols} loading={true} />}
    </div>
  );
};

const TABLE = styled(Table)`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default Home;
