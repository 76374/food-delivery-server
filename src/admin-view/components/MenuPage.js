import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../Environment';
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
      environment={environment}
      query={MenuPageQuery}
      render={({ error, props }) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (props) {
          return <MenuPageLayout menu={props.menu} />;
        }
        return <div>Loading</div>;
      }}
    />
  );
};

export default MenuPage;
