import React from 'react';
import { createFragmentContainer } from 'react-relay';

const MenuItem = (props) => {
  const { title, price } = props.menuItem;
  return (
    <div className="container">
      <div>{title}</div>
      <div>{price}</div>
      <button>edit</button>
      <button>remove</button>
      <style jsx>{`
        .container {
          display:flex;
        }
      `}</style>
    </div>
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
