import { createServerSupabase } from "@/lib/supabase/server"
import PageContent from "./page-content"
import { notFound } from "next/navigation"

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabase()
  
  const { data: page, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", params.slug)
    .single()

  console.log("SLUG:", params.slug)
  console.log("PAGE:", JSON.stringify(page))
  console.log("ERROR:", JSON.stringify(error))

  if (!page) {
    notFound()
  }

  return <PageContent data={page} />
}
