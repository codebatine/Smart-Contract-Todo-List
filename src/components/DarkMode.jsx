import React from 'react';

class DarkMode extends React.Component {
  constructor(props) {
    super(props);
    const localDarkMode = localStorage.getItem('isDarkMode');
    this.state = {
      isDarkMode: localDarkMode !== null ? JSON.parse(localDarkMode) : 
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
    };
  }

  componentDidMount() {
    if (this.state.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  componentDidUpdate() {
    if (this.state.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  toggleDarkMode = () => {
    const isDarkMode = !this.state.isDarkMode;
    this.setState({ isDarkMode });
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
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