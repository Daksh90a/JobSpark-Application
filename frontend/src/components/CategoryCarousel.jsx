import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Fullstack Developer"
]

const CategoryCarousel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query))
        navigate("/browse"); 
    }

    return (
        <div className="bg-white py-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Explore Job Categories
            </h2>
            <Carousel className="w-full max-w-4xl mx-auto px-4">
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3 pl-4">
                            <Button 
                                onClick={() => searchJobHandler(cat)} 
                                variant="outline" 
                                className="w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="bg-white text-purple-600 hover:bg-purple-100 border border-purple-600" />
                <CarouselNext className="bg-white text-purple-600 hover:bg-purple-100 border border-purple-600" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel

