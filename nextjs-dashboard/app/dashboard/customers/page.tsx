import React from 'react'

export default function Page({...props}) {
  const headingText = 'Customers page';

  return (
    <h1>{headingText}</h1>
  )
}

Page.propTypes = {
    title: 'string'
}
