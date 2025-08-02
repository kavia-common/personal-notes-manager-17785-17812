import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
function Sidebar({
  tags = [],
  activeTag,
  onTagClick,
  onClearTag,
  onLogout,
  user
}) {
  return (
    <aside className="sidebar">
      <div className="sidebarContent">
        <div className="sidebarHeader">
          <span className="brand accentText">Notes</span>
        </div>
        <div className="userSection">
          <span className="userAvatar">{user.email[0]?.toUpperCase()}</span>
          <span className="userEmail">{user.email}</span>
        </div>
        <div className="tagSection">
          <div className="tagHeader">
            Tags
            {activeTag && (
              <span className="clearTag" onClick={onClearTag}>
                &times; Clear
              </span>
            )}
          </div>
          <ul className="tagList">
            {tags.length === 0 && <li className="tagEmpty">No tags</li>}
            {tags.map(tag => (
              <li
                key={tag}
                className={activeTag === tag ? "tag active" : "tag"}
                onClick={() => onTagClick(tag)}
              >
                <span className="tagColorDot" style={{ background: "var(--accent)" }} />
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <button className="btn secondary logoutBtn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
export default Sidebar;
