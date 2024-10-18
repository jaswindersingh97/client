import React from 'react'
import { Link } from 'react-router-dom';
function ErrorPage() {
  return (
    <div className={styles.container}>
    <div className={styles.header}>
      <h1>404</h1>
      <h2>We couldn't find this Page.</h2>
    </div>
    <div className={styles.body}>
      <p>Click the Button to go the dashboard</p>
      <Link to={'/dashboard'}><button>Dashboard</button></Link>
    </div>
    </div>
  )
}

export default ErrorPage
