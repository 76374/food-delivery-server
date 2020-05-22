/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type OrderedItem_orderItem$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type Order_order$ref: FragmentReference;
declare export opaque type Order_order$fragmentType: Order_order$ref;
export type Order_order = {|
  +id: string,
  +date: string,
  +price: number,
  +items: $ReadOnlyArray<{|
    +$fragmentRefs: OrderedItem_orderItem$ref
  |}>,
  +$refType: Order_order$ref,
|};
export type Order_order$data = Order_order;
export type Order_order$key = {
  +$data?: Order_order$data,
  +$fragmentRefs: Order_order$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "price",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "OrderItem",
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "OrderedItem_orderItem"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order"
};
// prettier-ignore
(node/*: any*/).hash = '6286f8057504e8bd29d912c0b041d93a';

module.exports = node;
