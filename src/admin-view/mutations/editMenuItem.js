import { graphql, commitMutation } from 'react-relay';
import env from '../Environment';

const mutation = graphql`
  mutation editMenuItemMutation($input: EditMenuItemInput!) {
    editMenuItem(input: $input) {
      id
    }
  }
`;

function editMenuItem(data, onComplete) {
  return commitMutation(env, {
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
