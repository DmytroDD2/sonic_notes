// app/api/upload/route.ts

import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/app/lib/db"

export const maxDuration = 30

export async function POST(req: Request) {
  const { userId } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get("file")

    if (!file || !(file instanceof File))  {
      return NextResponse.json({ error: "Invalid audio file" }, { status: 400 })
    }

 
    const audioBuffer = await file.arrayBuffer()
    const audioBlob = new Blob([audioBuffer], { type: file.type })
    

    const response = await fetch(
      "https://api-inference.huggingface.co/models/openai/whisper-large-v3",
      {
        headers: { 
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": audioBlob.type
        },
        method: "POST",
        body: audioBlob
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to transcribe audio")
    }

    const user = await prisma.user.findUnique({ 
      where: { clerkUserId: userId } 
    })

    const result = await response.json()
    const text = result.text

    if (!text) {
      throw new Error("No transcription returned")
    }


    

    if (!user) {
      throw new Error("User not found in database")
    }

    await prisma.recording.create({
      data: {
      userId: user.id,
      text: text,
      audioUrl: `/audio/${Date.now()}_${file.name}`
      }
    })

    await prisma.user.update({
      where: { id: user.id },
      data: { credits: user.credits - 1 }
    })

    return NextResponse.json({ text })

  } catch (e) {
    console.error("Transcription error:", e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Transcription failed" },
      { status: 500 }
    )
  }
}