import * as React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import '../css/content.css'

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <div class="content">
        <div class="project">
          <StaticImage alt="Print" src="../images/index_cover.jpg"/>
        </div>
        <div class="centerTitle">
          <h1>Recent work</h1>
        </div>
        <div class="spacer"/>
        {
          data.allMdx.nodes.map(node => (
            <div>
              <GatsbyLink to={`/work/${node.slug}`}>
                <div class="work">
                  <div class="workImage">
                    <GatsbyImage
                        image={getImage(node.frontmatter.hero_image)}
                        alt={node.frontmatter.hero_image_alt}
                    />
                  </div>
                  <div class="workText">
                    <h1>{node.frontmatter.title}</h1>
                    <p class="year">{node.frontmatter.date}</p>
                    <p>{node.frontmatter.description}</p>
                  </div>
                </div>
              </GatsbyLink>
              <div class="spacer"/>
            </div>
          ))
        }
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(
      sort: {
        fields: frontmatter___date,
        order: DESC
      }
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          description
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

export default IndexPage
