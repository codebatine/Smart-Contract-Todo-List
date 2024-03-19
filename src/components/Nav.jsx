import DarkMode from './DarkMode.jsx';

const Nav = () => {
  return (
    <nav className="navbar">
      <div>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
      <DarkMode />
    </nav>
  );
};

export default Nav;