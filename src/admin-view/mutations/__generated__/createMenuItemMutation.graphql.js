/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateMenuItemInput = {|
  title: string,
  price: number,
  menuCategory: string,
|};
export type createMenuItemMutationVariables = {|
  input: CreateMenuItemInput
|};
export type createMenuItemMutationResponse = {|
  +createMenuItem: ?{|
    +id: string
  |}
|};
export type createMenuItemMutation = {|
  variables: createMenuItemMutationVariables,
  response: createMenuItemMutationResponse,
|};
*/


/*
mutation createMenuItemMutation(
  $input: CreateMenuItemInput!
) {
  createMenuItem(input: $input) {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateMenuItemInput!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "MenuItem",
    "kind": "LinkedField",
    "name": "createMenuItem",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "createMenuItemMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "createMenuItemMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "createMenuItemMutation",
    "operationKind": "mutation",
    "text": "mutation createMenuItemMutation(\n  $input: CreateMenuItemInput!\n) {\n  createMenuItem(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f7355474bb71ee81192ef12c12c87620';

module.exports = node;
