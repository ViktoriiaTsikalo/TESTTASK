import { useEffect, useRef, useState } from "react";
import "../../styles/userCard.scss";

export const UserCard = ({ user }) => {
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const positionRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  const [tips, setTips] = useState({
    name: "",
    position: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const isOverflow = (el) => !!el && el.scrollWidth > el.clientWidth;

    const update = () => {
      setTips({
        name: isOverflow(nameRef.current) ? user.name : "",
        position: isOverflow(positionRef.current) ? user.position : "",
        phone: isOverflow(phoneRef.current) ? user.phone : "",
        email: isOverflow(emailRef.current) ? user.email : "",
      });
    };

    update();

    const ro = new ResizeObserver(update);
    [containerRef, nameRef, positionRef, phoneRef, emailRef].forEach((r) => {
      if (r.current) ro.observe(r.current);
    });

    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [user]);

  return (
    <div className="user" ref={containerRef}>
      <img src={user.photo} alt={user.name} />

      <h3 className={tips.name ? "has-tooltip" : ""} data-tooltip={tips.name}>
        <span className="ellipsed" ref={nameRef}>
          {user.name}
        </span>
      </h3>

      <p
        className={tips.position ? "has-tooltip" : ""}
        data-tooltip={tips.position}
      >
        <span className="ellipsed" ref={positionRef}>
          {user.position}
        </span>
      </p>

      <a
        href={`tel:${user.phone}`}
        className={tips.phone ? "has-tooltip" : ""}
        data-tooltip={tips.phone}
      >
        <span className="ellipsed" ref={phoneRef}>
          {user.phone}
        </span>
      </a>

      <a
        href={`mailto:${user.email}`}
        className={tips.email ? "has-tooltip" : ""}
        data-tooltip={tips.email}
      >
        <span className="ellipsed" ref={emailRef}>
          {user.email}
        </span>
      </a>
    </div>
  );
};
