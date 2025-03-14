
import Hero from '../../components/students/Hero'
import Companies from '../../components/students/Companies'
import CoursesSection from '../../components/students/CoursesSection'
import Footer from '../../components/students/Footer'

function Home() {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero/>
      <Companies />
      <CoursesSection />
      <Footer/>
    </div>
  )
}

export default Home