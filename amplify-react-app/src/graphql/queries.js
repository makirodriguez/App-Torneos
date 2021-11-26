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
      userCreator
      teams
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
        userCreator
        teams
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      id
      name
      lastName
      number
      email
      country
      province
      createdAt
      updatedAt
    }
  }
`;
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        lastName
        number
        email
        country
        province
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      id
      name
      users
      userCreator
      createdAt
      updatedAt
    }
  }
`;
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        users
        userCreator
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
