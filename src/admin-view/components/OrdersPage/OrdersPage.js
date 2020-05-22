import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import env from '../../Environment';
import OrdersPageLayout from './OrdersPageLayout';

const OrdersPageQuery = graphql`
  query OrdersPageQuery {
    orders {
      ...Order_order
    }
  }
`;

const OrdersPage = () => {
  return (
    <QueryRenderer
      environment={env}
      query={OrdersPageQuery}
      render={({ error, props }) => {
        return <OrdersPageLayout orders={props && props.orders} error={error} />;
      }}
    />
  );
};

export default OrdersPage;
