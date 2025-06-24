import { Suspense } from 'react'
import Hero from "./_components/Hero"
import WorkingList from "./_components/WorkingList"
import WorkspaceCarousel from './_components/WorkspaceCarousel'

const Home = () => {
  return (
    <div>
      <Hero />
      <WorkspaceCarousel />
      <Suspense fallback={<div>Loading workspaces...</div>}>
        <WorkingList />
      </Suspense>
    </div>
  )
}

export default Home