import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import "../../styles/users.scss";
import {
  selectNextUrl,
  selectPrevUrl,
  selectUsers,
  selectUsersError,
  selectUsersLoading,
} from "../../redux/users/selectors";
import { fetchUsers } from "../../redux/users/operations";
import { Loader } from "../Loader/Loader";
import { UserCard } from "../UserCard/UserCard";

export const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);
  const nextUrl = useSelector(selectNextUrl);
  const prevUrl = useSelector(selectPrevUrl);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Error while loading");
    }
  }, [error]);

  const handleShowMore = () => {
    if (nextUrl) dispatch(fetchUsers(nextUrl));
  };

  const handlePrev = () => {
    if (prevUrl) dispatch(fetchUsers(prevUrl));
  };

  if (isLoading) return <Loader />;
  if (error) return null;

  return (
    <section id="users" className="container">
      <div className="users-wrapper">
        <h2>Working with GET request</h2>
        <ul className="users-list">
          {users.map((user) => (
            <li key={user.id}>
              <UserCard user={user} />
            </li>
          ))}
        </ul>
        <div className="buttons">
          {prevUrl && (
            <button onClick={handlePrev} disabled={isLoading}>
              Prev
            </button>
          )}
          {nextUrl && (
            <button onClick={handleShowMore} disabled={isLoading}>
              Show more
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
