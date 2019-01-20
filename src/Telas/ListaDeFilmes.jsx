import React, { Component } from 'react'
import styled from 'styled-components'
import Filme from '../Componentes/CardFilme'

const Main = styled.div`
  background: #F4F4F4;
  margin-top: 40px;
  min-height: calc(100vh - 133px);
`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 1024px;
`

const NoMovie = styled.div`
  margin: 50px auto;
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: 800;
  color: #727272;
`

export default class NaoCurados extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  componentWillReceiveProps = props => {
    this.setState({
      ...props
    })
  }

  order = (a, b) => {
    if (a.timestamp > b.timestamp) return -1
    if (a.timestamp < b.timestamp) return 1
    return 0
  }

  render() {
    return <Main>
      <Wrapper>
        {this.props.movies.length > 0
          ? this.props.movies.sort(this.order).map((movie, i) => <Filme small id={movie.id} key={i} />)
          : <NoMovie>
              <img src='/assets/video-camera-vazio.png' alt='' />
              <p>nenhum filme</p>
          </NoMovie>
        }
      </Wrapper>
    </Main>
  }
}