import React from 'react'
import withAuth from './withAuth'

function Profile() {
  return (
    <div>
    <h1>Welcome to the Profile!</h1>
    <p>This is a protected page, visible only to authenticated users.</p>
    </div>
  )
}
export default withAuth(Profile);