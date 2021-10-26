/**
* A Node represents an HTML Element. A node can have a tag name,
* a list of CSS classes and a list of children nodes.
*/
class Node {

  constructor(tag, children, classes, id) {
    // Tag name of the node.
    this.tag = tag;
    // Array of CSS class names (string) on this element.
    this.classes = classes;
    // Array of child nodes.
    this.children = children; // All children are of type Node
    this.id = id;
  }

  /**
  * Returns descendent nodes matching the selector. Selector can be 
  * a tag name or a CSS class name.
  * 
  * For example: 
  * 
  * 1.
  * <div> 
  *   <span id="span-1"></span>
  *   <span id="span-2"></span>
  *   <div>
  *     <span id="span-3"></span>
  *   </div>
  * </div>
  * Selector `span` should return 3 span nodes in this order
  * span-1 -> span-2 -> span-3.
  *
  * 2.
  * <div> 
  *   <span id="span-1" class="note"></span>
  *   <span id="span-2"></span>
  *   <div>
  *     <span id="span-3"></span>
  *   </div>
  * </div>
  * Selector `.note` should return one span node with `note` class.
  *
  * 3.
  * <div> 
  *   <span id="span-1"></span>
  *   <span id="span-2"></span>
  *   <article>
  *     <div>
  *       <span id="span-3"></span>
  *     </div>
  *   </article>
  * </div>
  * Selector `div span` should return three span nodes in this order
  * span-1 -> span-2 -> span-3.
  * 
  * @param {string} the selector string.
  * @returns {Array} Array of descendent nodes.
  * @public
  */


  search(selector) {
    // check if the input selector is valid
    if (!checkForEmptyString(selector)) {

      // log an error in case the input selector in invalid
      console.error('Provide a valid selector, looks like the selector you provided is blank.');
    }

    // if the input selector is valid, proceed with the implementation
    else {

      // evaluate the selctor type
      if (selector.includes('#')) {
        isSelectorId = true;
      } else if (selector.includes('.')) {
        isSelectorClass = true;
      } else if (selector.includes(' ')) {
        isMultipleTags = true;
      } else {
        isSelectorTag = true;
      }

      // get the id of the parent node
      let parentNodeId = this.id;

      // list of all the descendent nodes
      let descendentNodes = document.getElementById(parentNodeId).querySelectorAll('*');

      // if the input selector is of type 'id'
      if (isSelectorId) {

        //iterate over descendent nodes
        for (let i = 0; i <= descendentNodes.length - 1; i++) {
          if (descendentNodes[i].id.localeCompare(selector) == 0) {
            finalDescendentNodeList.push(descendentNodes[i].id);
          }
        }
        return finalDescendentNodeList;
      }

      // if the input selector is of type 'class'
      else if (isSelectorClass) {
        let selectorName = selector.substring(selector.indexOf('.') + 1);

        // Iterate over the descendent nodes
        for (let i = 0; i <= descendentNodes.length - 1; i++) {
          let className = descendentNodes[i].className;
          if (className.includes(selectorName)) {
            finalDescendentNodeList.push(descendentNodes[i].id);
          }
        }
        return finalDescendentNodeList;
      }

      // if the input selector is of type 'tag'
      else if (isSelectorTag) {

        // Iterate over descendent nodes
        for (let i = 0; i <= descendentNodes.length - 1; i++) {
          if (descendentNodes[i].tagName.localeCompare(selector.toUpperCase()) == 0) {
            finalDescendentNodeList.push(descendentNodes[i].id);
          }
        }
        return finalDescendentNodeList;
      }

      // if the input selector has multiple tags
      else if (isMultipleTags) {

        // value of selector one before the white space
        let selectorOne = selector.substring(0, selector.indexOf(' '));

        // value of selector two after the white space
        let selectorTwo = selector.substring(selector.indexOf(' ') + 1, selector.length);
        let childNodes = [];

        // Iterate over descendent nodes
        for (let i = 0; i <= descendentNodes.length - 1; i++) {
          if (descendentNodes[i].tagName.localeCompare(selectorTwo.toUpperCase()) == 0) {

            // add to a temp child list
            childNodes.push(descendentNodes[i].id);
          }
        }

        // loop to check if the parent node of the descendents matches with the input selector
        for (let i = 0; i <= childNodes.length - 1; i++) {
          let currentElementId = childNodes[i];

          // fetch the parent nodes of the iterating element
          let currentElementParentNode = document.getElementById(currentElementId).parentNode.nodeName;
          if (currentElementParentNode.localeCompare(selectorOne.toUpperCase()) == 0) {
            finalDescendentNodeList.push(currentElementId);
          }
        }
        return finalDescendentNodeList;
      }
    }
  }
}


