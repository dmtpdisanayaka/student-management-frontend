"use client";

import { useState } from "react";
import { Button, message, Table } from "antd";
import { AddStudentModal} from "@/app/components/AddStudentModal";
import { useQuery, useMutation } from "@tanstack/react-query";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getStudents, addStudent, updateStudent, deleteStudent } from "@/app/services";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

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
  });

  const { mutate: removeStudent } = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      message.success("Student deleted successfully!");
      refetch();
    },
    onError: () => {
      message.error("Failed to delete student!");
    },
  })

  const { mutate: editStudent } = useMutation({
    mutationFn: ({ id, payload }) => updateStudent(id, payload),
    onSuccess: () => {
      message.success("Student updated successfully!");
      refetch();
      setIsModalOpen(false);
      setSelectedStudent(null);
    },
    onError: () => {
      message.error("Failed to update student!");
    },
  });

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
          <Button className="mr-2" icon={<EditOutlined/>} onClick={() => {
            setSelectedStudent(record);
            setIsModalOpen(true);
          }}>Edit</Button>
          <Button danger icon={<DeleteOutlined/>} onClick={() => removeStudent(record?.id)}>Delete</Button>
        </div>
      )
    }
  ];

  const handleAdd = (payload) => {
    saveStudent(payload);
  }

  const handleUpdate = (payload) => {
    editStudent({
      id: selectedStudent.id,
      payload,
    });
  }

  return (
    <div className="container mx-auto"> 
      <div className="flex justify-end mt-4">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Add Studnet</Button>
      </div>
      <Table className="mt-4" dataSource={students} loading={isLoading} columns={columns} />
      {isModalOpen && 
      <AddStudentModal 
        open={isModalOpen} 
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedStudent(null);
        }} 
        onAdd={handleAdd} 
        onUpdate={handleUpdate}
        selectedStudent={selectedStudent}
      />}
    </div>
  );
}
