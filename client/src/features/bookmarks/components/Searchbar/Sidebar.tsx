import { useSidebarStore } from "../../stores/useSidebarStore";
import { Logo } from "../../../../components";
import HomeIcon from "../../../../assets/icon-home.svg?react";
import ArchivedIcon from "../../../../assets/icon-archive.svg?react";
import { useBookmarkStore } from "../../stores/useBookmarkStore";
import "./Sidebar.scss";

export default function Sidebar() {
  const activeTab = useSidebarStore((s) => s.activeTab);
  const setActiveTab = useSidebarStore((s) => s.setActiveTab);

  const isHomeActive =
    activeTab === "Home" ? "sidebar__nav-content--active" : "";

  const isArchivedActive =
    activeTab === "Archived" ? "sidebar__nav-content--active" : "";

  const setHomeActive = () => setActiveTab("Home");
  const setArchivedActive = () => setActiveTab("Archived");

  const tags = useBookmarkStore((s) => s.tags);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Logo />
      </div>
      <div className="sidebar__navigation">
        <div className="sidebar__main-nav">
          <div className="sidebar__nav-item">
            <div
              className={`sidebar__nav-content ${isHomeActive}`}
              onClick={setHomeActive}
            >
              <HomeIcon />
              <div>Home</div>
            </div>
          </div>
          <div className="sidebar__nav-item">
            <div
              className={`sidebar__nav-content ${isArchivedActive}`}
              onClick={setArchivedActive}
            >
              <ArchivedIcon />
              <div>Archived</div>
            </div>
          </div>
        </div>
        <div className="sidebar__tags">
          <div className="sidebar__tags-title">TAGS</div>
          <div className="sidebar__tags-list">
            {[...tags.entries()]
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map(([tag, count]) => (
                <div className="sidebar__tags-content">
                  <div key={tag} className="sidebar__tags-item">
                    <label>
                      <input type="checkbox" />
                      {tag}
                    </label>
                    <span className="sidebar__tags-count">{count}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