// Function to check if the provided string is empty
function checkForEmptyString(stringVal) {
  if (stringVal === null || stringVal === '' || !stringVal) {
    return false;
  } else {
    return true;
  }
}

// Node object creations based on the DOM tree
let spanNode5 = new Node('span', [], ['note', 'mania'], null);
let spanNode4 = new Node('span', [], ['mania'], null);
let labelNode = new Node('label', [], [], 'lbl-1');
let sectionNode = new Node('section', [], [], 'sec-1');
let spanNode3 = new Node('span', [], ['sub1-span3'], 'span-3');
let p1 = new Node('p', [], ['sub1-p1', 'note'], 'para-1');
let divNode4 = new Node('div', [spanNode4, spanNode5], [], 'div-4');
let divNode3 = new Node('div', [sectionNode, labelNode], ['subContainer2'], 'div-3');
let divNode2 = new Node('div', [p1, spanNode3], ['subContainer1'], 'div-2');
let spanNode2 = new Node('span', [], [], 'span-2');
let spanNode1 = new Node('span', [], ['note'], 'span-1');
let randomNode = new Node('span', [], ['randomSpan'], 'span-6');
let divNode1 = new Node('div', [spanNode1, spanNode2, divNode2, divNode3, divNode4], ['mainContainer'], 'div-1');
let body = new Node('body', [divNode1, randomNode], [], 'content');

// final descendent node list creation
let finalDescendentNodeList = [];

// flags
let isSelectorId = false;
let isSelectorClass = false;
let isSelectorTag = false;
let isMultipleTags = false;

// Input fields
console.log("Started...");

// Test case 1 -
// Output - ['span-1', 'span-2', 'span-3', 'span-4', 'span-5']
console.log('INPUT CASE 1: divNode1.search("span")');
console.log(divNode1.search("span"));

// Test case 2 -
// Output - ['span-1', 'para-1', 'span-5']
console.log('INPUT CASE 2: divNode1.search(".note")');
console.log(divNode1.search(".note"));

// Test case 3 -
// Output - ['lbl-1']
console.log('INPUT CASE 3: divNode1.search("label")');
console.log(divNode1.search("label"));

// Test case 4 -
// Output - []
console.log('INPUT CASE 4: p1.search(".note")');
console.log(p1.search(".note"));

// Test case 5 -
// Output - ['div-2', 'div-3', 'div-4']
console.log('INPUT CASE 5: divNode1.search("div")');
console.log(divNode1.search("div"));

// Test case 6 -
// Output - []
console.log('INPUT CASE 6: randomNode.search("div")');
console.log(randomNode.search("div"));

// Test case 7 -
// Output - []
console.log('INPUT CASE 7: divNode2.search("section")');
console.log(divNode2.search("section"));

// Test case 8 -
console.log('INPUT CASE 8: body.search()');
console.log(body.search());

// Test case 9 -
// Output - ['sec-1']
console.log('INPUT CASE 9: body.search("section")');
console.log(body.search("section"));

// Test case 10 -
// Output: ['span-1', 'span-2', 'span-3', 'span-4', 'span-5']
console.log('INPUT CASE 10: body.search("div span")');
console.log(body.search("div span"));