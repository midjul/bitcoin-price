import React, { Component } from 'react'
import { Observable } from 'rxjs'
class App extends Component {
  componentDidMount () {
    const getPrice = symbol =>
      Observable.fromPromise(
        window
          .fetch(`https://api.coindesk.com/v1/bpi/currentprice/${symbol}.json`)
          .then(res => res.json())
      )

    const interval$ = Observable.interval(2000)
    //    const symbols = ['bam', 'usd', 'eur']
    const symbols$ = Observable.of('bam', 'eur', 'cad', 'gbp', 'ars')

    interval$
      .merge(symbols$)
      .flatMap(url => getPrice(url))
      .map(res => res.bpi)
      .map(price => {
        delete price.USD
        return price[Object.keys(price)[0]]
      })
      // .distinctUntilChanged(({ rate_float }) => rate_float) //eslint-disable-line
      .subscribe(res => this.setState({ [res.code.toLowerCase()]: res }))
  }
  render () {
    const currencies = this.state
    let res = []
    if (currencies) {
      for (const cur in currencies) {
        console.log(cur)
        res.push(
          <li key={cur}>
            {currencies[cur].code} - {currencies[cur].rate}
          </li>
        )
      }
    }

    return <ul>{res.length > 0 ? res : <li>'Fetching data'</li>}</ul>
  }
}

export default App
