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
  const cardClass = cn("sm-card", {
    "sm-card-lift": isLift,
    "sm-card-trail": !isLift,
  });

  return (
    <CardMui id={id} className={cardClass} sx={{ minWidth: 500 }}>
      <CardContent className="sm-card__content">
        <div className="sm-card__headline">
          <Tooltip placement="bottom-start" title={name}>
            <div className="sm-card__name">{name}</div>
          </Tooltip>
          {elevationGain && (
            <div className="sm-card__elevation">
              {`Elevation: `}
              <span className="sm-card__elevation-value">{elevationGain}</span>
            </div>
          )}
        </div>
        <div className="sm-card__status">{status.toLowerCase()}</div>
        {isLift && (
          <Button
            onClick={handleModalOpen}
            className="sm-card__edit"
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
