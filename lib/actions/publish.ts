"use server"

import { createServerSupabase } from "@/lib/supabase/server"
import { generateSlug } from "@/lib/utils/slug"
import type { PublishResult } from "@/lib/supabase/types"

/**
 * Server Action: Publish a love page to Supabase.
 */
export async function publishPage(formData: FormData): Promise<PublishResult> {
  console.log("🚀 [SERVER ACTION] publishPage started")
  
  try {
    const supabase = createServerSupabase()
    
    // ── 1. Extract metadata ──────────────────────────────────
    console.log("📝 [SERVER ACTION] Extracting text fields from FormData...")
    const personName = String(formData.get("personName") || "").trim()
    const songTitle = formData.get("songTitle") ? String(formData.get("songTitle")).trim() : null
    const songArtist = formData.get("songArtist") ? String(formData.get("songArtist")).trim() : null
    const relationshipStart = formData.get("relationshipStart") ? String(formData.get("relationshipStart")) : null
    const message = formData.get("message") ? String(formData.get("message")) : null

    if (!personName || personName.length < 2) {
      console.error("❌ [SERVER ACTION] Validation failed: personName is empty or too short.")
      return { success: false, error: "O nome é obrigatório e deve ter no mínimo 2 caracteres." }
    }

    // ── 2. Generate slug ─────────────────────────────────────
    const slug = generateSlug(personName)
    console.log(`🔗 [SERVER ACTION] Generated slug: ${slug}`)

    // ── 3. Upload cover photo ────────────────────────────────
    let coverPhotoUrl: string | null = null
    const coverPhoto = formData.get("coverPhoto") as File | null

    if (coverPhoto && coverPhoto.size > 0) {
      console.log(`📸 [SERVER ACTION] Uploading cover photo (${coverPhoto.name}, ${coverPhoto.size} bytes)...`)
      try {
        const ext = coverPhoto.name.split(".").pop() || "jpg"
        const coverPath = `${slug}/cover.${ext}`

        // Convert File to ArrayBuffer to ensure compatibility in Node.js
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
          console.error("❌ [SERVER ACTION] Supabase cover upload error:", coverError)
          return { success: false, error: `Erro ao enviar foto de capa: ${coverError.message}` }
        }

        const { data: coverUrlData } = supabase.storage
          .from("pages")
          .getPublicUrl(coverPath)

        coverPhotoUrl = coverUrlData.publicUrl
        console.log(`✅ [SERVER ACTION] Cover photo uploaded successfully: ${coverPhotoUrl}`)
      } catch (err) {
        console.error("❌ [SERVER ACTION] Exception while uploading cover photo:", err)
        return { success: false, error: "Falha catastrófica ao enviar a foto de capa." }
      }
    } else {
      console.log("ℹ️ [SERVER ACTION] No cover photo provided.")
    }

    // ── 4. Upload gallery photos ─────────────────────────────
    console.log("🖼️ [SERVER ACTION] Processing gallery photos...")
    const galleryPhotoUrls: string[] = []
    const galleryFiles: File[] = []

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("gallery-") && value instanceof File && value.size > 0) {
        galleryFiles.push(value)
      }
    }
    
    console.log(`🖼️ [SERVER ACTION] Found ${galleryFiles.length} gallery photos to upload.`)

    for (let i = 0; i < galleryFiles.length; i++) {
      const file = galleryFiles[i]
      console.log(`⏳ [SERVER ACTION] Uploading gallery photo ${i + 1}/${galleryFiles.length} (${file.name})...`)
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

        if (galleryError) {
          console.error(`⚠️ [SERVER ACTION] Supabase gallery upload error [${i}]:`, galleryError)
          continue
        }

        const { data: galleryUrlData } = supabase.storage
          .from("pages")
          .getPublicUrl(galleryPath)

        galleryPhotoUrls.push(galleryUrlData.publicUrl)
      } catch (err) {
        console.error(`⚠️ [SERVER ACTION] Exception while uploading gallery photo [${i}]:`, err)
      }
    }
    
    console.log(`✅ [SERVER ACTION] Successfully uploaded ${galleryPhotoUrls.length} gallery photos.`)

    // ── 5. Insert page row ───────────────────────────────────
    console.log("💾 [SERVER ACTION] Inserting row into Supabase 'pages' table...")
    try {
      const { error: insertError } = await supabase.from("pages").insert({
        slug,
        person_name: personName,
        cover_photo_url: coverPhotoUrl,
        song_title: songTitle,
        song_artist: songArtist,
        relationship_start: relationshipStart,
        message: message,
        gallery_photo_urls: galleryPhotoUrls,
        is_published: true,
      })

      if (insertError) {
        console.error("❌ [SERVER ACTION] Supabase DB insert error:", insertError)
        return { success: false, error: `Erro no banco de dados: ${insertError.message}` }
      }
    } catch (err) {
      console.error("❌ [SERVER ACTION] Exception during DB insert:", err)
      return { success: false, error: "Falha de execução ao salvar as informações no banco de dados." }
    }

    console.log("🎉 [SERVER ACTION] Publish completed successfully!")
    return { success: true, slug }
    
  } catch (err) {
    console.error("🔥 [SERVER ACTION] Unhandled exception in publishPage:", err)
    
    // Ensure we always return a plain, serializable object.
    return { 
      success: false, 
      error: err instanceof Error ? err.message : "Erro desconhecido no servidor."
    }
  }
}
