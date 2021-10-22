/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTorneo = /* GraphQL */ `
  query GetTorneo($id: ID!) {
    getTorneo(id: $id) {
      id
      name
      sport
      startDate
      endDate
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTorneos = /* GraphQL */ `
  query ListTorneos(
    $filter: ModelTorneoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTorneos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        sport
        startDate
        endDate
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
