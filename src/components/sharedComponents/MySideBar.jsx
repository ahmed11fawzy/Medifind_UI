import "../../styles/sidebar.css";
import { Button, ProgressBar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

export const MySideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // مسح البيانات من localStorage أو sessionStorage
    localStorage.clear(); // أو sessionStorage.clear(); حسب ما تستخدمينه
    // توجيه المستخدم إلى صفحة تسجيل الدخول
    navigate("/login");
  };

  return (
    <div className="sidebar d-flex flex-column p-4">
      <NavLink to="/home" className={({ isActive }) => (isActive ? "active-link" : "")}>
        Home
      </NavLink>

      <div className="progress-container">
        <NavLink to="/profile" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Profile
        </NavLink>
        <p className="label">completement:</p>
        <ProgressBar now={75} label={`${75}%`} style={{ height: "10px", borderRadius: "5px", width: "100%" }} />
      </div>

      <NavLink to="/needs" className={({ isActive }) => (isActive ? "active-link" : "")}>
        Needs
      </NavLink>

      <NavLink to="/settings" className={({ isActive }) => (isActive ? "active-link" : "")}>
        Settings
      </NavLink>
      <NavLink to="/help-center" className={({ isActive }) => (isActive ? "active-link" : "")}>
        Help Center
      </NavLink>
      <NavLink to="/contact-us" className={({ isActive }) => (isActive ? "active-link" : "")}>
        Contact Us
      </NavLink>

      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};
