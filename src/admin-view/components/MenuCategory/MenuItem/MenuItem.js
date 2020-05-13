import React from 'react';
import { createFragmentContainer } from 'react-relay';

const MenuItem = (props) => {
  const { title, price } = props.menuItem;
  return (
    <>
      <div>{title}</div>
      <div>{price}</div>
    </>
  );
};

export default createFragmentContainer(MenuItem, {
  menuItem: graphql`
    fragment MenuItem_menuItem on MenuItem {
      id
      title
      price
    }
  `,
});
