import React, { useCallback } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import MenuItem from './MenuItem/MenuItem';
import CategoryTitle from './CategoryTitle/CategoryTitle';

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
    <div>
      <CategoryTitle title={title} />
      {props.menuCategory.items.map((i) => getMenuItem(i))}
    </div>
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
