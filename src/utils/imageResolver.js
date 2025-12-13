/**
 * Image Resolution Utility
 * Resolves image paths from public folder by trying multiple extensions
 */

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

/**
 * Attempts to resolve an image path by trying different extensions
 * @param {string} baseName - Base name of the image (e.g., 'grid1')
 * @returns {Promise<string|null>} - Resolved image path or null if not found
 */
export const resolveImagePath = async (baseName) => {
  for (const ext of IMAGE_EXTENSIONS) {
    const path = `/${baseName}${ext}`;
    try {
      const response = await fetch(path, { method: 'HEAD' });
      if (response.ok) {
        return path;
      }
    } catch (error) {
      // Continue to next extension
      continue;
    }
  }
  return null;
};

/**
 * Resolves multiple images from a list of base names
 * @param {string[]} baseNames - Array of base names (e.g., ['grid1', 'grid2', ...])
 * @param {number} maxImages - Maximum number of images to resolve
 * @returns {Promise<string[]>} - Array of resolved image paths
 */
export const resolveMultipleImages = async (baseNames, maxImages = 4) => {
  const resolvedImages = [];

  for (const baseName of baseNames) {
    if (resolvedImages.length >= maxImages) {
      break;
    }

    const imagePath = await resolveImagePath(baseName);
    if (imagePath) {
      resolvedImages.push(imagePath);
    }
  }

  return resolvedImages;
};

/**
 * Preloads images to ensure they exist before rendering
 * @param {string} path - Image path to preload
 * @returns {Promise<boolean>} - True if image loaded successfully
 */
export const preloadImage = (path) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = path;
  });
};

/**
 * Resolves grid images from public folder
 * Tries grid1 through grid8 with various extensions
 * @param {number} maxImages - Maximum number of images to find (default: 4)
 * @returns {Promise<string[]>} - Array of resolved image paths
 */
export const resolveGridImages = async (maxImages = 4) => {
  const baseNames = ['grid1', 'grid2', 'grid3', 'grid4', 'grid5', 'grid6', 'grid7', 'grid8'];
  return resolveMultipleImages(baseNames, maxImages);
};
