import { CiBookmark } from "react-icons/ci";
import "./Logo.scss";

export default function Logo() {
  return (
    <div className="logo">
      <div className="logo__icon-container">
        <CiBookmark />
      </div>
      <div className="logo__title">Bookmark Manager</div>
    </div>
  );
}
