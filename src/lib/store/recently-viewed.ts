import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentlyViewedState {
  itemIds: string[];
  addItem: (productId: string) => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      itemIds: [],
      addItem: (productId) => {
        const { itemIds } = get();
        // Add to the beginning and remove duplicates
        const newItems = [productId, ...itemIds.filter(id => id !== productId)];
        // Keep only the last 10 items
        const limitedItems = newItems.slice(0, 10);
        set({ itemIds: limitedItems });
      },
    }),
    {
      name: 'recently-viewed-storage',
    }
  )
);
