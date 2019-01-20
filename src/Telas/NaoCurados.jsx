import React, { Component } from "react"
import styled from 'styled-components'
import Filme from '../Componentes/CardFilme'
import { API_KEY, POPULAR_MOVIES } from '../api.config'

const Main = styled.div`
  padding: 20px;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
`

const Ballon = styled.p`
  cursor: pointer;
  background-color: #fff;
  border-radius: 40px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 66px;
  text-transform: uppercase;
  font-weight: 800;
  color: #727272;
  &.like {
    color: #FF5656;
  }
  & span {
    display: none;
  }
  @media (min-width: 321px) {
    padding: 15px 30px;
    & span {
      display: inline;
      margin-left: 10px;
    }
  }
`

export default class NaoCurados extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paginaAtual: 1,
      results: []
    }
  }

  callAPI = () => {
    this.props.updateLoading(true)
    fetch(POPULAR_MOVIES.replace('{api_key}', API_KEY).replace('{page}', this.state.paginaAtual))
      .then(res => res.json())
      .then(json => this.setState({ results: json.results.map(mov => mov.id) }, () => this.props.updateLoading(false)))
  }

  componentWillMount = () => {
    this.callAPI()
  }

  likeDeslikePass = type => {
    this.props.updateLoading(true)
    if (!(type === 'pass')) {
      this.props.updateMovies(this.state.results[this.props.currentMovie], type, new Date())
    }
    let nextMovie = this.props.currentMovie + 1
    let nextPage = this.state.paginaAtual + 1
    let lastIndex = this.state.results.length - 1

    if (nextMovie >= lastIndex) {
      nextMovie = 0
      this.setState({
        paginaAtual: nextPage
      }, () => {
        this.callAPI()
      })
    }
  
    this.props.updateCurrentMovie(nextMovie)
    this.props.updateLoading(false)
  }

  render() {
    return <Main>
      {this.state.results.length > 0 && <Filme id={this.state.results[this.props.currentMovie]} setLoading={this.setLoading} />}
      <Wrapper>
        <Ballon onClick={() => this.likeDeslikePass('desliked')}><img alt='' src='/assets/n-curti.png' /> <span>Não curti!</span></Ballon>
        <Ballon onClick={() => this.likeDeslikePass('pass')}>pular</Ballon>
        <Ballon className={'like'} onClick={() => this.likeDeslikePass('liked')}><img alt='' src='/assets/curti.png' /> <span>Curti!</span></Ballon>
      </Wrapper>
    </Main>
  }
}