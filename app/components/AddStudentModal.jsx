import { useEffect } from "react";
import { Modal, Button, Form, Input, InputNumber } from "antd"
import { updateStudent } from "../services";

export const AddStudentModal = ({ open, onCancel, onAdd, onUpdate, selectedStudent }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (selectedStudent) {
            form.setFieldsValue(selectedStudent);
        }
    }, [selectedStudent]);

    const handleFinish = (formData) => {
        if(selectedStudent) {
            onUpdate(formData);
        } else {
            onAdd(formData);
        }
    }

    return (
        <Modal
            title={selectedStudent ? "Edit Student" : "Add Student"}
            open={open}
            footer={null}
            onCancel={onCancel}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: "Please enter first name!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: "Please enter last name!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Please enter email!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Contact Number"
                    name="contactNo"
                    rules={[{ required: true, message: "Please enter contact number!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: "Please enter address!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="GPA"
                    name="gpa"
                    rules={[{ required: true, message: "Please enter gpa!" }]}
                >
                    <InputNumber min={0} max={4} />
                </Form.Item>
                <Form.Item className="flex justify-end">
                    <Button type="primary" htmlType="submit">Add Student</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}