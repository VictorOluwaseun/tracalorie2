// Software Engineer
// -> Architecture, design pattern

// ---------------------------------------
// Types
// ---------------------------------------
interface Item {
  id: number;
  name: string;
  calories: number;
}

// ---------------------------------------
// Constants
// ---------------------------------------
const ITEMS = "items"

// ---------------------------------------
// Storage Controller [data]
// ---------------------------------------
const StorageCtrl = (() => {

  function getStoredItems(): Item[] {
    const stored = localStorage.getItem(ITEMS)
    return stored ? JSON.parse(stored) : [];
  }

  return {
    storeItem(item: Item): void {
      const items = getStoredItems()
      items.push(item)
      localStorage.setItem(ITEMS, JSON.stringify(items))
    },

    getItemsFromStorage(): Item[] {
      return getStoredItems();
    },

    updateItemStorage(updatedItem: Item): void { // const = item = items[items.length - 1]; item.id = id + 1
      //[{id: 1, name: rice, calories: 100}, {id: 2, name: beans, calories: 110}]
      // for (let i = 0; i < items.length; i++) {
      // items[0] = {id: 1, name: rice, calories: 100}
      // items[1] = {id: 2, name: beans, calories: 110}
      // const item = items[i];
      // if (item.id === updatedItem.id) {
      //   items[i] = updatedItem;
      //   }
      // }
      //1. loop through 2. find the item, 3. update the item, then save
      const items = getStoredItems()
      const updatedItems = items.map(item => {
        return item.id === updatedItem.id ? updatedItem : item
      });
      localStorage.setItem(ITEMS, JSON.stringify(updatedItems))
    },

    deleteItemFromStorage(id: number): void {
      const items = getStoredItems()
      const updatedItems = items.filter(item => item.id !== id);
      localStorage.setItem(ITEMS, JSON.stringify(updatedItems));
    },

    clearItemsFromStorage(): void {
      localStorage.removeItem(ITEMS);
    }
  }

})() //IIFE

// ---------------------------------------
// Item Controller [domain]
// ---------------------------------------
const ItemCtrl = (() => {
  class ItemModel implements Item {
    constructor(public id: number,
                public name: string,
                public calories: number
    ) {
    }
  }

  // State. A private variable
  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: undefined as Item | undefined,
    totalCalories: 0,
  }

  return {
    getItems(): Item[] {
      return data.items
    },

    addItem(name: string, calories: string): Item {
      const calorieValue = parseInt(calories); // Convert to number or int
      // data.items.length => Total number of elements in the items array

      // 0-> false (a falsy value). anything > 0 -> true     lastItem = data.items[data.items.length - 1]
      // const id = data.items.length ? data.items[data.items.length - 1].id + 1 : 0;
      const lastItem = data.items[data.items.length - 1];
      const id = data.items.length ? lastItem.id + 1 : 0;
      const newItem = new ItemModel(id, name, calorieValue);
      data.items.push(newItem);
      return newItem;
    },

    getItemById(id: number): Item | undefined {
      return data.items.find(item => item.id === id);
    },

    updateItem(name: string, calories: string): Item | undefined {
      const current = data.currentItem;
      if (!current) return;

      const calorieValue = parseInt(calories);

      const updated = data.items.find(item => item.id === current.id);
      if (!updated) return;

      updated.name = name;
      updated.calories = calorieValue;

      return updated;
    },

    deleteItem(id: number): void {
      data.items = data.items.filter(item => item.id !== id);
    },

    clearAllItems(): void {
      data.items = [];
    },

    setCurrentItem(item: Item): void {
      data.currentItem = item;
    },

    getCurrentItem(): Item {
      return data.currentItem;
    },

    getTotalCalories(): number {
      data.totalCalories = data.items.reduce(
        (sum, item) => sum + item.calories, 0
      )
      return data.totalCalories;
    },

    logData() { //infer
      return data;
    }
  }
})();

// ---------------------------------------
// UI Controller [presentation]
// ---------------------------------------
const UICtrl = (() => {

  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
  };

  return {
    populateItemsList(items: Item[]): void {
      const html = items
        .map((item: Item) => `
            <li class="collection-item" id=${item.id}>
                <strong>${item.name}: </strong>
                <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            </li>
        `).join("");

      document.querySelector(UISelectors.itemList).innerHTML = html;
    }
  }

})()

// ---------------------------------------
// App Controller [Controller and Services]
// ---------------------------------------
