import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  itemIds: string[];
  toggleItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      itemIds: [],
      toggleItem: (productId) => {
        const { itemIds } = get();
        const existingIndex = itemIds.indexOf(productId);

        if (existingIndex > -1) {
          // Remove item
          set({ itemIds: itemIds.filter(id => id !== productId) });
        } else {
          // Add item
          set({ itemIds: [...itemIds, productId] });
        }
      },
      isInWishlist: (productId) => {
        return get().itemIds.includes(productId);
      },
    }),
    {
      name: 'wishlist-storage', // name of the item in the storage (must be unique)
    }
  )
);
