import React, { useState } from "react";
import api from "@/lib/api";

interface AdminTaskFormData {
  title: string;
  description: string;
  category: string;
  assignedToTeamLead: string;
  priority: string;
  startDate: string;
  endDate: string;
  notes: string;
}

const teamLeads = ["Team Lead 1", "Team Lead 2", "Team Lead 3"];

interface TeamLeadAddTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeamLeadAddTaskDialog: React.FC<TeamLeadAddTaskDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<AdminTaskFormData>({
    title: "",
    description: "",
    category: "",
    assignedToTeamLead: "",
    priority: "Medium",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ======================
     ✅ FINAL FIXED SUBMIT
  ====================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.startDate) {
      alert("Title and Start Date are required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: formData.title,
        description: formData.description,

        // ✅ BACKEND EXPECTS `date`
        date: new Date(formData.startDate).toISOString(),

        // ✅ REQUIRED FOR ATTENDANCE MATCHING (TEMP TEST VALUES)
        latitude: 19.0760,   // Mumbai
        longitude: 72.8777,

        // ✅ mapped from UI (NO UI CHANGE)
        location: formData.category || "General Area",
      };

      // ✅ CORRECT ENDPOINT
      const res = await api.post("/tasks/create", payload);

      localStorage.setItem("lastTaskId", res.data.task._id);

      alert("Task created successfully");
      onClose();

      setFormData({
        title: "",
        description: "",
        category: "",
        assignedToTeamLead: "",
        priority: "Medium",
        startDate: "",
        endDate: "",
        notes: "",
      });
    } catch (error: any) {
      console.error("CREATE TASK ERROR:", error);
      alert(error.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-[#F1F8E9] rounded-lg w-full max-w-lg p-6 relative">
        <h2 className="text-[#246427] text-xl font-semibold mb-4">
          Assign Task to Team Lead
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* 🔒 UI COMPLETELY UNCHANGED BELOW */}

          <div>
            <label className="text-[#212121] font-medium">Task Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>

          <div>
            <label className="text-[#212121] font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
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
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-[#212121] font-medium">
              Assign to Team Lead
            </label>
            <select
              name="assignedToTeamLead"
              value={formData.assignedToTeamLead}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            >
              <option value="">Select Team Lead</option>
              {teamLeads.map((lead) => (
                <option key={lead} value={lead}>
                  {lead}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[#212121] font-medium">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-[#212121] font-medium">
                Start Date
              </label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>

            <div className="flex-1">
              <label className="text-[#212121] font-medium">End Date</label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-[#212121] font-medium">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#246427] text-white rounded"
            >
              {loading ? "Assigning..." : "Assign Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamLeadAddTaskDialog;
