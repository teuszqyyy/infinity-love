"use client"

import { createContext, useContext, useState, useCallback } from "react"

export interface SongData {
  title: string
  artist: string
  coverUrl?: string
  previewUrl?: string
}

export interface FormData {
  personName: string
  coverPhoto: File | null
  coverPhotoUrl: string
  song: SongData | null
  relationshipStart: string
  message: string
  galleryPhotos: File[]
  galleryPhotoUrls: string[]
  purchaseToken: string
}

interface FormContextValue {
  data: FormData
  update: (patch: Partial<FormData>) => void
}

const FormContext = createContext<FormContextValue | null>(null)

export function useFormData() {
  const ctx = useContext(FormContext)
  if (!ctx) throw new Error("useFormData must be used inside FormProvider")
  return ctx
}

const defaultData: FormData = {
  personName: "",
  coverPhoto: null,
  coverPhotoUrl: "",
  song: null,
  relationshipStart: "",
  message: "",
  galleryPhotos: [],
  galleryPhotoUrls: [],
  purchaseToken: "",
}

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<FormData>(defaultData)

  const update = useCallback((patch: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...patch }))
  }, [])

  return <FormContext.Provider value={{ data, update }}>{children}</FormContext.Provider>
}
