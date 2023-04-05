import { graphql } from 'gatsby'
import * as React from 'react'
import Layout from '../components/layout'
import Gallery from '@browniebroke/gatsby-image-gallery'

const IllustrationPage = ({ data }) => {
  const images = data.allFile.edges.map(({ node }, index) => ({
    ...node.childImageSharp,
    // Generate name based on the index as caption.
    caption: '',
    title: ''
  }))

  return (
    <Layout>
      <Gallery 
        images={images}
        colWidth={100}
        mdColWidth={100/3}
        gutter={0}
      />
    </Layout>
  )
}

export const query = graphql`
query ImagesForGallery {
    allFile(
      filter: { relativeDirectory: { eq: "illustration" } }
      sort: { fields: base, order: ASC }
      ) {
      edges {
        node {
          publicURL
          childImageSharp {
            thumb: gatsbyImageData(
              width: 500
              height: 500
              placeholder: BLURRED
            )
            full: gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`

export default IllustrationPage
