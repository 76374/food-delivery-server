/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Order_order$ref = any;
export type OrdersPageQueryVariables = {||};
export type OrdersPageQueryResponse = {|
  +orders: $ReadOnlyArray<?{|
    +$fragmentRefs: Order_order$ref
  |}>
|};
export type OrdersPageQuery = {|
  variables: OrdersPageQueryVariables,
  response: OrdersPageQueryResponse,
|};
*/


/*
query OrdersPageQuery {
  orders {
    ...Order_order
  }
}

fragment Order_order on Order {
  id
  date
  price
  items {
    ...OrderedItem_orderItem
  }
}

fragment OrderedItem_orderItem on OrderItem {
  count
  menuItem {
    id
    title
    price
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "OrdersPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Order",
        "kind": "LinkedField",
        "name": "orders",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Order_order"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "OrdersPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Order",
        "kind": "LinkedField",
        "name": "orders",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "date",
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "OrderItem",
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "count",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "MenuItem",
                "kind": "LinkedField",
                "name": "menuItem",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "OrdersPageQuery",
    "operationKind": "query",
    "text": "query OrdersPageQuery {\n  orders {\n    ...Order_order\n  }\n}\n\nfragment Order_order on Order {\n  id\n  date\n  price\n  items {\n    ...OrderedItem_orderItem\n  }\n}\n\nfragment OrderedItem_orderItem on OrderItem {\n  count\n  menuItem {\n    id\n    title\n    price\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '42ed43d16dbfeb590b275660ce4fde6c';

module.exports = node;
