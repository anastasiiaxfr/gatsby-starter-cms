import React, { useRef, useCallback } from "react";
import { Link, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../../components/Layout";
import Article from "../../components/Article";
import AuthorCard from "../../components/Author-card-item";

import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function News({ data }) {
  const news = data.allContentfulNews.nodes;
  const { allCat, allAuthors } = data;

  console.log("news", allAuthors);

  const sliderRef = useRef(null);
  const sliderRefAuthors = useRef(null);


  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);


  const handlePrevAuthors = useCallback(() => {
    if (!sliderRefAuthors.current) return;
    sliderRefAuthors.current.swiper.slidePrev();
  }, []);

  const handleNextAuthors = useCallback(() => {
    if (!sliderRefAuthors.current) return;
    sliderRefAuthors.current.swiper.slideNext();
  }, []);

  return (
    <Layout categories={allCat.nodes}>
      <div className="container">
        <h1 className="">All categories</h1>

        <div className="flex flex-wrap gap-3">
          {allCat.nodes.map((i, ind) => (
            <Link
              key={ind}
              to={`/category/${i.slug}`}
              className="p-2 px-4 bg-gray-100 dark:bg-dark_4 rounded-md hover:bg-main hover:dark:bg-main hover:text-white font-semibold"
            >
              {i.title}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap justify-between items-center gap-2">
          <h2 className="h1">Top authors</h2>
          <div className="slider-nav">
            <button
              className="slider-nav-prev"
              aria-label="Previous Slide"
              onClick={handlePrevAuthors}
            >
              <MdKeyboardArrowLeft />
            </button>
            <button
              className="slider-nav-next"
              aria-label="Next Slide"
              onClick={handleNextAuthors}
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>

        <Swiper
          ref={sliderRefAuthors}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          modules={[Navigation]}
          breakpoints={{
            658: {
              slidesPerView: 2,
            },
            1023: {
              slidesPerView: 2,
            },
            1400: {
              slidesPerView: 3,
            },
          }}
        >
          {allAuthors.nodes.map((item, index) => (
            <SwiperSlide key={index}>
              <AuthorCard data={item} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex flex-wrap justify-between items-center gap-2">
          <h2 className="h1">Latest News</h2>
          <div className="slider-nav">
            <button
              className="slider-nav-prev"
              aria-label="Previous Slide"
              onClick={handlePrev}
            >
              <MdKeyboardArrowLeft />
            </button>
            <button
              className="slider-nav-next"
              aria-label="Next Slide"
              onClick={handleNext}
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>

        {/* Swiper Component */}
        <Swiper
          ref={sliderRef}
          spaceBetween={24}
          slidesPerView={1}
          loop={false}
          modules={[Navigation]}
          breakpoints={{
            658: {
              slidesPerView: 2,
            },
            1023: {
              slidesPerView: 3,
            },
            1400: {
              slidesPerView: 4,
            },
          }}
        >
          {news.map((item, index) => (
            <SwiperSlide key={index}>
              <Article data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Layout>
  );
}

export default News;

export const query = graphql`
  query {
    allContentfulNews {
    nodes {
      author {
        name
      }
      category {
        title
      }
      description {
        description
      }
      slug
      title
      thumbnail {
        gatsbyImageData(width: 600, height: 300, layout: CONSTRAINED)
      }
    }
  }
    allCat: allContentfulCategories {
      nodes {
        title
        slug
      }
    } 
    allAuthors: allContentfulAuthors {
    nodes {
      name
      job
      excerpt {
        excerpt
      }
      ava {
        gatsbyImageData(width: 400, height: 400, layout: CONSTRAINED)
      }
      linkedin
      email
      discord
      facebook
    }
  }
  }
`;
