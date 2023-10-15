import { useState, useCallback } from "react";
import { Button } from "@mui/material";
import { DrawerProps } from "@mui/material";
import { LiftProps } from "./Card";
import { LiftStatus } from "./Card";
import Filter from "./Filter";
import TrailContainer from "./TrailContainer";

export type TrailStatus = "OPEN" | "CLOSED";

export type TrailProps = {
  id: string;
  name: string;
  status: TrailStatus;
};

type ModalProps = {
  data: {
    Lift: LiftProps & {
      trailAccess: TrailProps[];
    };
  };
  onClose: DrawerProps["onClose"];
};

const ModalCard = ({ data, onClose }: ModalProps) => {
  const {
    id,
    name,
    elevationGain,
    status: liftStatus,
    trailAccess,
  } = data.Lift;
  const [status, setStatus] = useState<LiftStatus>(liftStatus);
  const handleOnClick = useCallback(() => {}, []);

  return (
    <div id={id} className="sw-modal-card">
      <div className="sw-modal-card__headline">
        <h2>{name}</h2>
      </div>
      <div className="sw-modal-card__elevation">
        <h3>Elevation: {elevationGain}</h3>
      </div>
      <div className="sw-modal-card__select">
        <Filter status={status} setStatus={setStatus} />
      </div>
      <div className="sw-modal-card__trail-list">
        <h3 className="sw-modal-card__trail-headline">Trail Access List</h3>
        <TrailContainer data={trailAccess} />
      </div>
      <div className="sw-modal-card__btsn-container">
        <Button
          variant="contained"
          color="error"
          onClick={(event) => onClose && onClose(event, "backdropClick")}
        >
          Cancel
        </Button>
        <Button onClick={handleOnClick} variant="contained" color="primary">
          Save
        </Button>
      </div>
    </div>
  );
};

export default ModalCard;
