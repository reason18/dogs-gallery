export function getBreedName(url: string): string {
  const match = url.match(/breeds\/([^]+)\//);
  if (!match) return "";

  const breedPart = match[1];
  const words = breedPart.split("-");

  let formattedWords: string[];
  if (words.length === 2) {
    formattedWords = [words[1], words[0]];
  } else {
    formattedWords = words;
  }

  const capitalized = formattedWords.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  return capitalized.join(" ");
}

export async function fetchData<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
