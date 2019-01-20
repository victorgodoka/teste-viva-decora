import * as React from 'react'
import styled from 'styled-components'

const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  display: flex;
  min-height: 100vh;
  left: 0;
  position: absolute;
  top: 0;
  width: 100vw;
  z-index: 99;
  overflow: auto;
  padding: 20px;
  @media (min-width: 321px) {
    align-items: center;
    justify-content: center; 
    overflow: auto;
    height: 100%;
    padding-top: 120px;
  }
`

const Conteudo = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  background: url('/assets/bg.png') left top repeat-x #fff;
`

const Fechar = styled.span`
  position: absolute;
  z-index: 5;
  right: 8px;
  top: 8px;
  padding: 5px 12px;
  cursor: pointer;
  font-size: 2rem;
  background: #fff;
  border-radius: 50%;
  @media (min-width: 866px) {
    padding: 20px 30px;
    font-size: 3rem;
    right: -25px;
    top: -25px;
  }
`

export default class ModalHolder extends React.Component {
  esconderModal(e) {
    if (e.target.className.indexOf('modal') > -1) {
      document.querySelector('body').style.overflow = 'auto'
      this.props.esconderModal()
    }
  }

  render() {
    return (
      <Modal className={'modal'}
        style={{ display: this.props.isVisible ? 'flex' : 'none', ...this.props.style }}
        onClick={this.esconderModal.bind(this)}>
        <Conteudo>
          <Fechar onClick={this.props.esconderModal}>×</Fechar>
          {this.props.children}
        </Conteudo>
      </Modal>
    )
  }
}
