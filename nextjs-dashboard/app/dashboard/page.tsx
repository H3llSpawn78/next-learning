import React from 'react'

export default function Page({...props}) {
  const headingText = 'Dashboard page';

  return (
    <h1>{headingText}</h1>
  )
}

Page.propTypes = {
    title: 'string'
}