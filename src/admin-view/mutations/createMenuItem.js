import { graphql, commitMutation } from 'react-relay';
import environment from '../Environment';
import Router from 'next/router';

const mutation = graphql`
  mutation createMenuItemMutation($input: CreateMenuItemInput!) {
    createMenuItem(input: $input) {
      id
    }
  }
`;

function createMenuItem(title, price, menuCategory) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        title: title,
        price: price,
        menuCategory: menuCategory,
      },
    },
    onCompleted: store => {
        Router.reload();
    },
    onError: e => {
        alert('Something happened on the server');
    }
  });
}

export default createMenuItem;
