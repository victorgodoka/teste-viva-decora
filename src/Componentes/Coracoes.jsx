import React from 'react'

export default function (props) {
  console.log(props)
  let fullStars = Math.floor(props.vote_average) / 2
  let emptyStars = 5 - fullStars;
  let stars = []

  for (let i = 0; i < fullStars; i++) {
    stars.push(<img key={i} src='/assets/favorite.png' alt='' />)
  }

  for (let j = 1; j <= emptyStars; j++) {
    stars.push(<img key={j} src={`/assets/favorite_${props.invert ? 'i' : ''}.png`} alt='' />)
  }

  return stars || ''
}
