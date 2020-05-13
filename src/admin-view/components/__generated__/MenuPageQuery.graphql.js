/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type MenuCategory_menuCategory$ref = any;
export type MenuPageQueryVariables = {||};
export type MenuPageQueryResponse = {|
  +menu: $ReadOnlyArray<?{|
    +$fragmentRefs: MenuCategory_menuCategory$ref
  |}>
|};
export type MenuPageQuery = {|
  variables: MenuPageQueryVariables,
  response: MenuPageQueryResponse,
|};
*/


/*
query MenuPageQuery {
  menu {
    ...MenuCategory_menuCategory
  }
}

fragment MenuCategory_menuCategory on MenuCategory {
  title
  items {
    ...MenuItem_menuItem
  }
}

fragment MenuItem_menuItem on MenuItem {
  id
  title
  price
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MenuPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MenuCategory",
        "kind": "LinkedField",
        "name": "menu",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MenuCategory_menuCategory"
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
    "name": "MenuPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MenuCategory",
        "kind": "LinkedField",
        "name": "menu",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "MenuItem",
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              (v0/*: any*/),
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "MenuPageQuery",
    "operationKind": "query",
    "text": "query MenuPageQuery {\n  menu {\n    ...MenuCategory_menuCategory\n  }\n}\n\nfragment MenuCategory_menuCategory on MenuCategory {\n  title\n  items {\n    ...MenuItem_menuItem\n  }\n}\n\nfragment MenuItem_menuItem on MenuItem {\n  id\n  title\n  price\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd9125740b8039ddf3369ad3b35b9114a';

module.exports = node;
