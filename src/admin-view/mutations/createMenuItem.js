import { graphql, commitMutation } from 'react-relay';
import env from '../Environment';

const mutation = graphql`
  mutation createMenuItemMutation($input: CreateMenuItemInput!) {
    createMenuItem(input: $input) {
      id
    }
  }
`;

function createMenuItem(data, onComplete) {
  return commitMutation(env, {
    mutation,
    variables: {
      input: {
        title: data.title,
        price: data.price,
        menuCategory: data.categoryTitle,
      },
    },
    onCompleted: store => {
        if (onComplete) {
          onComplete();
        }
    },
    onError: e => {
        alert('Something went wrong');
    }
  });
}

export default createMenuItem;
