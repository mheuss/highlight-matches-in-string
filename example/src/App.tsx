import React from 'react'

import { HighlightString } from 'highlight-matches-in-string'
import 'highlight-matches-in-string/dist/index.css'

const App = () => {
  return <HighlightString
    haystack='This is a test of the jist of a miss of a highlight string text'
    highlightColor='#999999'
    needle='is'
  />
}

export default App
