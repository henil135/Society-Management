import { useState } from "react";
import SecuritySidebar from "../../component/layout/SecuritySidebar";
import Header from "../Navbar";

const EmergencyManagement = () => {
  const [formData, setFormData] = useState({
    alertType: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="d-flex flex-column flex-md-row dashboard-bg h-100">
      {/* Sidebar Section */}
      <div className="flex-shrink-0" >
        <SecuritySidebar   />
      </div>

      {/* Main Content Section */}
      <div className="flex-grow-1" style={{ width: "1910px" }}>
        <Header />
        
        {/* Alert Form Section */}
        <div className="stickyHeader" style={styles.formContainer} >
          <h2 style={styles.title}>Alert </h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Alert Type *</label>
              
              <select
                name="alertType"
                value={formData.alertType}
                onChange={handleInputChange}
                style={styles.select}
                required
              >
                <option value="">Select Alert</option>
                <option value="emergency">Emergency</option>
                <option value="warning">Warning</option>
                <option value="firealarm">Fire Alarm</option>
                <option value="earthquack">Earth Quack</option>
                <option value="highwinds">High Winds</option>
                <option value="thunder">Thunder</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide details about the emergency situation."
                style={styles.textarea}
                required
              />
            </div>
            <button type="submit" style={styles.button}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  formContainer: {
    position: "relative",
    top:"200px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
     width:"630px",
    left: "800px",
    padding: "50px",
    gap: "10px",



  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    marginBottom: "8px",
    fontSize: "16px",
    display: "block",
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    color: "#fff",
    background: "linear-gradient(90deg, #FE512E 0%, #F09619 100%)",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default EmergencyManagement;
