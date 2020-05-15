import { graphql, commitMutation } from 'react-relay';
import environment from '../Environment';

const mutation = graphql`
  mutation deleteMenuItemMutation($input: DeleteMenuItemInput!) {
    deleteMenuItem(input: $input)
  }
`;

function deleteMenuItem(id, onComplete) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { id },
    },
    onCompleted: (store) => {
      if (onComplete) {
        onComplete();
      }
    },
    onError: (e) => {
      console.log(e);
      alert('Something happened on the server');
    },
  });
}

export default deleteMenuItem;
