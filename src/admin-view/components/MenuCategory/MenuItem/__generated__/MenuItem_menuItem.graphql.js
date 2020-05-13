/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type MenuItem_menuItem$ref: FragmentReference;
declare export opaque type MenuItem_menuItem$fragmentType: MenuItem_menuItem$ref;
export type MenuItem_menuItem = {|
  +id: string,
  +title: string,
  +price: number,
  +$refType: MenuItem_menuItem$ref,
|};
export type MenuItem_menuItem$data = MenuItem_menuItem;
export type MenuItem_menuItem$key = {
  +$data?: MenuItem_menuItem$data,
  +$fragmentRefs: MenuItem_menuItem$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MenuItem_menuItem",
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
  "type": "MenuItem"
};
// prettier-ignore
(node/*: any*/).hash = 'a21b897cce53a4bca47fff9d5a1e3a94';

module.exports = node;
