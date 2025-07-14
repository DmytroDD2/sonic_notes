

// app/dashboard/page.tsx

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation'
import prisma from "@/app/lib/db"
import AudioUploader from '@/components/audio-uploader'

import BillingAlert from '@/components/billing-alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import RecordingsList from "@/components/recordings-list";

export default async function DashboardPage() {
  const userCheck = await currentUser();

  if (!userCheck) {
    redirect('/sign-in')
  }
  
  
  const user = await prisma.user.findUnique({
    where: { email: userCheck.emailAddresses[0].emailAddress },
    include: {
      recordings: {
        orderBy: { createdAt: 'desc' },
        take: 20 
      }
    }
  })

  if (!user) {
   
    redirect('/sign-in'); 
  }

  return (
    <div className="container mx-auto px-4 py-8">
      
      <h1 className="text-3xl font-bold mb-6">Voice recordings</h1> {/* in english */}
       
    
      {user.credits <= 1 && (
        <BillingAlert remainingCredits={user.credits} />
      )}

    
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
        <div className="lg:col-span-1">
          <Card className="h-full"> 
            <CardHeader>
              <CardTitle>Previous recordings</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100vh-200px)] overflow-y-auto"> 
              <RecordingsList recordings={user.recordings} />
            </CardContent>
          </Card>
        </div>

       
        <div className="lg:col-span-3 space-y-6"> 
          
          <Card>
            <CardHeader>
          
              <CardTitle>Convert voice to text</CardTitle> 
            </CardHeader>
            <CardContent>
              <AudioUploader 
                userId={userCheck.id} 
                credits={user.credits} 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your account</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Available credits</p>
                  <p className="text-2xl font-bold">{user.credits}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-lg">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}