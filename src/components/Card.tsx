import cn from "classnames";
import { Card as CardMui, CardContent, Button, Tooltip } from "@mui/material";
import { TrailStatus } from "./ModalCard";

export type LiftStatus = "OPEN" | "HOLD" | "CLOSED";

export type LiftProps = {
  id: string;
  name: string;
  elevationGain?: number;
  status: LiftStatus | TrailStatus;
  isLift?: boolean;
};

export type CustomParams = {
  id: string;
};

const Card = ({
  isLift = true,
  id,
  name,
  status,
  elevationGain,
}: LiftProps) => {
  const handleModalOpen = () => {
    document.dispatchEvent(
      new CustomEvent<CustomParams>("open-modal", {
        detail: { id },
      })
    );
  };
  const cardClass = cn("sw-card", {
    "sw-card-lift": isLift,
    "sw-card-trail": !isLift,
  });

  return (
    <CardMui id={id} className={cardClass} sx={{ minWidth: 500 }}>
      <CardContent className="sw-card__content">
        <div className="sw-card__headline">
          <Tooltip placement="bottom-start" title={name}>
            <div className="sw-card__name">{name}</div>
          </Tooltip>
          {elevationGain && (
            <div className="sw-card__elevation">
              {`Elevation: `}
              <span className="sw-card__elevation-value">{elevationGain}</span>
            </div>
          )}
        </div>
        <div className="sw-card__status">{status.toLowerCase()}</div>
        {isLift && (
          <Button
            onClick={handleModalOpen}
            className="sw-card__edit"
            size="small"
          >
            Edit
          </Button>
        )}
      </CardContent>
    </CardMui>
  );
};

export default Card;
