export interface PageRow {
  id: string
  slug: string
  person_name: string
  cover_photo_url: string | null
  song_title: string | null
  song_artist: string | null
  relationship_start: string | null
  message: string | null
  gallery_photo_urls: string[]
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface PublishPayload {
  personName: string
  coverPhoto: File | null
  song: { title: string; artist: string } | null
  relationshipStart: string
  message: string
  galleryPhotos: File[]
}

export interface PublishResult {
  success: boolean
  slug?: string
  error?: string
}
