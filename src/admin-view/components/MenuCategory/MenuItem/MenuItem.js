import React, { useCallback } from 'react';
import { createFragmentContainer } from 'react-relay';

const MenuItem = (props) => {
  const { editClicked, deleteClicked, menuItem } = props;
  const { title, price, id } = menuItem;

  const onEditClicked = useCallback(() => {
    editClicked && editClicked({ title, price, id });
  }, [title, price, id, editClicked]);

  const onDeleteClicked = useCallback(() => {
    deleteClicked && deleteClicked(id);
  }, [id, deleteClicked]);

  return (
    <div className="container">
      <div>{title}</div>
      <div>{price}</div>
      <button onClick={onEditClicked}>edit</button>
      <button onClick={onDeleteClicked}>remove</button>
      <style jsx>{`
        .container {
          display: flex;
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
