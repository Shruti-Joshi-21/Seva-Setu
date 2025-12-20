import React, { useState } from "react";
import api from "@/lib/api";

interface TaskFormData {
  title: string;
  description: string;
  category: string;
  assignedTo: string[];
  priority: string;
  startDate: string;
  endDate: string;
  location: string;
  notes: string;
}

interface VolunteerAddTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const VolunteerAddTaskDialog: React.FC<VolunteerAddTaskDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    category: "",
    assignedTo: [""],
    priority: "Medium",
    startDate: "",
    endDate: "",
    location: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index?: number
  ) => {
    if (index !== undefined) {
      const newAssignedTo = [...formData.assignedTo];
      newAssignedTo[index] = e.target.value;
      setFormData({ ...formData, assignedTo: newAssignedTo });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addAssigneeField = () => {
    setFormData({ ...formData, assignedTo: [...formData.assignedTo, ""] });
  };

  const removeAssigneeField = (index: number) => {
    const newAssignedTo = formData.assignedTo.filter((_, i) => i !== index);
    setFormData({ ...formData, assignedTo: newAssignedTo });
  };

  /* ======================
     SUBMIT TASK (LEADER)
  ====================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const role = localStorage.getItem("role");
    if (role !== "LEADER") {
      alert("Only Team Lead can assign tasks to volunteers");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/tasks/create", {
        title: formData.title,
        description: formData.description,
        latitude: 0, // map picker later
        longitude: 0,
        date: formData.startDate || new Date().toISOString(),
      });

      // ✅ store created taskId
      if (res.data?.task?._id) {
        localStorage.setItem("lastTaskId", res.data.task._id);
      }

      alert("Task assigned to volunteers successfully");
      onClose();

      // reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        assignedTo: [""],
        priority: "Medium",
        startDate: "",
        endDate: "",
        location: "",
        notes: "",
      });
    } catch (error: any) {
      console.error("CREATE TASK ERROR:", error);
      alert(error?.response?.data?.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-[#F1F8E9] rounded-lg w-full max-w-lg p-6 relative">
        <h2 className="text-[#246427] text-xl font-semibold mb-4">
          Add New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* 🔒 UI BELOW IS UNCHANGED */}

          <div>
            <label className="text-[#212121] font-medium">Task Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#246427]"
              required
            />
          </div>

          <div>
            <label className="text-[#212121] font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#246427]"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="text-[#212121] font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#246427]"
            />
          </div>

          <div>
            <label className="text-[#212121] font-medium">Assigned To</label>
            {formData.assignedTo.map((volunteer, index) => (
              <div key={index} className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={volunteer}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Volunteer Name"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#246427]"
                />
                {index === 0 ? (
                  <button
                    type="button"
                    onClick={addAssigneeField}
                    className="px-3 py-1 bg-[#246427] text-white rounded hover:bg-[#81C784] transition"
                  >
                    +
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => removeAssigneeField(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="text-[#212121] font-medium">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#246427]"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-[#212121] font-medium">Start Date</label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#246427]"
              />
            </div>
            <div className="flex-1">
              <label className="text-[#212121] font-medium">End Date</label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#246427]"
              />
            </div>
          </div>

          <div>
            <label className="text-[#212121] font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#246427]"
            />
          </div>

          <div>
            <label className="text-[#212121] font-medium">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#246427]"
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-300 text-[#212121] hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-[#246427] text-white hover:bg-[#81C784] transition"
            >
              {loading ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VolunteerAddTaskDialog;
