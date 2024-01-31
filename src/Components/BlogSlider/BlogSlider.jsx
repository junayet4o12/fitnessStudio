import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

const BlogSlider = ({blogs}) => {
  return (
      <Carousel
        swipeable={true}
        draggable={true}
        keyBoardControl={true}
        showDots={true}
        autoPlaySpeed={500}
        responsive={responsive}
        infinite={true}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
      >
        {
            blogs.map(blog=>
                <div
                key={blog?._id}
                style={{
                    backgroundImage: `url(${blog.blogImg})`,
                    backgroundPosition:"center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
            }}
                className="h-[250px] md:h-[350px] mb-[25px] md:mb-[50px] flex flex-col items-start justify-end object-contain ">
                    {/* <img src={blog.BlogImg}/> */}
                    <h1 className="text-xl md:text-5xl font-bold text-white bg-primary w-full bg-opacity-[0.8] p-[10px]">{blog.blogName}</h1>
                </div>
            )
        }
      </Carousel>
  )
}

export default BlogSlider
