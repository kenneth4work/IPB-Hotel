// Utility for reliable persistence of uploaded room images using IndexedDB and LocalStorage fallback

const DB_NAME = 'IPBHotelDB';
const DB_VERSION = 1;
const STORE_NAME = 'room_photos';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'roomId' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Compresses an image file into an optimized base64 Data URL (max 1920px, 0.88 JPEG quality)
 * to ensure fast rendering, low memory footprint, and reliable persistence.
 */
export function optimizeImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // If SVG or gif, return as is via FileReader
    if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const img = new Image();
    const tempUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(tempUrl);
      const MAX_WIDTH = 1920;
      const MAX_HEIGHT = 1080;
      let { width, height } = img;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        if (width / height > MAX_WIDTH / MAX_HEIGHT) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        } else {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        // Fallback to FileReader if canvas context fails
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
        return;
      }

      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      const mimeType = file.type === 'image/png' ? 'image/jpeg' : file.type;
      const dataUrl = canvas.toDataURL(mimeType, 0.88);
      resolve(dataUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(tempUrl);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    };

    img.src = tempUrl;
  });
}

export async function saveRoomImages(roomId: string, images: string[]): Promise<void> {
  // 1. Save to localStorage
  try {
    localStorage.setItem(`ipb_hotel_room_images_${roomId}`, JSON.stringify(images));
  } catch (e) {
    console.warn('LocalStorage quota reached, relying on IndexedDB:', e);
  }

  // 2. Save to IndexedDB
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put({ roomId, images, updatedAt: Date.now() });
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('Could not save to IndexedDB:', e);
  }
}

/**
 * Prunes slides according to room requirements:
 * - suite: remove slides 2-6 (keep slide 1 and 7+)
 * - executive & deluxe: remove slides 2-5 (keep slide 1 and 6+)
 * - standard: remove slides 2-3 (keep slide 1 and 4+)
 */
export function pruneRoomSlides(roomId: string, images: string[]): string[] {
  if (roomId === 'grand-executive') {
    return ['GrandExecutive/GE1.jpg'];
  } else if (roomId === 'suite') {
    if (images.length >= 7) {
      return [images[0], ...images.slice(6)];
    }
  } else if (roomId === 'executive' || roomId === 'deluxe') {
    if (images.length >= 5) {
      return [images[0], ...images.slice(5)];
    } else if (images.length > 1) {
      return [images[0]];
    }
  } else if (roomId === 'standard') {
    if (images.length >= 3) {
      return [images[0], ...images.slice(3)];
    } else if (images.length > 1) {
      return [images[0]];
    }
  }
  return images;
}

export const pruneSuiteSlides = (images: string[]) => pruneRoomSlides('suite', images);

export async function getPersistedRoomImages(roomId: string): Promise<string[] | null> {
  // Try localStorage first for instant synchronous check
  try {
    const local = localStorage.getItem(`ipb_hotel_room_images_${roomId}`);
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const pruned = pruneRoomSlides(roomId, parsed);
        if (pruned.length !== parsed.length) {
          saveRoomImages(roomId, pruned);
        }
        return pruned;
      }
    }
  } catch {
    // ignore
  }

  // Try IndexedDB
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(roomId);
      req.onsuccess = () => {
        if (req.result && Array.isArray(req.result.images) && req.result.images.length > 0) {
          const images = pruneRoomSlides(roomId, req.result.images);
          if (images.length !== req.result.images.length) {
            saveRoomImages(roomId, images);
          } else {
            try {
              localStorage.setItem(`ipb_hotel_room_images_${roomId}`, JSON.stringify(images));
            } catch {
              // ignore
            }
          }
          resolve(images);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export function resetRoomImages(roomId: string): void {
  try {
    localStorage.removeItem(`ipb_hotel_room_images_${roomId}`);
  } catch {
    // ignore
  }

  openDB()
    .then((db) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(roomId);
    })
    .catch(() => {});
}
