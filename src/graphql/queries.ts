import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters {
    allPeople {
      people {
        id
        name
        birthYear
        species {
          name
        }
        homeworld {
          name
        }
        filmConnection {
          films {
            title
          }
        }
      }
    }
  }
`;

export const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetails($id: ID!) {
    person(id: $id) {
      name
      birthYear
      species {
        name
      }
      homeworld {
        name
      }
      filmConnection {
        films {
          title
        }
      }
    }
  }
`;
