import { Suspense } from 'react'
import Hero from "./_components/Hero"
import WorkingList from "./_components/WorkingList"

const Home = () => {
  return (
    <div>
      <Hero />
      <Suspense fallback={<div>Loading workspaces...</div>}>
        <WorkingList />
      </Suspense>
    </div>
  )
}

export default Home