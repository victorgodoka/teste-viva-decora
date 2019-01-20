import * as React from 'react'
import styled from 'styled-components'

const Loader = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 999999;

  & .loader_gif {
    width: 50px;
  }

  &.hide {
    display: none !important;
  }

  &::before {
    background-color: rgba(255, 255, 255, 0.502);
    content: '';
    display: block;
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
  }

`

export default function (propriedades) {
  return (
    <Loader className={`loader ${propriedades.loading ? '' : 'hide'}`}>
      <img className='loader_gif' src='/assets/loader.gif' />
    </Loader>
  )
}
