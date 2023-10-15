import { ApolloError } from "@apollo/client";

type Error = {
  error: ApolloError | undefined;
};

const Error = ({ error }: Error) => {
  return (
    <div className="sm-container">
      <p className="sm-error">Error: {error?.message}</p>
    </div>
  );
};

export default Error;
