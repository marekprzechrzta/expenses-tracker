export const toCategoryColor = (input: string) => {
  // Simple hash function to convert a string to a numeric hash
  function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  // Convert the hash to a light CSS hex color
  function hashToLightColor(hash: number): string {
    const minBrightness = 90; // Minimum brightness for RGB components (0-255)
    const range = 255 - minBrightness;

    const r = (hash >> 16) & 0xff;
    const g = (hash >> 8) & 0xff;
    const b = hash & 0xff;

    // Scale the RGB components to the light range
    const lightR = Math.floor((r % range) + minBrightness);
    const lightG = Math.floor((g % range) + minBrightness);
    const lightB = Math.floor((b % range) + minBrightness);

    return `#${lightR.toString(16).padStart(2, "0")}${lightG
      .toString(16)
      .padStart(2, "0")}${lightB.toString(16).padStart(2, "0")}`;
  }

  const hash = hashString(input);
  return hashToLightColor(hash);
};
