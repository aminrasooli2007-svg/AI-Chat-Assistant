
import { Bot } from 'lucide-react'

function Welcome({ t, onSelectSuggestion }) {
  return (
    <div className="welcome">
      <div className="welcome-icon">
        <Bot size={30} />
        <span className="welcome-orbit orbit-one" />
        <span className="welcome-orbit orbit-two" />
      </div>

      <p className="eyebrow">{t.eyebrow}</p>

      <h1>
        {t.headingFirst}
        <br />
        <span>{t.headingSecond}</span>
      </h1>

      <p className="welcome-description">
        {t.descriptionFirst}
        <br className="desktop-break" />
        {t.descriptionSecond}
      </p>

      <div className="suggestion-grid">
        <button
          className="suggestion-card"
          onClick={() => onSelectSuggestion(t.suggestionBrainstorm)}
        >
          <span className="suggestion-icon purple">✳</span>
          <span>
            <strong>{t.brainstorm}</strong>
            <small>{t.brainstormDescription}</small>
          </span>
        </button>

        <button
          className="suggestion-card"
          onClick={() => onSelectSuggestion(t.suggestionLearn)}
        >
          <span className="suggestion-icon orange">⌘</span>
          <span>
            <strong>{t.learn}</strong>
            <small>{t.learnDescription}</small>
          </span>
        </button>

        <button
          className="suggestion-card"
          onClick={() => onSelectSuggestion(t.suggestionCode)}
        >
          <span className="suggestion-icon blue">〈/〉</span>
          <span>
            <strong>{t.code}</strong>
            <small>{t.codeDescription}</small>
          </span>
        </button>

        <button
          className="suggestion-card"
          onClick={() => onSelectSuggestion(t.suggestionPlan)}
        >
          <span className="suggestion-icon green">↗</span>
          <span>
            <strong>{t.plan}</strong>
            <small>{t.planDescriptionCard}</small>
          </span>
        </button>
      </div>
    </div>
  )
}

export default Welcome
