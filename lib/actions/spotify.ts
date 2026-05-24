"use server"

export async function searchSpotify(query: string) {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error("Spotify credentials are not configured")
  }

  // Get token
  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    cache: "no-store",
  })

  if (!tokenResponse.ok) {
    throw new Error("Failed to get Spotify token")
  }

  const tokenData = await tokenResponse.json()
  const accessToken = tokenData.access_token

  // Search
  const searchResponse = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  if (!searchResponse.ok) {
    throw new Error("Failed to search Spotify")
  }

  const searchData = await searchResponse.json()
  return searchData.tracks.items.map((track: any) => ({
    title: track.name,
    artist: track.artists.map((a: any) => a.name).join(", "),
    coverUrl: track.album.images[0]?.url,
    previewUrl: track.preview_url,
  }))
}
