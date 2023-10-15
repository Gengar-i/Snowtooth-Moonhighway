import { gql } from "@apollo/client";

export const GET_ALL_LIFTS_BY_STATUS = gql`
  query GetLifts($status: LiftStatus) {
    allLifts(status: $status) {
      id
      name
      elevationGain
      status
    }
  }
`;

export const GET_LIFT = gql`
  query GetLift($id: ID!) {
    Lift(id: $id) {
      id
      name
      status
      elevationGain
      trailAccess {
        id
        status
        name
      }
    }
  }
`;

const SET_LIFT_STATUS = gql`
  mutation SetLiftStatus($id: ID!, $status: LiftStatus!) {
    setLiftStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;
