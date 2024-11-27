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
  const news = data.allMarkdownRemark.nodes;
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
    <Layout categories={allCat.distinct}>
      <div className="container">
        <h1 className="">All categories</h1>

        <div className="flex flex-wrap gap-3">
          {allCat.distinct.map((i, ind) => (
            <Link
              key={ind}
              to={`/category/${i.toLowerCase().replaceAll(" ", "-")}`}
              className="p-2 px-4 bg-gray-100 dark:bg-dark_4 rounded-md hover:bg-main hover:dark:bg-main hover:text-white font-semibold"
            >
              {i}
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
              <AuthorCard data={item.frontmatter} />
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
              <Article data={item.frontmatter} />
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
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/markdown/news//" } }
      limit: 16
    ) {
      nodes {
        frontmatter {
          title
          authors
          category
          exerpt
          date
          slug
          thumb {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        id
      }
    }
    allCat: allMarkdownRemark {
      distinct(field: { frontmatter: { category: SELECT } })
    }
    allAuthors: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/markdown/authors//" } }
      limit: 50
    ) {
      nodes {
        frontmatter {
          slug
          title
          job
          exerpt
          ava {
            childImageSharp {
              gatsbyImageData
            }
          }
          contacts {
            link
            name
          }
        }
      }
    }
  }
`;
