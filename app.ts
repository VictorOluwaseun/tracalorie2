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

    updateItemStorage(updatedItem: Item): void {
      //1. loop through 2. find the item, 3. update the item, then save
      const items = getStoredItems()
      const updatedItems = items.map(item => {
        return item.id === updatedItem.id ? updatedItem : item
      });
      localStorage.setItem(ITEMS, JSON.stringify(updatedItems))
    },

    deleteItemFromStorage(id: number) : void {
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

// ---------------------------------------
// UI Controller [presentation]
// ---------------------------------------


// ---------------------------------------
// App Controller [Controller and Services]
// ---------------------------------------
