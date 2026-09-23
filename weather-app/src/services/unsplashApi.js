const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function getBackgroundImage(city) {
  if (!city || !UNSPLASH_ACCESS_KEY) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        `${city} weather`
      )}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          "Accept-Version": "v1",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Unsplash image");
    }

    const data = await response.json();
    return data.results?.[0] || null;
  } catch (error) {
    console.error("Unsplash API Error:", error);
    return null;
  }
}