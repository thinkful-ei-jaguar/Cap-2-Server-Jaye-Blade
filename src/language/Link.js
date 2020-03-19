class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  find(item) { 
    // Start at the head
    let currNode = this.head;
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // Check for the item 
    while (currNode.value !== item) {
      /* Return null if it's the end of the list 
           and the item is not on the list */
      if (currNode.next === null) {
        return null;
      }
      else {
        // Otherwise, keep looking 
        currNode = currNode.next;
      }
    }
    // Found it
    return currNode;
  }

  remove(item){ 
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // If the node to be removed is head, make the next node head
    if (this.head.value === item) {
      this.head = this.head.next;
      //console.log(`Line 61, The head is now: ${this.head.value}.  The next is ${this.head.next.value}`)
      return;
    }
    // Start at the head
    let currNode = this.head;
    // Keep track of previous
    let previousNode = this.head;

    while ((currNode !== null) && (currNode.value !== item)) {
      // Save the previous node 
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      //console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
    //console.log(`Line 79, The head is now: ${this.head.value}`)
  }

  insertBefore(newItem, oldItem) {
    // If the list is empty
    if (!oldItem) {
      return this.insertFirst(newItem);
    }
    let tempNode = this.head;
    let oldNode = this.find(oldItem);
    let newNode = new _Node(newItem, oldNode);
    while(tempNode.next !== null){
      if(tempNode.next.value === oldNode.value) {
        break;
      }
      tempNode = tempNode.next;
    }
    tempNode.next = newNode;
  }

  insertAfter(newItem, oldItem) {
    let oldNode = this.find(oldItem);
    let newNode = new _Node(newItem, oldNode.next);
    oldNode.next = newNode;
  }

  insertAt(newItem, position) {
    //console.log(`The new item to be inserted is ${newItem}, the position will be ${position}`)
    let currNode = this.head;
    let previousNode = this.head;
    let counter2 = 0;
    while((currNode !== null) && position-1 !== counter2){
      previousNode = currNode;
      currNode = currNode.next;
      counter2++;
    }
    if(currNode){
      previousNode.next=new _Node(newItem, currNode);
    }else if(position>counter2||counter2<=0){
      //console.log("position too big for current array size of "+ counter2 + " adding it to the last index");
      this.insertLast(newItem);
    }
    
  }

  print(){
    let temp = this.head;
    while(temp.next != null){
      //console.log(temp.value);
      temp = temp.next;
    }
  }

}

module.exports = LinkedList;
