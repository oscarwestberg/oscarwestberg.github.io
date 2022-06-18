import * as React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../components/layout'

const ComicsPage = ({ data }) => {
  return (
    <Layout>
      {
        data.allMdx.nodes.map(node => (
          <article key={node.id}>
            <GatsbyLink to={`/comics/${node.slug}`}>
              <h1>{node.frontmatter.title}</h1>
            </GatsbyLink>
            <p>{node.frontmatter.date}</p>
            <GatsbyLink to={`/comics/${node.slug}`}>
              <GatsbyImage
                image={getImage(node.frontmatter.hero_image)}
                alt={node.frontmatter.hero_image_alt}
              />
            </GatsbyLink>
          </article>
        ))
      }
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          hero_image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        id
        slug
      }
    }
  }
`

export default ComicsPage
