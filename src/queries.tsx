import { gql } from "@apollo/client";

export const GET_ALL_LIFTS = gql`
  {
    allLifts {
      id
      name
      elevationGain
      status
    }
  }
`;
