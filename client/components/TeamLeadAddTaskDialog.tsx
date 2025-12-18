import React, { useState } from "react";

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

// Dummy data for Team Leads (replace with API call)
const teamLeads = ["Team Lead 1", "Team Lead 2", "Team Lead 3"];

interface TeamLeadAddTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeamLeadAddTaskDialog: React.FC<TeamLeadAddTaskDialogProps> = ({ isOpen, onClose }) => {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Admin Task Submitted:", formData);
    onClose(); // close modal
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
  };

  if (!isOpen) return null; // modal only renders when open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-[#F1F8E9] rounded-lg w-full max-w-lg p-6 relative">
        <h2 className="text-[#246427] text-xl font-semibold mb-4">Assign Task to Team Lead</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Task Title */}
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

          {/* Description */}
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

          {/* Category */}
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

          {/* Assign to Team Lead */}
          <div>
            <label className="text-[#212121] font-medium">Assign to Team Lead</label>
            <select
              name="assignedToTeamLead"
              value={formData.assignedToTeamLead}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#246427]"
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

          {/* Priority */}
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

          {/* Dates */}
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

          {/* Notes */}
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

          {/* Buttons */}
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
              className="px-4 py-2 rounded-lg bg-[#246427] text-white hover:bg-[#81C784] transition"
            >
              Assign Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamLeadAddTaskDialog;
