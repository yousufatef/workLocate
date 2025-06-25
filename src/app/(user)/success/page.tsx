import LottieHandler from '@/components/common/LottieHandler'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className="container">
            <div className="flex flex-col items-center mt-32">
                <LottieHandler type="success" />
                <Link href="/" replace className="underline">
                    Go back to Home?
                </Link>
            </div>
        </div>
    )
}

export default page