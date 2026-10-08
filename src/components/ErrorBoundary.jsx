import { Component } from 'react';

/**
 * Last line of defence for the SPA.
 *
 * If a component throws during render, React unmounts the whole tree and the
 * visitor is left staring at a blank white page — the worst possible failure
 * for a portfolio. This catches the error and swaps in a branded fallback that
 * still offers a way out: reload, or the direct contact channels.
 *
 * Deliberately class-based: React exposes error boundaries only through
 * componentDidCatch / getDerivedStateFromError, which have no hook equivalent.
 */
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    // Surface the cause for anyone kind enough to open devtools.
    console.error('[su6osec] render failed:', error, info?.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="crash">
        <p className="crash__kicker">// runtime_exception</p>
        <h1 className="crash__title">Something broke.</h1>
        <p className="crash__body">
          The page hit an unexpected error while rendering. Reloading fixes it in almost every
          case — if it doesn&rsquo;t, the inbox below is always open.
        </p>

        <div className="crash__actions">
          <button type="button" className="btn btn--primary" onClick={() => window.location.reload()}>
            Reload the page
          </button>
          <a className="btn btn--ghost" href="/">
            Back to home
          </a>
        </div>

        <p className="crash__contact">
          <a href="mailto:deepanshu.infosec@gmail.com">deepanshu.infosec@gmail.com</a>
          <span aria-hidden="true"> · </span>
          <a href="https://github.com/su6osec">github.com/su6osec</a>
        </p>
      </div>
    );
  }
}
