"use server"

export async function searchSpotify(query: string) {
  const response = await fetch(
    "https://itunes.apple.com/search?term=" + encodeURIComponent(query) + "&media=music&limit=10&country=BR",
    { cache: "no-store" }
  )

  if (!response.ok) {
    throw new Error("Erro ao buscar músicas")
  }

  const data = await response.json()

  return data.results.map((track: any) => ({
    title: track.trackName,
    artist: track.artistName,
    coverUrl: track.artworkUrl100,
    previewUrl: track.previewUrl,
  }))
}
