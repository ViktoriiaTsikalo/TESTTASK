import ClipLoader from "react-spinners/ClipLoader";

export const Loader = () => (
  <ClipLoader
    color="#00BDD3"
    size={48}
    cssOverride={{
      display: "block",
      margin: "30px auto",
    }}
  />
);
