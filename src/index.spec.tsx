import React from 'react'
import enzyme from 'enzyme'
import { dissectString, HighlightString } from './'

describe('Highlight String unit tests', () => {
  describe('Dissect String unit tests', () => {
    it('Should return everything in a no match scenario', () => {
      const joke =
        'Do I enjoy randomly appointing people to judicial positions? I’ll let you be the judge of that - Ivo Graham'
      const expectedResults = {
        beginning: joke,
        done: true,
        match: '',
        remaining: ''
      }
      expect(dissectString('Biggun', joke)).toEqual(expectedResults)
    })

    it('Should return only beginning and match if at the end', () => {
      const joke =
        "Planning meals in advance, now that's some food forethought - Andy Field"
      const expectedResults = {
        beginning:
          "Planning meals in advance, now that's some food forethought - Andy ",
        done: false,
        match: 'Field',
        remaining: ''
      }
      expect(dissectString('Field', joke)).toEqual(expectedResults)
    })

    it('Should return beginning, remaining and match if match is in middle', () => {
      const joke =
        'A cowboy asked me if I could help him round up 18 cows. I said, ‘Yes, of course. That’s 20 cows.’- Jake Lambert'
      const expectedResults = {
        beginning: 'A cowboy asked me if I could help him round up 18 ',
        done: false,
        match: 'cows',
        remaining: '. I said, ‘Yes, of course. That’s 20 cows.’- Jake Lambert'
      }
      expect(dissectString('cows', joke)).toEqual(expectedResults)
    })

    it('Should match case insensitively', () => {
      const joke =
        "You're supposed to say 'Break a leg' to actors. Break a leg? It's not even relevant. That's like saying to a 100-metre hurdler, 'I hope you forget your lines! - Izzy Mant"
      const expectedResults = {
        beginning: "You're supposed to say 'Break a ",
        done: false,
        match: 'leg',
        remaining:
          "' to actors. Break a leg? It's not even relevant. That's like saying to a 100-metre hurdler, 'I hope you forget your lines! - Izzy Mant"
      }
      expect(dissectString('LEG', joke)).toEqual(expectedResults)
    })
  })

  it('Should handle matching in the first position in the haystack', () => {
    const joke =
      'One of my earliest memories is seeing my mother’s face through the oven window. As we played hide and seek and she said: ‘you’re getting warmer’ - Milton Jones'
    const expectedResults = {
      beginning: '',
      done: false,
      match: 'One',
      remaining:
        ' of my earliest memories is seeing my mother’s face through the oven window. As we played hide and seek and she said: ‘you’re getting warmer’ - Milton Jones'
    }
    expect(dissectString('one', joke)).toEqual(expectedResults)
  })

  it('Should highlight a string when given a haystack with a matching needle', () => {
    const wrapper = enzyme.shallow(
      <HighlightString
        haystack='This is a test of the highlight string text'
        highlightColor='#999999'
        needle='HIGHLIGHT'
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('Should highlight a string when given a haystack with a few matching needles', () => {
    const wrapper = enzyme.shallow(
      <HighlightString
        haystack='This is a test of the jist of a miss of a highlight string text'
        highlightColor='#999999'
        needle='is'
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('Should leave a string alone if nothign to highlight', () => {
    const wrapper = enzyme.shallow(
      <HighlightString
        haystack='This is a test of the highlight string text'
        highlightColor='#999999'
        needle='Widdcombe'
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
