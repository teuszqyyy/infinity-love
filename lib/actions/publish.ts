"use server"

import { createServerSupabase } from "@/lib/supabase/server"
import { generateSlug } from "@/lib/utils/slug"
import type { PublishResult } from "@/lib/supabase/types"

export async function publishPage(formData: FormData): Promise<PublishResult> {
  console.log("🚀 [SERVER ACTION] publishPage started")
  
  try {
    const supabase = createServerSupabase()
    
    const personName = String(formData.get("personName") || "").trim()
    const songTitle = formData.get("songTitle") ? String(formData.get("songTitle")).trim() : null
    const songArtist = formData.get("songArtist") ? String(formData.get("songArtist")).trim() : null
    const songPreviewUrl = formData.get("songPreviewUrl") ? String(formData.get("songPreviewUrl")) : null
    const songCoverUrl = formData.get("songCoverUrl") ? String(formData.get("songCoverUrl")) : null
    const relationshipStart = formData.get("relationshipStart") ? String(formData.get("relationshipStart")) : null
    const message = formData.get("message") ? String(formData.get("message")) : null

    if (!personName || personName.length < 2) {
      return { success: false, error: "O nome é obrigatório e deve ter no mínimo 2 caracteres." }
    }

    const slug = generateSlug(personName)

    let coverPhotoUrl: string | null = null
    const coverPhoto = formData.get("coverPhoto") as File | null

    if (coverPhoto && coverPhoto.size > 0) {
      try {
        const ext = coverPhoto.name.split(".").pop() || "jpg"
        const coverPath = `${slug}/cover.${ext}`
        const arrayBuffer = await coverPhoto.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const { error: coverError } = await supabase.storage
          .from("pages")
          .upload(coverPath, buffer, {
            cacheControl: "3600",
            upsert: true,
            contentType: coverPhoto.type || "image/jpeg",
          })

        if (coverError) {
          return { success: false, error: `Erro ao enviar foto de capa: ${coverError.message}` }
        }

        const { data: coverUrlData } = supabase.storage
          .from("pages")
          .getPublicUrl(coverPath)

        coverPhotoUrl = coverUrlData.publicUrl
      } catch (err) {
        return { success: false, error: "Falha ao enviar a foto de capa." }
      }
    }

    const galleryPhotoUrls: string[] = []
    const galleryFiles: File[] = []

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("gallery-") && value instanceof File && value.size > 0) {
        galleryFiles.push(value)
      }
    }

    for (let i = 0; i < galleryFiles.length; i++) {
      const file = galleryFiles[i]
      try {
        const ext = file.name.split(".").pop() || "jpg"
        const galleryPath = `${slug}/gallery-${i}.${ext}`
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const { error: galleryError } = await supabase.storage
          .from("pages")
          .upload(galleryPath, buffer, {
            cacheControl: "3600",
            upsert: true,
            contentType: file.type || "image/jpeg",
          })

        if (galleryError) continue

        const { data: galleryUrlData } = supabase.storage
          .from("pages")
          .getPublicUrl(galleryPath)

        galleryPhotoUrls.push(galleryUrlData.publicUrl)
      } catch (err) {
        continue
      }
    }

    const { error: insertError } = await supabase.from("pages").insert({
      slug,
      person_name: personName,
      cover_photo_url: coverPhotoUrl,
      song_title: songTitle,
      song_artist: songArtist,
      song_preview_url: songPreviewUrl,
      song_cover_url: songCoverUrl,
      relationship_start: relationshipStart,
      message: message,
      gallery_photo_urls: galleryPhotoUrls,
      is_published: true,
    })

    if (insertError) {
      return { success: false, error: `Erro no banco de dados: ${insertError.message}` }
    }

    return { success: true, slug }
    
  } catch (err) {
    return { 
      success: false, 
      error: err instanceof Error ? err.message : "Erro desconhecido no servidor."
    }
  }
}
