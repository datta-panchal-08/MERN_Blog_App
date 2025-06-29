import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ImageUrl } from '../services/Endpoint';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ReactCrousal = () => {
  const { posts } = useSelector(state=>state.post);

  return (
    <div className=" overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={600}
        showArrows={true}
        swipeable={true}
        emulateTouch={true}
      >
        {posts.map((p) => (
          <Link to={`/post/${p._id}`} key={p._id} className="w-full cursor-pointer max-h-[80vh] overflow-hidden">
            <img
              src={`${ImageUrl}/${p.image}`}
              alt={p.title}
              className="w-full h-[80vh] rounded-md object-cover object-[50%_20%]"
            />
            <p className="legend">{p.title}</p>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default ReactCrousal;
