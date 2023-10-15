import { useEffect, useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_LIFTS_BY_STATUS } from "../queries";
import Background from "./Background";
import CardContainer from "./CardContainer";
import Modal from "./Modal";
import Filter from "./Filter";
import { LiftStatus } from "./Card";
import { LIFTS_STATUS } from "../helpers";

export type LiftsStatus = LiftStatus | "ALL";

declare global {
  interface DocumentEventMap {
    "open-modal": CustomEvent;
  }
}

type CustomEvent = Event & {
  detail: {
    id: string;
  };
};

const Main = () => {
  const [status, setStatus] = useState<LiftsStatus>(LIFTS_STATUS.ALL);
  const [liftId, setLiftId] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const { data, loading, error } = useQuery(GET_ALL_LIFTS_BY_STATUS, {
    variables: { status: status !== "ALL" ? status : null },
  });
  const onOpen = useCallback((event: CustomEvent) => {
    const { detail } = event;

    setLiftId(detail.id);
    setOpen(true);
  }, []);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("open-modal", onOpen, false);

    return () => {
      document.removeEventListener("open-modal", onOpen, false);
    };
  }, [onOpen]);

  return (
    <main className="sm-main">
      <div className="sm-main__wrapper">
        <div className="sm-main__container">
          <div className="sm-main__headline">
            <h2 className="sm-main__title">Lifts</h2>
            <Filter withAll={true} setStatus={setStatus} status={status} />
          </div>
          <div className="sm-main__card-container">
            <CardContainer data={data} loading={loading} error={error} />
          </div>
        </div>
      </div>
      <Background />
      {liftId && (
        <Modal liftId={liftId} anchor={"right"} open={open} onClose={onClose} />
      )}
    </main>
  );
};

export default Main;
