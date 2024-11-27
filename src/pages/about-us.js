import React from "react";
import Layout from "../components/Layout";
import { SEO } from "../components/Seo";
import { Link, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import { DiReact } from "react-icons/di";
import { FaUsersViewfinder } from "react-icons/fa6";
import { BsFillPlayCircleFill } from "react-icons/bs";

import TeamCard from "../components/Team-card";

function AboutUs({ data }) {
  const { allCategories, allTeams } = data;
  return (
    <Layout categories={allCategories.distinct}>
      <div className="">
        <div className="container">
          <h1>About Us</h1>
          <section className="row_2">
            <div className="box">
              <div className="icon">
                <DiReact />
              </div>
              <h2>Open Platform</h2>
              <p>
                At <b>XFR.News</b>, we offer an Open Platform for voices
                worldwide. Share your stories and help create a more informed
                and inclusive media landscape.
              </p>
              <p>
                Our platform breaks down media barriers, allowing anyone to
                contribute. Join us to reshape journalism and amplify diverse
                voices.
              </p>
            </div>
            <div className="box box_img">
              <div>
                <div className="icon">
                  <FaUsersViewfinder />
                </div>
                <h2>Digital Publishing</h2>
                <p>
                  <b>XFR.News</b> is at the forefront of digital publishing,
                  providing innovative tools for writers, journalists, and
                  creators to publish their work with ease and reach a global
                  audience.
                </p>
                <p>
                  From multimedia content to real-time publishing, our platform
                  empowers creators to produce, share, and engage with readers
                  worldwide, fostering a more dynamic media environment.
                </p>
              </div>
              <div>
                <div className="box-demo">
                  <StaticImage
                    src="../assets/img/screen.jpg"
                    alt="A dinosaur"
                  />
                  <button className="box-demo-btn">
                    Look at us <BsFillPlayCircleFill />
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="box_bd my-10 lg:my-20">
            <div className="p-10">
              <h2 className="text-slogan">
                You Can <b>Read</b> And <b>Write</b> With{" "}
                <span className="">
                  <b>XFR</b>.News
                </span>
              </h2>
            </div>
            <div className="border-t lg:border-t-0 border-l-0 lg:border-l dark:border-gray-800">
              <div className="p-10">
                <h3 className="h2">Mission & Vission</h3>
                <p>
                  At <b>XFR.News</b>, our mission is to empower voices across
                  the globe by providing an open platform for diverse
                  perspectives. We aim to foster transparency, inclusivity, and
                  truth in journalism.
                </p>
                <p>
                  Our vision is to reshape the media landscape by enabling
                  creators, journalists, and citizens to share stories freely,
                  breaking down barriers in digital publishing and amplifying
                  global dialogue.
                </p>
              </div>

              <div className="p-10 border-t dark:border-gray-800">
                <h3 className="h2">XFR.News History</h3>
                <p>
                  <b>XFR.News</b> was founded with a vision to democratize news
                  and information. Our journey began with a commitment to
                  transparency, accuracy, and inclusivity in digital journalism.
                </p>
                <p>
                  Over the years, we've grown from a small digital platform to a
                  global hub for diverse voices, constantly evolving to meet the
                  demands of a rapidly changing media landscape.
                </p>
              </div>
            </div>
          </section>

          <h2 className="h1">Leadership & Experienced Team </h2>
          <section className="teams mb-20">
            {allTeams.nodes.map((i, ind) => (<TeamCard key={ind} data={i.frontmatter} />))}
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default AboutUs;

export const Head = () => <SEO title="About Us" />;

export const query = graphql`
  query AboutUs {
    allCategories: allMarkdownRemark {
      distinct(field: { frontmatter: { category: SELECT } })
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
  }
`;
