import * as React from "react"

import "../styles/styles.scss"

import Game from "../components/Game"


// styles
const pageStyles = {
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

// markup
const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <title>Woordel</title>
      <div id="page">
        <div id="header">
          <h1>Woordel</h1>
        </div>
          <Game />
      </div>
    </main>
  )
}

export default IndexPage
