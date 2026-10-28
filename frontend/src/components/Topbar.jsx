
import { Bot, Sun, Moon, Globe, Menu } from 'lucide-react'

function Topbar({
  t,
  isDark,
  toggleTheme,
  toggleLanguage,
  onOpenSidebar,
}) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="icon-button mobile-menu"
          onClick={onOpenSidebar}
          aria-label={t.openSidebar}
        >
          <Menu size={20} />
        </button>

        <div className="model-selector">
          <span className="status-dot" />
          <span>{t.assistant}</span>
          <span className="model-badge">{t.beta}</span>
        </div>
      </div>

      <div className="topbar-actions">
        <button
          className="icon-button"
          onClick={toggleLanguage}
          aria-label={t.language}
          title={t.language}
        >
          <Globe size={18} />
        </button>

        <button
          className="icon-button"
          onClick={toggleTheme}
          aria-label={t.toggleTheme}
          title={t.toggleTheme}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="share-button">{t.feedback}</button>
      </div>
    </header>
  )
}

export default Topbar
