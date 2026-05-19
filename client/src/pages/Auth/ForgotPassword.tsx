import { useNavigate } from "react-router-dom";
import { Logo } from "../../components";
import { ForgotPswdForm } from "../../features/auth";
import "./Auth.scss";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="form-page">
      <Logo />
      <div className="form-page__header">
        <p>Forgot your account?</p>
        <p>
          Enter your email address below and we'll send you a link <br />
          to reset your password (in progress, you will be redirect to <br />
          reset the password directly)
        </p>
      </div>
      <ForgotPswdForm />
      <div className="form-page__footer">
        <div className="form-page__footer-row">
          <span onClick={() => navigate("/login")}>Back to login</span>
        </div>
      </div>
    </div>
  );
}
