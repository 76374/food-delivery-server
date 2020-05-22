import React from 'react';
import Order from './Order/Order';

const OrdersPageLayout = (props) => {
  if (props.error) {
    return <div>{JSON.stringify(props.error)}</div>;
  }
  if (!props.orders) {
    return <div>loading</div>;
  }
  return props.orders.map((order, index) => <Order order={order} key={'Order' + index}/>);
};

export default OrdersPageLayout;
