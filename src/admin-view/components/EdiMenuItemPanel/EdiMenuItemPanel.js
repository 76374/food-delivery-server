import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DoneOutline from '@material-ui/icons/DoneOutline';
import HighlightOff from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    padding: 20,
  },
  inputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 400,
  },
  inputField: {
    margin: '8px 0px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
  }
}));

const EdiMenuItemPanel = (props) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({});

  if (formData.title === undefined && props.title) {
    formData.title = props.title;
  }
  if (formData.price === undefined && props.price) {
    formData.price = props.price;
  }
  if (formData.categoryTitle === undefined && props.categoryTitle) {
    formData.categoryTitle = props.categoryTitle;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    props.submited && props.submited({ ...formData });
  };

  const onTitleChanged = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };
  const onCategoryChanged = (e) => {
    setFormData({ ...formData, categoryTitle: e.target.value });
  };
  const onPriceChanged = (e) => {
    setFormData({ ...formData, price: +e.target.value });
  };

  const onCancelClick = () => {
    if (props.canceled) {
      props.canceled();
    }
  };

  const submitEnabled = formData.title && formData.categoryTitle && formData.price;
  return (
    <Modal open className={classes.modal}>
      <Paper className={classes.popup}>
        <form className={classes.inputsContainer}>
          <TextField
            className={classes.inputField}
            label="Title"
            onChange={onTitleChanged}
            value={formData.title}
          />
          <TextField
            className={classes.inputField}
            label="Price"
            type="number"
            min="0"
            value={formData.price}
            onChange={onPriceChanged}
          />
          <TextField
            className={classes.inputField}
            label="Category"
            value={formData.categoryTitle}
            onChange={onCategoryChanged}
          />
          <div className={classes.buttonsContainer}>
            <IconButton disabled={!submitEnabled} onClick={onSubmit}>
              <DoneOutline fontSize="large" color="primary"/>
            </IconButton>
            <IconButton onClick={onCancelClick}>
              <HighlightOff fontSize="large" color="error" />
            </IconButton>
          </div>
        </form>
      </Paper>
    </Modal>
  );
};

export default EdiMenuItemPanel;
