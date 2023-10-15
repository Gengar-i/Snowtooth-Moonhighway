import Card from "./Card";
import { LiftProps } from "./Card";
import { ApolloError } from "@apollo/client";
import Loader from "./Loader";
import Error from "./Error";

type CardContainerProps = {
  data: {
    allLifts: LiftProps[];
  };
  loading: boolean;
  error: ApolloError | undefined;
};

const CardContainer = ({ data, loading, error }: CardContainerProps) => {
  if (loading) return <Loader />;
  if (error) return <Error error={error} />;

  const { allLifts } = data;

  return (
    <>
      {allLifts.map(({ id, name, status, elevationGain }: LiftProps) => (
        <Card
          key={id}
          id={id}
          name={name}
          status={status}
          elevationGain={elevationGain}
          isLift
        />
      ))}
    </>
  );
};

export default CardContainer;
