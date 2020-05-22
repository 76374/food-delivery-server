import React from 'react';
import { createFragmentContainer } from 'react-relay';
import currencyFormat from '../../../../util/format';

const OrderedItem = (props) => {
  const { menuItem, count } = props.orderItem;
  const { title, price } = menuItem;
  return (
    <div>{title} x{count} {currencyFormat(count * price)}</div>
  );
};

export default createFragmentContainer(OrderedItem, {
  orderItem: graphql`
    fragment OrderedItem_orderItem on OrderItem {
      count
      menuItem {
        id
        title
        price
      }
    }
  `,
});
