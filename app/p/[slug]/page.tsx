import { notFound } from "next/navigation"
import { createServerSupabase } from "@/lib/supabase/server"
import PageContent from "./page-content"
export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = createServerSupabase()
  
  const { data: page, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .single()

  console.log("SLUG:", slug)
  console.log("PAGE:", JSON.stringify(page))
  console.log("ERROR:", JSON.stringify(error))

  if (!page) {
    notFound()
  }

  return <PageContent data={page} />
}
