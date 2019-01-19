import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import NaoCurados from './Telas/NaoCurados'
import styled from 'styled-components'

const Navigation = styled.nav``

const OpenMenu = styled.ul`
  @media (min-width: 321px) {
    display: none;
  }
`

const Menu = styled.menu`
  & ul {
    padding: 20px;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    & li {
      line-height: 3;
      font-size: 1.5rem;
      color: #fff;
    }
  }
`

const Item = styled.li``

const Imagem = styled.img`
`

export default class AppRouter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openMenu: false
    }
  }

  toggleMenu = () => {
    this.setState({ openMenu: !this.state.openMenu }, () => {
      if (this.state.openMenu) {
        document.querySelector('html').classList.add('menu-active')
      } else {
        document.querySelector('html').classList.remove('menu-active')
      }
    })
  }

  render() {
    return <Router>
      <div className='gradiente'>
        <header>
          <Imagem onClick={this.toggleMenu} src='/assets/menu.png' />
        </header>

        <Menu>
          <ul hidden={!this.state.openMenu}>
            <Item>
              <Link to="/">Filmes não curados</Link>
            </Item>
            <Item>
              <Link to="/liked">Filmes curtidos</Link>
            </Item>
            <Item>
              <Link to="/desliked">Filmes não curtidos</Link>
            </Item>
          </ul>
        </Menu>

        <Route path="/" exact component={NaoCurados} />
      </div>
    </Router>
  }
}