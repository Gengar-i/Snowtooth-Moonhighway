import { TrailProps } from "./ModalCard";
import Card from "./Card";

type TrailContainerProps = {
  data: TrailProps[];
};

const TrailContainer = ({ data }: TrailContainerProps) => {
  return (
    <div className="sw-trail-container">
      {data.map(({ id, name, status }: TrailProps) => (
        <Card key={id} id={id} name={name} status={status} isLift={false} />
      ))}
    </div>
  );
};

export default TrailContainer;
