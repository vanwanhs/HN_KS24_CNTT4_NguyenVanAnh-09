import { Button, Input } from "antd";
import { Pen, Trash } from "lucide-react";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

interface Task {
  id: string;
  name: string;
  isCompleted: boolean;
}

export default function Todolist() {
  const [task, setTask] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<string>("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);  
  const [tasks, setTasks] = useState<Task[]>(() => {
    const taskLocals = localStorage.getItem("tasks");
    return taskLocals ? JSON.parse(taskLocals) : [];
  });

  // mỗi khi tasks thay đổi thì lưu vào localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Lấy giá trị input
  const handleChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
    if (e.target.value.trim() !== "") {
      setError("");
    }
  };

  // Sự kiện submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!task.trim()) {
      setError("Tên công việc không được để trống");
      return;
    }

    const newTask: Task = {
      id: uuid(),
      name: task,
      isCompleted: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setTask(""); // reset input
  };

  // Toggle hoàn thành
  const handleToggle = (id: number | string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  //Sửa công việc
  const handleEdit = (id: string) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (taskToEdit) {
      setEditingId(id);
      setEditingTask(taskToEdit.name);
    }
  };

  // Lưu thay đổi khi edit
  const handleSaveEdit = () => {
    if (!editingTask.trim()) {
      setError("Tên công việc không được để trống");
      return;
    }

    setTasks((prev) =>
      prev.map((t) => (t.id === editingId ? { ...t, name: editingTask } : t))
    );
    setEditingId(null);
    setEditingTask("");
    setError("");
  };

  // Hủy edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingTask("");
    setError("");
  };

  // Xóa công việc
  // Xóa công việc
  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  // Xác nhận xóa
  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      setTasks((prev) => prev.filter((t) => t.id !== deleteConfirmId));
      setDeleteConfirmId(null);
    }
  };

  // Hủy xóa
  const handleCancelDelete = () => {
    setDeleteConfirmId(null);
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[600px] border p-6 rounded-lg shadow-sm">
        <h3 className="text-center text-[24px] font-semibold mb-6">
          Danh sách công việc
        </h3>

        <form onSubmit={handleSubmit} className="flex gap-5 mb-3">
          <Input
            placeholder="Nhập tên công việc"
            value={task}
            onChange={handleChangeTask}
          />
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </form>

        {error && <p className="mb-6 text-red-600 text-[14px]">{error}</p>}

        <ul className="space-y-2">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={t.isCompleted}
                  onChange={() => handleToggle(t.id)}
                />
                {editingId === t.id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={editingTask}
                      onChange={(e) => setEditingTask(e.target.value)}
                      onPressEnter={handleSaveEdit}
                      className="w-[200px]"
                    />
                    <Button
                      size="small"
                      type="primary"
                      onClick={handleSaveEdit}
                    >
                      Lưu
                    </Button>
                    <Button size="small" onClick={handleCancelEdit}>
                      Hủy
                    </Button>
                  </div>
                ) : (
                  <span
                    className={
                      t.isCompleted ? "line-through text-gray-500" : ""
                    }
                  >
                    {t.name}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {editingId !== t.id && (
                  <Pen
                    size={18}
                    className="text-orange-400 hover:text-orange-600 cursor-pointer"
                    onClick={() => handleEdit(t.id)}
                  />
                )}
                <Trash
                  size={18}
                  className="text-orange-400 hover:text-orange-600 cursor-pointer"
                  onClick={() => handleDelete(t.id)}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4">
          Công việc đã hoàn thành:{" "}
          <span>{tasks.filter((t) => t.isCompleted).length}</span> /{" "}
          {tasks.length}
        </div>
      </div>
      {/* Confirm Delete Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Xác nhận xóa</h3>
            <p className="mb-6">Bạn có chắc chắn muốn xóa công việc này?</p>
            <div className="flex gap-3 justify-end">
              <Button onClick={handleCancelDelete}>Hủy</Button>
              <Button type="primary" danger onClick={handleConfirmDelete}>
                Xóa
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}