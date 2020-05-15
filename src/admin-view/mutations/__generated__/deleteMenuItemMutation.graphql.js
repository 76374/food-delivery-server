/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteMenuItemInput = {|
  id: string
|};
export type deleteMenuItemMutationVariables = {|
  input: DeleteMenuItemInput
|};
export type deleteMenuItemMutationResponse = {|
  +deleteMenuItem: ?boolean
|};
export type deleteMenuItemMutation = {|
  variables: deleteMenuItemMutationVariables,
  response: deleteMenuItemMutationResponse,
|};
*/


/*
mutation deleteMenuItemMutation(
  $input: DeleteMenuItemInput!
) {
  deleteMenuItem(input: $input)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "DeleteMenuItemInput!"
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
    "kind": "ScalarField",
    "name": "deleteMenuItem",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "deleteMenuItemMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "deleteMenuItemMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "deleteMenuItemMutation",
    "operationKind": "mutation",
    "text": "mutation deleteMenuItemMutation(\n  $input: DeleteMenuItemInput!\n) {\n  deleteMenuItem(input: $input)\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '579e22c11930628048b29b46074cb886';

module.exports = node;
