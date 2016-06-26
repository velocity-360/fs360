// https://github.com/producthunt/chai-enzyme

import React from 'react'
import chai, { expect } from 'chai'
import jsdom from 'jsdom'
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme()) // Note the invocation at the end


const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
const win = doc.defaultView

global.document = doc
global.window = win

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key]
  }
})

global.React = React
global.expect = expect