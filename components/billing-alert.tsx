// components/billing-alert.tsx
'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RocketIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function BillingAlert({
  remainingCredits
}: {
  remainingCredits: number
}) {
  const router = useRouter()

  return (
    <Alert variant={remainingCredits === 0 ? 'destructive' : 'default'}>
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Увага!</AlertTitle>
      <AlertDescription>
        {remainingCredits === 0 ? (
          
          <span>You`&apos;`ve run out of credits. </span>
          
        ) : (
          <span>Remaining {remainingCredits} credit. </span>
        )}
        <Button 
          variant="link" 
          className="h-auto p-0 ml-1"
          onClick={() => router.push('/billing')}
        >
          Recharge account
        </Button>
      </AlertDescription>
    </Alert>
  )
}