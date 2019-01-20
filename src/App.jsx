import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import ListaDeFilmes from './Telas/ListaDeFilmes'
import NaoCurados from './Telas/NaoCurados'
import styled from 'styled-components'
import Loading from "./Componentes/Loading";

const Navigation = props => <ul>
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

const OpenMenu = styled.ul`
  @media (min-width: 321px) {
    display: none;
  }
`

const MobileMenu = styled.menu`
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

const Menu = styled.menu`
  margin-top: 50px;
  @media (max-width: 320px) {
    display: none;
  }
  & ul {
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    & li {
      line-height: 1.2;
      font-size: 1.2rem;
      color: #fff;
    }
  }
`

const Item = styled.li``

const MenuIcon = styled.img`
  @media (min-width: 321px) {
    display: none;
  }
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.img`
  position: absolute;
  top: -4px;
  left: calc(50% - 78px);
`

export default class AppRouter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openMenu: false,
      liked: [],
      desliked: [],
      loading: false,
      currentMovie: 0
    }
  }

  NaoCuradosRender = ({ match, history }) => {
    return <NaoCurados updateLoading={this.updateLoading} updateCurrentMovie={this.updateCurrentMovie} currentMovie={this.state.currentMovie} updateMovies={this.updateMovies} history={history} />
  }

  ListaFilmesRender = ({ match, history }, type) => {
    return <ListaDeFilmes updateLoading={this.updateLoading} movies={this.state[type]} type={type} history={history} />
  }

  updateCurrentMovie = currentMovie => {
    this.setState({ currentMovie })
  }

  updateLoading = loading => {
    this.setState({ loading })
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

  updateMovies = (movies, type, timestamp) => {
    let array = this.state[type]
    let mov = {
      id: movies,
      timestamp
    }
    array.push(mov)
    this.setState({
      [type]: array
    })
  }

  render() {
    return <Router>
    <div className='filter'>
      <Loading loading={this.state.loading} />
        <div className='gradiente'>
          <Header>
            <MenuIcon alt='' onClick={this.toggleMenu} src='/assets/menu.png' />
            <Logo alt='' src='/assets/logo-viva-decora.png' />
          </Header>

          <MobileMenu className={'menu'}>
            <Navigation />
          </MobileMenu>

          <Menu>
            <Navigation />
          </Menu>

          <Route path="/" exact component={this.NaoCuradosRender} />
          <Route path="/liked" exact component={props => this.ListaFilmesRender(props, 'liked')} />
          <Route path="/desliked" exact component={props => this.ListaFilmesRender(props, 'desliked')} />
        </div>
      </div>
    </Router>
  }
}