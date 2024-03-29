/* eslint-disable require-jsdoc */
"use strict";

// eslint-disable-next-line no-redeclare
class Node {
    constructor(value, value2) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.compartor=value2;
    
    }
    max() {
        if (this.right !== null) {
            return this.right.max();
        }
        else {
            return this.value;
        }
    }
    add(element) {
        if (element > this.value) {
            if (this.right === null) {
                this.right = new Node(element);
            }
            else {
                this.right.add(element);
            }
        }
        else {
            if (this.left === null) {
                this.left = new Node(element);
            }
            else {
                this.left.add(element);
            }
        }
    }
    contains(element) {
        if (element === this.value) {
            return true;
        }
        if (element > this.value) {
            if (this.right === null) {
                return false;
            }
            else {
                return this.right.contains(element);
            }
        }
        else {
            if (this.left === null) {
                return false;
            }
            else {
                return this.left.contains(element);
            }
        }
    }
    remove(parent, element) {
        if (element < this.value) {
            if (this.left === null) {
                return false;
            }
            else {
                return this.left.remove(this, element);
            }
        }
        else if (element > this.value) {
            if (this.right === null) {
                return false;
            }
            else {
                return this.right.remove(this, element);
            }
        }
        else { //if (element === this.value) {
            // simply remove this node if it doesn't have children 
            if (this.left === null && this.right === null) {
                if (parent.left === this) {
                    parent.left = null;
                }
                else if (parent.right === this) {
                    parent.right = null;
                }
            }
            // if there is one child, put it in our place
            else if (this.left !== null && this.right === null) {
                    this.value = this.left.value;
                    this.right = this.left.right;
                    this.left = this.left.left;
                    return true;
            } else if (this.right !== null && this.left === null) {
                    this.value = this.right.value;
                    this.left = this.right.left;
                    this.right = this.right.right;
                    return true;
            } else if (this.left !== null && this.right !== null) {
                // if there are two children copy the largest of the small and prune that
                let largest = this.left.max();
                this.value = largest;
                this.left.remove(this, largest);
            }
            return true;
        } // end of "if this is the value to remove"
    } // end of remove method
} // end of Node class

class RootNode extends Node {
    constructor() {
        super(null);
    }
    add(element) {
        if (this.value === null) {
            this.value = element;
            return;
        }
        return super.add(element);
    }
    remove(element) {
        if (this.value === element && this.left === null && this.right === null) {
            this.value = null;
            return true;
        }
        else {
            return super.remove(this, element);
        }
    }
}

// eslint-disable-next-line no-unused-vars
class BinarySearchTree {
    constructor() {
        this.root = new RootNode();
    }
    add(element) {
        this.root.add(element);
    }
    contains(element) {
        return this.root.contains(element);
    }
    remove(element) {
        return this.root.remove(element);
    }
    
    min() {
        let current = this.root;
        while (current.left !== null){
            current = current.left;
        }
        return current.value;

    }
    insertAll(array){
        for(let i=0; i<array.length; i++){
            this.add(array[i]);
        }
    }
    
    readIntoArray(){
        let myArray = [];
        if (this.left !== null) {
            this.left.readIntoArray();
         }
            myArray.push(this.value); 
            if (this.right !== null) {
            this.right.readIntoArray(); 
        }
    }
    


    
}





