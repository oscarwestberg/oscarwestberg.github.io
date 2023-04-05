import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'

const CommissionPage = () => {
  return (
    <Layout>
      <div class="content">
        <div class="project">
          <StaticImage alt="Print" src="../images/Commission_Info.jpg"/>
        </div>
      </div>
    </Layout>
  )
}

export default CommissionPage
