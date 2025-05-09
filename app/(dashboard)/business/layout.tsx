
import React from 'react'
 
import { withProtectedRoute } from '@/lib/utility/adminProtector'
import ApplicationLayout from './ApplicationLayout';
 

const layout = async({ children }: { children: React.ReactNode }) => {
    

    return <ApplicationLayout >
        {children}
    </ApplicationLayout>;

}

export default layout