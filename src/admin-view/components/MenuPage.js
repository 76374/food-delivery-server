import React, { useState } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../Environment';
import MenuCategory from './MenuCategory/MenuCategory';
import EdiMenuItemPanel from './EdiMenuItemPanel/EdiMenuItemPanel';

const MenuPageQuery = graphql`
  query MenuPageQuery {
    menu {
      ...MenuCategory_menuCategory
    }
  }
`;

const MenuPage = () => {
  const [editMode, setEditMode] = useState(false);

  const onAddBtClick = () => {
    setEditMode(true);
  };

  const onEditCanceled = () => {
    setEditMode(false);
  }

  const getMenuLayout = (props) => (
    <>
      {props.menu.map((m) => (
        <MenuCategory menuCategory={m} key={'Category-' + m.__id} />
      ))}
      <button onClick={onAddBtClick}>Add item</button>
    </>
  );

  const getEditLayout = () => <EdiMenuItemPanel canceled={onEditCanceled} />;

  const getPage = (props) => {
    return <div>{editMode ? getEditLayout() : getMenuLayout(props)}</div>;
  };

  return (
    <QueryRenderer
      environment={environment}
      query={MenuPageQuery}
      render={({ error, props }) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (props) {
          return getPage(props);
        }
        return <div>Loading</div>;
      }}
    />
  );
};

export default MenuPage;
