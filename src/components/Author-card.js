import React from 'react';
import Card from "../components/Author-card-item";

function AuthorCard({ data }) {
   // console.log('authors', data)
    return (
        <section className="authors">
            {data.map((i, ind) => (
                <Card key={ind} data={i.frontmatter} />
            ))}
        </section>
    )
}

export default AuthorCard



