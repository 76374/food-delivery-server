import React from 'react';
import OrderedItem from './OrderedItem/OrderedItem';
import { createFragmentContainer } from 'react-relay';
import currencyFormat from '../../../util/format';

const Order = (props) => {
  const { date, price, items } = props.order;
  return (
    <div>
      <hr />
      <div>{new Date(date).toISOString()}</div>
      {items.map((item, index) => (
        <OrderedItem orderItem={item} key={'OrderItem' + index} />
      ))}
      <div>{currencyFormat(price)}</div>
    </div>
  );
};

export default createFragmentContainer(Order, {
  order: graphql`
    fragment Order_order on Order {
      id
      date
      price
      items {
        ...OrderedItem_orderItem
      }
    }
  `,
});
