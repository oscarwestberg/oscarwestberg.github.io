import { graphql } from 'gatsby'
import * as React from 'react'
import Layout from '../components/layout'
import Gallery from '@browniebroke/gatsby-image-gallery'

const IndexPage = ({ data }) => {
  const images = data.allFile.edges.map(({ node }, index) => ({
    ...node.childImageSharp,
    // Generate name based on the index as caption.
    caption: '',
    title: '',
    colWidth: 1,
    mdColWidth: 1
  }))

  return (
    <Layout>
      <Gallery
        images={images}
        colWidth={100}
        mdColWidth={100/2}
        gutter={0}
      />
    </Layout>
  )
}

export const query = graphql`
query ImagesForGallery {
    allFile(
      filter: { relativeDirectory: { eq: "index" } }
      sort: { fields: base, order: ASC }
    ) {
      edges {
        node {
          publicURL
          childImageSharp {
            thumb: gatsbyImageData(
              width: 700
              height: 700
              placeholder: BLURRED
            )
            full: gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`

export default IndexPage
