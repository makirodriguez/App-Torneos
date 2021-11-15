/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTorneo = /* GraphQL */ `
  mutation CreateTorneo(
    $input: CreateTorneoInput!
    $condition: ModelTorneoConditionInput
  ) {
    createTorneo(input: $input, condition: $condition) {
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
export const updateTorneo = /* GraphQL */ `
  mutation UpdateTorneo(
    $input: UpdateTorneoInput!
    $condition: ModelTorneoConditionInput
  ) {
    updateTorneo(input: $input, condition: $condition) {
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
export const deleteTorneo = /* GraphQL */ `
  mutation DeleteTorneo(
    $input: DeleteTorneoInput!
    $condition: ModelTorneoConditionInput
  ) {
    deleteTorneo(input: $input, condition: $condition) {
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
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
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
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
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
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
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
export const createTeam = /* GraphQL */ `
  mutation CreateTeam(
    $input: CreateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    createTeam(input: $input, condition: $condition) {
      id
      name
      users
      createdAt
      updatedAt
    }
  }
`;
export const updateTeam = /* GraphQL */ `
  mutation UpdateTeam(
    $input: UpdateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    updateTeam(input: $input, condition: $condition) {
      id
      name
      users
      createdAt
      updatedAt
    }
  }
`;
export const deleteTeam = /* GraphQL */ `
  mutation DeleteTeam(
    $input: DeleteTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    deleteTeam(input: $input, condition: $condition) {
      id
      name
      users
      createdAt
      updatedAt
    }
  }
`;
