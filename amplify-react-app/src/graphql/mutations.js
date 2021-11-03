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
      createdAt
      updatedAt
    }
  }
`;
export const createPerfil = /* GraphQL */ `
  mutation CreatePerfil(
    $input: CreatePerfilInput!
    $condition: ModelPerfilConditionInput
  ) {
    createPerfil(input: $input, condition: $condition) {
      id
      idPerfil
      name
      lastName
      number
      email
      country
      province
      filePath
      createdAt
      updatedAt
    }
  }
`;
export const updatePerfil = /* GraphQL */ `
  mutation UpdatePerfil(
    $input: UpdatePerfilInput!
    $condition: ModelPerfilConditionInput
  ) {
    updatePerfil(input: $input, condition: $condition) {
      id
      idPerfil
      name
      lastName
      number
      email
      country
      province
      filePath
      createdAt
      updatedAt
    }
  }
`;
export const deletePerfil = /* GraphQL */ `
  mutation DeletePerfil(
    $input: DeletePerfilInput!
    $condition: ModelPerfilConditionInput
  ) {
    deletePerfil(input: $input, condition: $condition) {
      id
      idPerfil
      name
      lastName
      number
      email
      country
      province
      filePath
      createdAt
      updatedAt
    }
  }
`;
