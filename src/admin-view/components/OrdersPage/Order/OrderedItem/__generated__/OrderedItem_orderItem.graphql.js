/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type OrderedItem_orderItem$ref: FragmentReference;
declare export opaque type OrderedItem_orderItem$fragmentType: OrderedItem_orderItem$ref;
export type OrderedItem_orderItem = {|
  +count: number,
  +menuItem: {|
    +id: string,
    +title: string,
    +price: number,
  |},
  +$refType: OrderedItem_orderItem$ref,
|};
export type OrderedItem_orderItem$data = OrderedItem_orderItem;
export type OrderedItem_orderItem$key = {
  +$data?: OrderedItem_orderItem$data,
  +$fragmentRefs: OrderedItem_orderItem$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OrderedItem_orderItem",
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
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "price",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrderItem"
};
// prettier-ignore
(node/*: any*/).hash = '90578b8e592475469f581ecc891fe8bd';

module.exports = node;
