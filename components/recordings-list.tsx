// components/recordings-list.tsx
'use client'
import { formatDate } from '@/app/lib/utils'; 

type Recording = {
  id: string;
  createdAt: Date;
  text: string;
 
};

export default function RecordingsList({ 
  recordings 
}: {
  recordings: Recording[]
}) {
  if (recordings.length === 0) {

    return <p className="text-muted-foreground text-center py-4">No recordings yet</p> 
  }

  return (
    <div className="space-y-2"> 
      {recordings.map((recording) => (
        <div 
        
          key={recording.id} 
          className="block p-3 rounded-md hover:bg-muted transition-colors cursor-pointer"
        >
          <p className="text-sm font-medium text-black-700 dark:text-gray-200">
            {formatDate(recording.createdAt)}
          </p>
          <p className="text-xs text-black-500 line-clamp-1"> 
            {recording.text}
          </p>
        </div>
      ))}
    </div>
  )
}