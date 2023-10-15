import { useCallback } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Input,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { SET_LIFT_STATUS } from "../queries";
import { LIFT_STATUS, LIFT_EDITABLE_VALUES } from "../helpers/helpers";
import { LiftProps, LiftStatus } from "./Card";
import TrailContainer from "./TrailContainer";

export type TrailStatus = "OPEN" | "CLOSED";

export type TrailProps = {
  id: string;
  name: string;
  status: TrailStatus;
};

type ModalProps = {
  lift: LiftProps & {
    trailAccess: TrailProps[];
  };
  onClose: () => void;
};

type FormData = {
  liftStatus: LiftStatus;
  name: string;
  elevationGain: number;
};

const ModalCard = ({ lift, onClose }: ModalProps) => {
  const { id, name, elevationGain, status: liftStatus, trailAccess } = lift;
  const [setLiftStatus] = useMutation(SET_LIFT_STATUS);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = useCallback(
    async (data) => {
      try {
        const { liftStatus } = data;

        setLiftStatus({
          variables: { id: id, status: liftStatus },
        });
      } catch (error) {
        console.error("Error setting lift status", error);
      }
      onClose();
    },
    [id, setLiftStatus, onClose]
  );

  return (
    <form id={id} className="sm-modal-card" onSubmit={handleSubmit(onSubmit)}>
      <div className="sm-modal-card__headline">
        <Input
          {...register("name", { maxLength: 20 })}
          className="sm-modal-card__input-root"
          inputProps={{
            className: "sm-modal-card__input",
          }}
          placeholder="Name"
          defaultValue={name}
          readOnly={!LIFT_EDITABLE_VALUES.name}
        />
        {errors.name && (
          <p className="sm-modal-card__error">
            Name can be only 20 characters long
          </p>
        )}
      </div>
      <div className="sm-modal-card__elevation">
        <Input
          {...register("elevationGain", {
            pattern: /^[0-9]+$/,
            min: 1,
            max: 8849,
          })}
          className="sm-modal-card__input-root"
          inputProps={{
            className: "sm-modal-card__input",
          }}
          placeholder="Elevation Gain"
          defaultValue={elevationGain}
          readOnly={!LIFT_EDITABLE_VALUES.elevationGain}
        />
        {errors.elevationGain && (
          <p className="sm-modal-card__error">Please enter a valid number</p>
        )}
      </div>
      <div className="sm-modal-card__select">
        <FormControl className="sm-filter">
          <InputLabel id="lift-status-input">Update Status</InputLabel>
          <Controller
            name="liftStatus"
            control={control}
            defaultValue={liftStatus}
            render={({ field }) => (
              <Select
                {...field}
                labelId="lift-status-input"
                id="lift-status-select"
                label="Update Status"
                readOnly={!LIFT_EDITABLE_VALUES.status}
              >
                {Object.values(LIFT_STATUS).map((statusValue) => (
                  <MenuItem key={statusValue} value={statusValue}>
                    {statusValue.toLowerCase()}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </div>
      <div className="sm-modal-card__trail-list">
        <h3 className="sm-modal-card__trail-headline">Trail Access List</h3>
        <TrailContainer data={trailAccess} />
      </div>
      <div className="sm-modal-card__btsn-container">
        <Button variant="contained" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ModalCard;
