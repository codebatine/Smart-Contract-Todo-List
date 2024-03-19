import React from 'react';

class DarkMode extends React.Component {
  state = {
    isDarkMode:
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches,
  };

  componentDidMount() {
    if (this.state.isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }

  toggleDarkMode = () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    this.setState({ isDarkMode });
  };

  render() {
    const { isDarkMode } = this.state;

    return (
      <button
        className={`toggle-dark-mode ${isDarkMode ? 'dark' : ''}`}
        onClick={this.toggleDarkMode}
      >
        {isDarkMode ? '🌞' : '🌙'}
      </button>
    );
  }
}

export default DarkMode;
