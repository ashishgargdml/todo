import React, { useEffect, useState } from "react";
import { Button, Table, ConfigProvider } from "antd";
import axios from "axios";
import styled from "styled-components";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";

const Home = ({ value }) => {
  const [Data, setData] = useState([]);
  const [tasks, setTasks] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
  });

  const loadTasks = async () => {
    const data = (await axios.get("http://localhost:3003/tasks")).data;
    setTasks(data);
    setData(data);
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
          <Button href={`/edit/${record.id}`}>
            <AiTwotoneEdit />
          </Button>
          <Button onClick={() => deleteTask(record.id)} danger>
            <AiTwotoneDelete />
          </Button>
        </>
      ),
    },
  ];

  const searchFilter = Data?.filter((item) => item.title.toLowerCase().includes(value));
  const task = searchFilter.length > 0 ? searchFilter : Data;
  console.log(task)

  return (
    <div>
      {tasks?.length ? (
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer:
                "linear-gradient(to right, rgb(176, 192, 201), rgb(155, 191, 238))",
              // colorText	:'white',
              colorTextHeading: "red",
              opacityLoading: 0.1,
            },
          }}
        >
          <TABLE
            size="large"
            rowKey={(record) => record.id}
            columns={cols}
            expandable={{
              columnTitle: "Description",
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
            dataSource={task}
            caption="Task List"
          />
        </ConfigProvider>
      ) : (
        <Table columns={cols} loading={true} />
      )}
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
