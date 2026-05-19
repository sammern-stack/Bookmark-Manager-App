import { useNavigate } from "react-router-dom";
import { Logo } from "../../components";
import { LoginForm } from "../../features/auth";
import "./Auth.scss";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="form-page">
      <Logo />
      <div className="form-page__header">
        <p>Log in to your account</p>
        <p>Welcome back! Please enter your details</p>
      </div>
      <LoginForm />
      <div className="form-page__footer">
        <div className="form-page__footer-row">
          <span>Forgot password?</span>
          <span onClick={() => navigate("/forgot-password")}>Reset it</span>
        </div>
        <div className="form-page__footer-row">
          <span>Don't have an account?</span>
          <span onClick={() => navigate("/signup")}>Sign up</span>
        </div>
      </div>
    </div>
  );
}
