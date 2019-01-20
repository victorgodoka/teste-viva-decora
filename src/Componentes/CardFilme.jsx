import React, { Component } from "react"
import styled from 'styled-components'
import moment from 'moment'
import Coracoes from './Coracoes'
import { API_KEY, MOVIE_DETAIL, BASE_IMG, GENRES } from '../api.config'
import Modal from "./Modal";

const Card = styled.div`
  background: ${props => `url(${BASE_IMG}${props.backdrop_path}) center center no-repeat`};
  background-size: cover;
  position: relative;
  flex-direction: row-reverse;
  margin-top: 50px;
  height: ${props => props.small ? '350px' : '460px'};
  width: ${props => props.small ? '294px' : '700px'};
  margin: 50px auto;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  color: #fff;
  line-height: 1.5;
  justify-content: flex-end;
  flex-direction: column;
  max-width: 100%;
  @media (max-width: 320px) {
    height: ${props => props.small ? '174px' : '350px'};
    width: ${props => props.small ? '145px' : '294px'};
  }
`

const Cover = styled.img`
  width: 150px;
  border-radius: 10px;
  z-index: 2;
`

const Lista = styled.ul`
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

const ModalWrapper = styled.ul`
  color: #727272;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 850px;
  padding: 35px;
  line-height: 2;
`

const Nome = styled.li`
  text-transform: uppercase;
  font-weight: 800;
  font-size: 1.15rem;
  width: 100%;
  @media (min-width: 321px) {
    width: ${props => props.small ? '100%' : '80%'};
    font-size: 1.855rem;
  }
`

const Dados = styled.p`
  font-size: 0.855rem;
  display: none;
  width: 100%;
  @media (min-width: 321px) {
    display: ${props => props.small ? 'none' : 'inline-block'};
    width: auto;
  }
`

const Notas = styled.li`
  & img {
    width: 16px
  }
  width: 100%;
  @media (min-width: 321px) {
    width: ${props => props.small ? '100%' : '20%'};
  }
`

const Contagem = styled.li`
  font-size: 0.855rem;
  display: none;
  width: 100%;
  @media (min-width: 321px) {
    width: ${props => props.small ? '100%' : 'auto'};
    display: inline-block;
  }
`

const Sinopse = styled.li`
  width: 100%;
  font-size: 0.855rem;
  display: none;
  @media (min-width: 321px) {
    display: inline;
  }
  width: 100%;
  @media (min-width: 321px) {
    width: auto;
  }
`

const VerModal = styled.a`
  color: #FF5656;
  text-decoration: underline;
`

export default class CardFilme extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
      modal: false
    }
  }

  abrirModal = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    document.querySelector('body').style.overflow = 'hidden'
    this.setState({ modal: true })
  }

  esconderModal = () => {
    document.querySelector('body').style.overflow = 'auto'
    this.setState({ modal: false })
  }

  componentWillReceiveProps = props => {
    this.setState({
      ...props
    }, () => {
      if (this.state.movie && this.props.id === this.state.movie.id) return
      this.callAPI()
    })
  }

  componentWillMount = () => {
    this.callAPI()
  }

  callAPI = () => {
    fetch(MOVIE_DETAIL.replace('{movie_id}', this.state.id).replace('{api_key}', API_KEY))
      .then(res => res.json())
      .then(json => this.setState({ movie: json }, () => {
        document.querySelector('body').style.backgroundImage = `url(${BASE_IMG}${this.state.movie.backdrop_path})`
        this.props.setLoading && this.props.setLoading(false)
      }))
  }

  render() {
    return <>
      <Card {...this.state.movie} small={this.props.small}>
        <div className='grey'></div>
        {this.state.movie && (<>
          <Lista>
            <Nome small={this.props.small}>{this.state.movie.title}</Nome>
            <Notas small={this.props.small}>
              <Coracoes {...this.state.movie} />
              <Contagem small={this.props.small}>({this.state.movie.vote_count} avaliações)</Contagem>
            </Notas>
            <Dados small={this.props.small}>{moment(this.state.movie.release_date).year()} • {GENRES(this.state.movie.genres)} • {moment().startOf('day').add(this.state.movie.runtime, 'minutes').format('h[H] mm[M]')}</Dados>
            <Sinopse><span>{this.state.movie.overview.substring(0, 100)}... </span><VerModal onClick={this.abrirModal}>Ver Sinopse</VerModal></Sinopse>
          </Lista>
        </>
        )}
      </Card>
      {this.state.movie && (
        <Modal isVisible={this.state.modal} esconderModal={this.esconderModal}>
          <ModalWrapper>
            <Cover src={`${BASE_IMG}${this.state.movie.poster_path}`} alt='' />
            <Nome>{this.state.movie.title}</Nome>
            <Notas>
              <Coracoes invert {...this.state.movie} />
              <Contagem>({this.state.movie.vote_count} avaliações)</Contagem>
            </Notas>
            <Dados>{moment(this.state.movie.release_date).year()} • {GENRES(this.state.movie.genres)} • {moment().startOf('day').add(this.state.movie.runtime, 'minutes').format('h[H] mm[M]')}</Dados>
            <br />
            <Sinopse>{this.state.movie.overview}</Sinopse>
          </ModalWrapper>
        </Modal>
      )}
    </>
  }
}
