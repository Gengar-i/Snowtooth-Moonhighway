import { TrailProps } from "./ModalCard";
import Card from "./Card";

type TrailContainerProps = {
  data: TrailProps[];
};

const TrailContainer = ({ data }: TrailContainerProps) => {
  return (
    <div className="sm-trail-container">
      {data.map(({ id, name, status }: TrailProps) => (
        <Card key={id} id={id} name={name} status={status} />
      ))}
    </div>
  );
};

export default TrailContainer;
