import sprite from "../../assets/sprite.svg";
import "../../styles/success.scss";

export const Success = () => {
  return (
    <section className="container">
      <div className="success-wrapper">
        <h2>User successfully registered</h2>
        <svg>
          <use href={`${sprite}#icon-success`} />
        </svg>
      </div>
    </section>
  );
};
