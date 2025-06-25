import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'
const LottieHandler = dynamic(() => import("@/components/common/LottieHandler"), {
    ssr: false,
})
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