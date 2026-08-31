// Utilities for persisting and syncing Rahat & Jemi's couple photograph across the application

const PHOTO_STORAGE_KEY = 'foreveryours_rahat_jemi_photo';

export const getSavedCouplePhoto = (): string | null => {
  try {
    return localStorage.getItem(PHOTO_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const saveCouplePhoto = (dataUrl: string): void => {
  try {
    localStorage.setItem(PHOTO_STORAGE_KEY, dataUrl);
    // Dispatch a custom event so all active components reactively update
    window.dispatchEvent(new Event('couple_photo_updated'));
  } catch (err) {
    console.warn('Could not save photo to local storage:', err);
  }
};

export const removeCouplePhoto = (): void => {
  try {
    localStorage.removeItem(PHOTO_STORAGE_KEY);
    window.dispatchEvent(new Event('couple_photo_updated'));
  } catch (err) {
    console.warn('Could not remove photo from local storage:', err);
  }
};
