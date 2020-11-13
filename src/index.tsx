import * as React from 'react'
import hexToLuma from './hexToLuma'

interface Props {
  fontColor?: string
  haystack: string
  highlightColor: string
  needle: string
}

export function dissectString(needle: string, haystack: string) {
  const results = {
    beginning: '',
    done: false,
    match: '',
    remaining: '',
  }

  const firstMatch = haystack.toLowerCase().indexOf(needle.toLowerCase())
  if (firstMatch === -1) {
    results.beginning = haystack
    results.done = true
    return results
  }

  results.match = haystack.substr(firstMatch, needle.length)

  if (firstMatch === 0) {
    results.remaining = haystack.substr(firstMatch + needle.length)
    return results
  }

  results.beginning = haystack.substr(0, firstMatch)
  results.remaining =
    firstMatch + needle.length === haystack.length
      ? ''
      : haystack.substr(firstMatch + needle.length)

  return results
}

export function HighlightString(props: Props): JSX.Element {
  const { fontColor, haystack, highlightColor, needle } = props
  if (needle === '') {
    return <React.Fragment>haystack</React.Fragment>
  }

  const textColor = fontColor || hexToLuma(highlightColor)

  let workingHaystack = haystack

  const arrayOfParts = []
  let results
  let counterForKey = 0

  do {
    results = dissectString(needle, workingHaystack)
    workingHaystack = results.remaining
    if (results.beginning.length) {
      arrayOfParts.push(results.beginning)
    }
    if (results.match) {
      arrayOfParts.push(
        <span
          style={{
            backgroundColor: highlightColor,
            color: textColor,
          }}
          key={`keyOfPart${counterForKey}`}
        >
          {results.match}
        </span>
      )
    }
    counterForKey++
  } while (!results.done)

  return <React.Fragment>{arrayOfParts}</React.Fragment>
}
