import React, { useRef, useCallback } from "react";
import Layout from "../components/Layout";
import { SEO } from "../components/Seo";
import { graphql } from "gatsby";
import AuthorCard from "../components/Author-card";
import TeamCard from "../components/Team-card";

import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";


import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";


function Authors({ data }) {
    const { allCategories, allMarkdownRemark, allTeams } = data;
   
    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
      }, []);
    
      const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
      }, []);

    return (
        <Layout categories={allCategories.distinct}>
            <div className="container">
                <h1>Top Authors</h1>
                <AuthorCard data={allMarkdownRemark.nodes} />

                {/* Custom Navigation */}
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <h2 className="h1">Our Team</h2>
                    <div className="slider-nav">
                        <button className="slider-nav-prev" aria-label="Previous Slide" onClick={handlePrev}>
                            <MdKeyboardArrowLeft />
                        </button>
                        <button className="slider-nav-next" aria-label="Next Slide" onClick={handleNext}>
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
                        480: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    {allTeams.nodes.map((team, index) => (
                        <SwiperSlide key={index}>
                            <TeamCard data={team.frontmatter} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Layout>
    );
}

export default Authors;

export const Head = () => <SEO title="Authors" />;

export const query = graphql`
    query Authors {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src/markdown/authors//" } }
        limit: 100
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
      allTeams: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src/markdown/team//" } }
        limit: 100
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
      allCategories: allMarkdownRemark {
        distinct(field: { frontmatter: { category: SELECT } })
      }
    }
  `;