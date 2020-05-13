import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import MenuItem from './MenuItem/MenuItem';
import CategoryTitle from './CategoryTitle/CategoryTitle';

const MenuCategory = (props) => {
  return (
    <div>
      <CategoryTitle title={props.menuCategory.title} />
      {props.menuCategory.items.map((i) => (
        <MenuItem menuItem={i} key={i.__id} />
      ))}
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
