import { Sidebar } from "../../features/bookmarks";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="home__content">
        <div className="home__header">header</div>
        <div className="home__bookmarks">bookmarks</div>
      </div>
    </div>
  );
}
