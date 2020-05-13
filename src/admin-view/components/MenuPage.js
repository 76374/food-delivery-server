import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../Environment';
import MenuCategory from './MenuCategory/MenuCategory';

const MenuPageQuery = graphql`
  query MenuPageQuery {
    menu {
      ...MenuCategory_menuCategory
    }
  }
`;
const MenuPage = () => (
  <QueryRenderer
    environment={environment}
    query={MenuPageQuery}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>;
      } else if (props) {
        return props.menu.map(m => <MenuCategory menuCategory={m} key={'Category-' + m.__id} />);
      }
      return <div>Loading</div>;
    }}
  />
);

export default MenuPage;
