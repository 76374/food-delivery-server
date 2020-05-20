import React, { useCallback } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Typography from '@material-ui/core/Typography';

import MenuItem from './MenuItem/MenuItem';

const MenuCategory = (props) => {
  const { menuCategory, editItemClicked, deleteItemClicked } = props;
  const { title } = menuCategory;

  const onEditItemClicked = useCallback(
    (itemData) => {
      editItemClicked &&
        editItemClicked({
          itemData,
          categoryTitle: title,
        });
    },
    [title]
  );

  const onDeleteItemClicked = useCallback((id) => {
    deleteItemClicked && deleteItemClicked(id);
  }, []);

  const getMenuItem = (data) => (
    <MenuItem
      menuItem={data}
      key={data.__id}
      editClicked={onEditItemClicked}
      deleteClicked={onDeleteItemClicked}
    />
  );

  return (
    <>
      <tr>
        <td colSpan="4">
          <hr />
        </td>
      </tr>
      <tr>
        <td colSpan="4">
          <Typography variant="h5" align="center">
            {title}
          </Typography>
        </td>
      </tr>
      {props.menuCategory.items.map((i) => getMenuItem(i))}
    </>
  );
};

export default createFragmentContainer(MenuCategory, {
  menuCategory: graphql`
    fragment MenuCategory_menuCategory on MenuCategory {
      title
      items {
        ...MenuItem_menuItem
      }
    }
  `,
});
