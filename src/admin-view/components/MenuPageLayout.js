import React, { useState, useCallback } from 'react';
import Router from 'next/router';
import MenuCategory from './MenuCategory/MenuCategory';
import EdiMenuItemPanel from './EdiMenuItemPanel/EdiMenuItemPanel';
import createMenuItem from '../mutations/createMenuItem';
import editMenuItem from '../mutations/editMenuItem';
import deleteMenuItem from '../mutations/deleteMenuItem';

const MenuPageLayout = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [editProps, setEditProps] = useState(null);

  const onAddBtClick = useCallback(() => {
    setEditMode(true);
  }, []);
  const onEditCanceled = useCallback(() => {
    setEditMode(false);
  }, [setEditMode]);
  const onEditItemClicked = useCallback(
    (data) => {
      setEditMode(true);
      setEditProps(data);
    },
    [setEditMode, setEditProps]
  );
  const onEditComplete = useCallback(() => {
    Router.reload();
  }, []);
  const onEditSubmited = useCallback(
    (data) => {
      setEditMode(false);
      setEditProps(null);
      if (editProps) {
        editMenuItem(
          {
            id: editProps.itemData.id,
            title: data.title,
            price: data.price,
            categoryTitle: data.categoryTitle,
          },
          onEditComplete
        );
      } else {
        createMenuItem(
          { title: data.title, price: data.price, categoryTitle: data.categoryTitle },
          onEditComplete
        );
      }
    },
    [editProps, onEditComplete, setEditMode, setEditProps]
  );
  const onDeleteItemClicked = useCallback(
    (id) => {
      deleteMenuItem(id, onEditComplete);
    },
    [onEditComplete]
  );

  const getMenuLayout = () => (
    <>
      {props.menu.map((c) => (
        <MenuCategory
          menuCategory={c}
          key={'Category-' + c.__id}
          editItemClicked={onEditItemClicked}
          deleteItemClicked={onDeleteItemClicked}
        />
      ))}
      <button onClick={onAddBtClick}>Add item</button>
    </>
  );

  const getEditLayout = () => {
    let title = null,
      price = null,
      categoryTitle = null;
    if (editProps) {
      title = editProps.itemData.title;
      price = editProps.itemData.price;
      categoryTitle = editProps.categoryTitle;
    }
    return (
      <EdiMenuItemPanel
        canceled={onEditCanceled}
        submited={onEditSubmited}
        title={title}
        price={price}
        categoryTitle={categoryTitle}
      />
    );
  };

  return <div>{editMode ? getEditLayout() : getMenuLayout()}</div>;
};

export default MenuPageLayout;
