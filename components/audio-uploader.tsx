// components/audio-uploader.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function AudioUploader({ 
  userId,
  credits 
}: {
  userId: string
  credits: number
}) {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!file) {
      toast.warning('Please select an audio file')

      return
    }

    if (credits <= 0) {
      toast.error('Not enough credits. Please recharge your account.')
      return
    }

    setIsLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('userId', userId)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error()

      toast.success('Audio processed successfully!')
      router.refresh() 
    } catch (error) {
      toast.error("Error processing audio")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Input 
        type="file" 
        accept="audio/*" 
        onChange={(e) => setFile(e.target.files?.[0] || null)} 
        disabled={isLoading}
      />
      <Button 
        onClick={handleSubmit}
        disabled={isLoading || !file}
      >
        {isLoading ? 'Processing...' : 'Convert'}
      </Button>
      <p className="text-sm text-muted-foreground">
        Supported formats: MP3, WAV, OGG
      </p>
      
    </div>
  )
}