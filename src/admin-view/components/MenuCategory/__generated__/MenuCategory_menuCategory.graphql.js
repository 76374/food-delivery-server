/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type MenuItem_menuItem$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type MenuCategory_menuCategory$ref: FragmentReference;
declare export opaque type MenuCategory_menuCategory$fragmentType: MenuCategory_menuCategory$ref;
export type MenuCategory_menuCategory = {|
  +title: string,
  +items: $ReadOnlyArray<?{|
    +$fragmentRefs: MenuItem_menuItem$ref
  |}>,
  +$refType: MenuCategory_menuCategory$ref,
|};
export type MenuCategory_menuCategory$data = MenuCategory_menuCategory;
export type MenuCategory_menuCategory$key = {
  +$data?: MenuCategory_menuCategory$data,
  +$fragmentRefs: MenuCategory_menuCategory$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MenuCategory_menuCategory",
  "selections": [
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
      "concreteType": "MenuItem",
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MenuItem_menuItem"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MenuCategory"
};
// prettier-ignore
(node/*: any*/).hash = '3b5d29a7fcdbebe5c4c68b013baac239';

module.exports = node;
