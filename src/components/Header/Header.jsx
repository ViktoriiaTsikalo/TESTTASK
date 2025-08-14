import "../../styles/header.scss";
import sprite from "../../assets/sprite.svg";

export const Header = () => {
  return (
    <header className="container-header">
      <div className="container">
        <nav className="header-wrapper">
          <ul>
            <li>
              <a href="/">
                <svg>
                  <use href={`${sprite}#icon-logo`} />
                </svg>
              </a>
            </li>
            <li>
              <a href="#users">Users</a>
            </li>
            <li>
              <a href="#sign">Sign Up</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
