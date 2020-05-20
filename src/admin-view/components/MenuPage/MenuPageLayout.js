import React, { useState, useCallback } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import LinearProgress from '@material-ui/core/LinearProgress';

import MenuCategory from './MenuCategory/MenuCategory';
import EdiMenuItemPanel from './EdiMenuItemPanel/EdiMenuItemPanel';
import createMenuItem from '../../mutations/createMenuItem';
import editMenuItem from '../../mutations/editMenuItem';
import deleteMenuItem from '../../mutations/deleteMenuItem';

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

  const getMenuLayout = () => {
    return (
      <div>
        <table>
          <tbody>
            {props.menu.map((c) => (
              <MenuCategory
                menuCategory={c}
                key={'Category-' + c.__id}
                editItemClicked={onEditItemClicked}
                deleteItemClicked={onDeleteItemClicked}
              />
            ))}
          </tbody>
        </table>
        <IconButton onClick={onAddBtClick}>
          <AddCircleOutlineIcon fontSize="large" color="primary" />
        </IconButton>
      </div>
    );
  };

  const getEditLayout = () => {
    if (!editMode) {
      return null;
    }
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

  let layout = null;
  if (props.error) {
    layout = (
      <div>
        Error {}
        {props.error.message}
      </div>
    );
  } else if (!props.menu) {
    layout = (
      <>
        <div className="progress">
          <LinearProgress />
        </div>
        <style jsx>
          {`
            .progress {
              height: 10px;
            }
          `}
        </style>
      </>
    );
  } else {
    layout = getMenuLayout();
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      {layout}
      {getEditLayout()}
      <style jsx global>{`
        body {
          margin: 0 auto;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default MenuPageLayout;
