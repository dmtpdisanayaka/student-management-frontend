"use client";

import { useState } from "react";
import { Button, message, Table } from "antd";
import { AddStudentModal} from "@/app/components/AddStudentModal";
import { useQuery, useMutation } from "@tanstack/react-query";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getStudents, addStudent, updateStudent, deleteStudent } from "@/app/services";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: students, isLoading, refetch } = useQuery({
    queryKey: "students",
    queryFn: getStudents,
  });

  const { mutate: saveStudent } = useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      message.success("Student added successfully!");
      refetch();
      setIsModalOpen(false);
    },
    onError: () => {
      message.error("Failed to add student!");
    },
  })

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "GPA",
      dataIndex: "gpa",
      key: "gpa",
    },
    {
      key: "action",
      render: (record) => (
        <div className="flex justify-end">
          <Button className="mr-2" icon={<EditOutlined/>}>Edit</Button>
          <Button danger icon={<DeleteOutlined/>}>Delete</Button>
        </div>
      )
    }
  ];

  const handleAdd = (payload) => {
    saveStudent(payload);
  }

  return (
    <div className="container mx-auto"> 
      <div className="flex justify-end mt-4">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Add Studnet</Button>
      </div>
      <Table className="mt-4" dataSource={students} loading={isLoading} columns={columns} />
      {isModalOpen && <AddStudentModal open={isModalOpen} onCancel={() => setIsModalOpen(false)} onAdd={handleAdd}/>}
    </div>
  );
}
