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
        res.push(
          <li
            className="list-group-item d-flex justify-content-around align-items-center"
            key={cur}
          >
            {currencies[cur].code}
            <span className="badge badge-primary badge-pill">
              {currencies[cur].rate}
            </span>
          </li>
        )
      }
    }

    return (
      <div className="container-fluid">
        <div className="col-6">
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-around align-items-center">
              <h2>Currency</h2>{' '}
              <span>
                <h2>Price</h2>
              </span>
            </li>
            {res.length > 0 ? res : <li>Fetching data</li>}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
