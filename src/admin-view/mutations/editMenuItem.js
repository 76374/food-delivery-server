import { graphql, commitMutation } from 'react-relay';
import environment from '../Environment';

const mutation = graphql`
  mutation editMenuItemMutation($input: EditMenuItemInput!) {
    editMenuItem(input: $input) {
      id
    }
  }
`;

function editMenuItem(data, onComplete) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        id: data.id,
        title: data.title,
        price: data.price,
        menuCategory: data.categoryTitle,
      },
    },
    onCompleted: (store) => {
      if (onComplete) {
        onComplete();
      }
    },
    onError: (e) => {
      alert('Something happened on the server');
    },
  });
}

export default editMenuItem;
