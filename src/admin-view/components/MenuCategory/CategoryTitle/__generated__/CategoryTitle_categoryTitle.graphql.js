/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CategoryTitle_categoryTitle$ref: FragmentReference;
declare export opaque type CategoryTitle_categoryTitle$fragmentType: CategoryTitle_categoryTitle$ref;
export type CategoryTitle_categoryTitle = {|
  +title: string,
  +$refType: CategoryTitle_categoryTitle$ref,
|};
export type CategoryTitle_categoryTitle$data = CategoryTitle_categoryTitle;
export type CategoryTitle_categoryTitle$key = {
  +$data?: CategoryTitle_categoryTitle$data,
  +$fragmentRefs: CategoryTitle_categoryTitle$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategoryTitle_categoryTitle",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "MenuCategory"
};
// prettier-ignore
(node/*: any*/).hash = '2f17efee3e37b6d03210794e0ac5848b';

module.exports = node;
