
import React from 'react'
import { getEvents } from '@/components/data'
import { withProtectedRoute } from '@/lib/utility/adminProtector'
import { ApplicationLayout } from '../business/appLayout'

const layout = async({ children }: { children: React.ReactNode }) => {
    let events = await getEvents()

    return <ApplicationLayout events={events}>
        {children}
    </ApplicationLayout>;

}

export default layout