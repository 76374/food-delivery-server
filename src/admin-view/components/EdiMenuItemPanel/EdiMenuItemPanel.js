import React, { useState } from 'react';

const EdiMenuItemPanel = (props) => {
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

    props.submited && props.submited({...formData});
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
    <form onSubmit={onSubmit}>
      <label>Title</label>
      <input type="text" value={formData.title} onChange={onTitleChanged} />
      <label>Price</label>
      <input type="number" step="0.01" min="0" value={formData.price} onChange={onPriceChanged} />
      <label>Category</label>
      <input type="text" value={formData.categoryTitle} onChange={onCategoryChanged} />
      <input type="submit" value="Create" disabled={!submitEnabled} />
      <input type="button" onClick={onCancelClick} value="Cancel"/>
    </form>
  );
};

export default EdiMenuItemPanel;
