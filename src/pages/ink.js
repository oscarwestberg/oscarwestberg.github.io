import { graphql } from 'gatsby'
import * as React from 'react'
import Layout from '../components/layout'
import Gallery from '@browniebroke/gatsby-image-gallery'

const InkPage = ({ data }) => {
  const images = data.allFile.edges.map(({ node }, index) => ({
    ...node.childImageSharp,
    // Generate name based on the index as caption.
    caption: '',
    title: ''
  }))

  return (
    <Layout>
      <Gallery images={images}/>
    </Layout>
  )
}

export const query = graphql`
query ImagesForGallery {
    allFile(filter: { relativeDirectory: { eq: "ink" } }) {
      edges {
        node {
          publicURL
          childImageSharp {
            thumb: gatsbyImageData(
              width: 300
              height: 300
              placeholder: BLURRED
            )
            full: gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`

export default InkPage
