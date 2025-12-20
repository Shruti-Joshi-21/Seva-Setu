import { useState } from "react";
import api from "@/lib/api"; // ✅ ADDED (LOGIC ONLY)

interface LeaveRequestDialogProps {
  open: boolean;
  onClose: () => void;
}

const LeaveRequestDialog: React.FC<LeaveRequestDialogProps> = ({
  open,
  onClose,
}) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  if (!open) return null;

  /* ======================
     ✅ LOGIC ONLY UPDATED
  ====================== */
  const submitLeave = async () => {
    if (!fromDate || !toDate || !reason) {
      alert("All fields are required");
      return;
    }

    try {
      await api.post("/leaves", {
        fromDate,
        toDate,
        reason,
      });

      alert("Leave request submitted successfully");
      onClose();

      // optional reset
      setFromDate("");
      setToDate("");
      setReason("");
    } catch (error: any) {
      console.error("APPLY LEAVE ERROR:", error);
      alert(error.response?.data?.message || "Failed to apply leave");
    }
  };

  /* ======================
     ⛔ UI BELOW — UNCHANGED
  ====================== */
  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h2 style={styles.heading}>Request Leave</h2>

        <label style={styles.label}>From Date</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>To Date</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Reason</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={styles.textarea}
          placeholder="Briefly explain your reason..."
        />

        <label style={styles.label}>Status</label>
        <input value="PENDING" disabled style={styles.status} />

        <div style={styles.actions}>
          <button style={styles.secondaryBtn} onClick={onClose}>
            Cancel
          </button>
          <button style={styles.primaryBtn} onClick={submitLeave}>
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestDialog;

/* ⛔ STYLES UNTOUCHED */
const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  dialog: {
    width: "520px",
    backgroundColor: "#F1F8E9",
    borderRadius: "14px",
    padding: "24px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.25)",
  },
  heading: {
    color: "#246427",
    marginBottom: "16px",
    textAlign: "center",
  },
  label: {
    display: "block",
    marginTop: "12px",
    marginBottom: "4px",
    color: "#212121",
    fontWeight: 500,
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #81C784",
    backgroundColor: "#FFFFFF",
  },
  textarea: {
    width: "100%",
    minHeight: "90px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #81C784",
    resize: "none",
  },
  status: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px dashed #F8AC3B",
    backgroundColor: "#FFF8E1",
    color: "#616161",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "22px",
  },
  primaryBtn: {
    backgroundColor: "#246427",
    color: "#FFFFFF",
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  secondaryBtn: {
    backgroundColor: "#81C784",
    color: "#212121",
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
};
