import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../../components/layout'
import '../../css/content.css'

const Comic = ({ data }) => {
  return (
    <Layout>
      <div class="content">
        <a href="../">
          <h4>← Back</h4>
        </a>
        <MDXRenderer>
          {data.mdx.body}
        </MDXRenderer>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
      }
      body
    }
  }
`

// allFile(filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, relativeDirectory: {eq: $id}}) {
export default Comic
