import { useNavigate } from "react-router-dom";
import { Logo } from "../../components";
import { ResetPswdForm } from "../../features/auth";
import "./Auth.scss";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="form-page">
      <Logo />
      <div className="form-page__header">
        <p>Reset your account</p>
        <p>
          Enter your new password below. Make sure it's strong and <br />
          secure
        </p>
      </div>
      <ResetPswdForm />
      <div className="form-page__footer">
        <div className="form-page__footer-row">
          <span onClick={() => navigate("/login")}>Back to login</span>
        </div>
      </div>
    </div>
  );
}
