import React, { Component } from 'react'
import { Observable } from 'rxjs/Rx'
class App extends Component {
  componentDidMount () {
    const url = symbol =>
      `https://api.coindesk.com/v1/bpi/currentprice/${symbol}.json`
    //    const interval$ = Observable.interval(500)
    const symbols$ = Observable.of('bam', 'usd', 'eur')

    symbols$
      .map(url)
      .mergeMap(url => Observable.ajax(url))
      .map(res => res.response)
      .subscribe(console.log)
  }
  render () {
    return <div>Hello React!</div>
  }
}

export default App
