import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import menuEnvironment from '../../Environment';
import MenuPageLayout from './MenuPageLayout';

const MenuPageQuery = graphql`
  query MenuPageQuery {
    menu {
      ...MenuCategory_menuCategory
    }
  }
`;

const MenuPage = () => {
  return (
    <QueryRenderer
      environment={menuEnvironment}
      query={MenuPageQuery}
      render={({ error, props }) => <MenuPageLayout menu={props && props.menu} error={error} />}
    />
  );
};

export default MenuPage;
