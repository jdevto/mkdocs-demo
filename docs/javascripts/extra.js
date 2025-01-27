"use strict";

/* The following script adds the ability to color table cells
 * To change a cell's background color, wrap the text in a 
 * HTML <div> tag with a class name corresponding to one of 
 * the keys in the "CLASSNAME_TO_COLOR" object.
 * Example: <div class="table-cell-bg-red">Text</div>
 */

const CLASSNAME_TO_COLOR = {
    'table-cell-bg-red': 'bg-red',
    'table-cell-bg-yellow': 'bg-yellow',
    'table-cell-bg-green': 'bg-green',
    'table-cell-bg-blue': 'bg-blue'
};

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    for (const key in CLASSNAME_TO_COLOR) {
        if (CLASSNAME_TO_COLOR.hasOwnProperty(key)) {
            const className = CLASSNAME_TO_COLOR[key];
            let elementsToChange = document.getElementsByClassName(key);
            for (const e of elementsToChange) {
                let parent = e.parentElement;
                if (parent.tagName === 'TD') {
                    parent.classList.add(className);
                }
            }
        }
    }
});
