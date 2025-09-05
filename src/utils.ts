export function getBreedName(url: string): string {
  // Extract the breed part from URL
  const match = url.match(/breeds\/([^\/]+)\//);
  if (!match) return "";

  const breedPart = match[1]; // e.g., 'sheepdog-english'
  const words = breedPart.split("-"); // ['sheepdog', 'english']

  // Reverse order if 2 words
  let formattedWords: string[];
  if (words.length === 2) {
    formattedWords = [words[1], words[0]]; // flip order
  } else {
    formattedWords = words;
  }

  // Capitalize each word
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
    return null; // Return null on error
  }
}
