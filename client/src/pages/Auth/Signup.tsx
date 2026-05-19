import { useNavigate } from "react-router-dom";
import { Logo } from "../../components";
import { SignupForm } from "../../features/auth";
import "./Auth.scss";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="form-page">
      <Logo />
      <div className="form-page__header">
        <p>Create your account</p>
        <p>
          Join us and start saving your favorite links - organized, <br />
          searchable, and always within reach
        </p>
      </div>
      <SignupForm />
      <div className="form-page__footer">
        <div className="form-page__footer-row">
          <span>Already have an account?</span>
          <span onClick={() => navigate("/login")}>Log in</span>
        </div>
      </div>
    </div>
  );
}
