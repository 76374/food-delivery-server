import React, { useState } from 'react';
import createMenuItem from '../../mutations/createMenuItem';

const EdiMenuItemPanel = (props) => {
  const [formData, setFormData] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();

    createMenuItem(formData.title, formData.price, formData.category);
  };

  const onTitleChanged = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };
  const onCategoryChanged = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };
  const onPriceChanged = (e) => {
    setFormData({ ...formData, price: +e.target.value });
  };

  const onCancelClick = () => {
    if (props.canceled) {
      props.canceled();
    }
  };

  const submitEnabled = formData.title && formData.category && formData.price;
  return (
    <form onSubmit={onSubmit}>
      <label>Title</label>
      <input type="text" onChange={onTitleChanged} />
      <label>Price</label>
      <input type="number" step="0.01" min="0" onChange={onPriceChanged} />
      <label>Category</label>
      <input type="text" onChange={onCategoryChanged} />
      <input type="submit" value="Create" disabled={!submitEnabled} />
      <input type="button" onClick={onCancelClick} value="Cancel"/>
    </form>
  );
};

export default EdiMenuItemPanel;
