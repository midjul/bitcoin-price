import React from 'react'
import ReactDOM from 'react-dom'
import styles from './index.css'

const Index = () => {
  return <div className={styles.body}>Hello React!</div>
}

ReactDOM.render(<Index />, document.getElementById('root'))
