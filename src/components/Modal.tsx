import { useQuery } from "@apollo/client";
import { Drawer, DrawerProps } from "@mui/material";
import { GET_LIFT } from "../queries";
import Loader from "./Loader";
import Error from "./Error";
import ModalCard from "./ModalCard";

type ModalTypes = DrawerProps & {
  liftId: string;
  onClose: () => void;
};

const Modal = ({ liftId, anchor, open, onClose }: ModalTypes) => {
  const { data, loading, error } = useQuery(GET_LIFT, {
    variables: { id: liftId },
  });
  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <Error error={error} />;
    }
    if (data && data.Lift) {
      return <ModalCard lift={data.Lift} onClose={onClose} />;
    }

    return null;
  };

  return (
    <Drawer className="sm-modal" anchor={anchor} open={open} onClose={onClose}>
      {renderContent()}
    </Drawer>
  );
};

export default Modal;
