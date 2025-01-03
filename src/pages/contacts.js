import React from "react";
import Layout from "../components/Layout";
import { SEO } from "../components/Seo";
import { Link, graphql } from "gatsby";
import Networks from "../components/Socials";
import ContactForm from "../components/Form-contacts";
// import ContactMap from "../components/Contacts-map";

import { MdAlternateEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";

const mainContacts = [
    {
        icon: <BsFillTelephoneFill />,
        label: "+380 63 063 32 26",
        url: "tel:+380630633226",
    },
    {
        icon: <MdAlternateEmail />,
        label: "xforealn@gmail.com",
        url: "mailto:xforealn@gmail.com",
    },
    {
        icon: <FaLinkedinIn />,
        label: "linkedin",
        url: "https://www.linkedin.com/in/webdev-anastasiiaxfr/",
    },
];

const offices = [
    {
        img: '',
        contacts: [
            { label: '(00) 111 222 1111', url: 'tel:001112221111', icon: <BsFillTelephoneFill /> },
            { label: 'xfr.news.off1@gmail.com', url: 'tel:(00) 111 222 1111', icon: <MdAlternateEmail /> },
            {
                label: '845 Central Ave Hamilton, Ohio(OH), 45011', url: '#', icon: <LuMapPin />
            }
        ],
    },
    {
        img: '',
        contacts: [
            { label: '(00) 111 222 2222', url: 'tel:001112221111', icon: <BsFillTelephoneFill /> },
            { label: 'xfr.news.off2@gmail.com', url: 'tel:(00) 111 222 1111', icon: <MdAlternateEmail /> },
            {
                label: '845 Central Ave Hamilton, Ohio(OH), 45011', url: '#', icon: <LuMapPin />
            }
        ],
    },
    {
        img: '',
        contacts: [
            { label: '(00) 111 222 3333', url: 'tel:001112221111', icon: <BsFillTelephoneFill /> },
            { label: 'xfr.news.off3@gmail.com', url: 'tel:(00) 111 222 1111', icon: <MdAlternateEmail /> },
            {
                label: '845 Central Ave Hamilton, Ohio(OH), 45011', url: '#', icon: <LuMapPin />
            }
        ],
    }
];


function Contacts({ data }) {
    const allCategories = data.allContentfulCategories.nodes;
    return (
        <Layout categories={allCategories}>
            <div className="page">
                <section className="mb-10">
                    <div className="container">
                        <div className="row_1">
                            <div>
                                <h1>Contact Us</h1>
                                <div className="mb-8 opacity-60 dark:opacity-100 dark:text-dark_5">
                                    <p className="">
                                        At <b>XFR.News</b>, we’re excited to connect with you! Whether you're starting a new lighting design project or simply looking for expert guidance, we’re here to assist.
                                    </p>

                                    <p>
                                        <small>
                                            Feel free to reach out using the contact details below—we can’t wait to hear from you and help bring your vision to life!
                                        </small>
                                    </p>
                                </div>

                                <nav className="contacts justify-start">
                                    {mainContacts.map((i, ind) => (
                                        <Link target="_blank" to={i.url} key={ind}>
                                            {i.icon}
                                            {i.label}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="text-2xl font-semibold mb-4 mt-8">Let's <u className="">Work</u> Together!</div>
                                <Networks />

                            </div>
                            <div>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="">
                    <div className="container">
                        <h2 className="h1 mt-0">Get in Touch with Us!</h2>
                        <nav className="contact-cards">
                            {offices.map((i, ind) => (
                                <div className="contact-card" key={ind}>
                                    {i.contacts.map((i, ind) => (
                                        <Link target="_blank" to={i.url}>{i.icon} {i.label}</Link>
                                    ))}
                                </div>
                            ))}
                        </nav>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export default Contacts;

export const Head = () => <SEO title="Contact Us" />;

export const query = graphql`
  query Policy {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/markdown/terms/policy/" } }
    ) {
      nodes {
        frontmatter {
          title
        }
        html
      }
    }

    allContentfulCategories {
        nodes {
        title
        slug
        }
    }
  }
`;
