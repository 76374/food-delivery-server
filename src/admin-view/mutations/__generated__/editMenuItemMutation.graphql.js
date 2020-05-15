/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EditMenuItemInput = {|
  id: string,
  price?: ?number,
  title?: ?string,
  menuCategory?: ?string,
|};
export type editMenuItemMutationVariables = {|
  input: EditMenuItemInput
|};
export type editMenuItemMutationResponse = {|
  +editMenuItem: ?{|
    +id: string
  |}
|};
export type editMenuItemMutation = {|
  variables: editMenuItemMutationVariables,
  response: editMenuItemMutationResponse,
|};
*/


/*
mutation editMenuItemMutation(
  $input: EditMenuItemInput!
) {
  editMenuItem(input: $input) {
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
    "type": "EditMenuItemInput!"
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
    "name": "editMenuItem",
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
    "name": "editMenuItemMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "editMenuItemMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "editMenuItemMutation",
    "operationKind": "mutation",
    "text": "mutation editMenuItemMutation(\n  $input: EditMenuItemInput!\n) {\n  editMenuItem(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '18fb771d644f733dd2998464caeb860e';

module.exports = node;
