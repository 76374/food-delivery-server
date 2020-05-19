import React, { useCallback } from 'react';
import { createFragmentContainer } from 'react-relay';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

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
    <tr>
      <td><Typography>{title}</Typography></td>
      <td><Typography>{price}</Typography></td>
      <td><IconButton onClick={onEditClicked} size="small">
        <EditIcon/>
      </IconButton></td>
      <td><IconButton onClick={onDeleteClicked} size="small">
        <DeleteIcon/>
      </IconButton></td>
      <style jsx>{`
        .container {
          display: flex;
        }
      `}</style>
    </tr>
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
