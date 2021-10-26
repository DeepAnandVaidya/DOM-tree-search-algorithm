<h1>ASSIGNMENT 5:</h1>

<h2>Please find below the pointers that I have worked on as part of this assignment;</h2>


1. Learnt about styling elements using **Javascript** to traverse a **HTML DOM tree**.

2. Code walk-through is as follows;
	* <b>Create Node objects:</b>
	  * Based on the DOM tree, created objets of the provided `Node()` class for every **DOM** element in the tree.
	  * Passed `tag`, `chidren`, `classes` and `id` selectors to the class construcor.

	* <b>Identify the type of input selector:</b>
	  * My next step was to identify the type of input selecor.
	  * I divided the input selectors into 3 categories namely, **TagSelectors, ClassSelectors and IdSelectors**.
      
    * <b>Fetched all the descendent nodes of the input parent element:</b>;
	    * Next step was to fetch all the descendent node elements of the input parent DOM. To do this, I used `querySelector()` and `querySelectorAll()`.
	
    * <b>Logic implemented in case the selector is a classSelector:</b>;
	    * In case the selector in a `classSelector`, I **ITERATED** over all the descendent nodes and pushed the ones in an Array whose class names matched with the input `ClassSelector`.
	    * Once the node got matched, I pushed the `node id` to an array and finally returned the same.
	    
    * <b>Logic implemented in case the selector is a tagSelector:</b>;
	    * In case the selector in a `classSelector`, I **ITERATED** over all the descendent nodes and pushed the ones in an Array whose tag names matched with the input `TagSelector`.
	    * Once the node got matched, I pushed the `node id` to an array and finally returned the same.

    * <b>Logic implemented in case there are multiple tag selectors:</b>;
	    * In case of multiple tag selectors in the input, after **ITERATING** over all the descendent nodes, I used `<<element>>.parentNode.nodeName` to get the parent node.
	    * Once the node got matched, I pushed the `node id` to an array and finally returned the same.

3. How to run the code?
  * Call the `search()` method in the `node.js` file.
  * Save the changes.
  * View the output on the console of the `Developer Tools` on the browser of your choice.