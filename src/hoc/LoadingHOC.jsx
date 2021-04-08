import { BackdropLoad } from "./BackdropLoad";
import { ErrorMessage } from "../components/ErrorMessage";


export const LoadingHOC = ({ state, children }) => {
  const { loading, error } = state;

  return (
    <>
      {error && <ErrorMessage error={error} />}
      {
        <BackdropLoad loading={loading}>
          {!error && children}
        </BackdropLoad>
      }
    </>
  );
};
