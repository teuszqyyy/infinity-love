import { notFound } from "next/navigation"
import { createServerSupabase } from "@/lib/supabase/server"
import PageContent from "./page-content"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabase()
  const { data: page } = await supabase
    .from("pages")
    .select("person_name, cover_photo_url")
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single()

  if (!page) {
    return {
      title: "Página não encontrada — InfinityLove",
    }
  }

  return {
    title: `Para ${page.person_name} — InfinityLove`,
    description: "Uma surpresa especial feita com amor...",
    openGraph: {
      title: `Para ${page.person_name} — InfinityLove`,
      description: "Uma surpresa especial feita com amor...",
      type: "website",
      images: page.cover_photo_url ? [page.cover_photo_url] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `Para ${page.person_name} — InfinityLove`,
      description: "Uma surpresa especial feita com amor...",
      images: page.cover_photo_url ? [page.cover_photo_url] : [],
    },
  }
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabase()
  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single()

  if (!page) {
    notFound()
  }

  return <PageContent data={page} />
}
