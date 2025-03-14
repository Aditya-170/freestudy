import { assets } from '../../assets/assets'


function TestimonialsSection({educator}) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center border border-gray-200 m-4">
   
    <div className="flex flex-col items-center mb-4">
      <img src={educator.image} alt="Profile" className="w-16 h-16 rounded-full mb-2" />
      <h3 className="text-lg font-semibold">{educator.name}</h3>
      <p className="text-gray-500 text-sm">{educator.role}</p>
    </div>
    
    {/* Star Ratings */}
    <div className="flex justify-center mb-4">
      {Array(5).fill().map((_, index) => (
        <img 
          src={index < Math.ceil(educator.rating) ? assets.star : assets.star_blank} 
          alt="star" 
          key={index} 
          className="w-5 h-5 mx-0.5" 
        />
      ))}
    </div>
    
    {/* Feedback */}
    <p className="text-gray-600 text-sm mb-4">{educator.feedback}</p>
    
    {/* Read More Link */}
    <a href="#" className="text-blue-600 font-medium hover:underline">Read more</a>
  </div>
  )
}

export default TestimonialsSection