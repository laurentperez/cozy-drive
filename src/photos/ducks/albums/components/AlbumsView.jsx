import React, { Component } from 'react'
import styles from '../../../styles/layout.styl'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { withRouter } from 'react-router'

import AlbumsToolbar from './AlbumsToolbar'
import AlbumsList from './AlbumsList'
import Loading from '../../../components/Loading'
import ErrorComponent from 'components/Error/ErrorComponent'
import Topbar from '../../../components/Topbar'

const Content = ({ list }) => {
  const { fetchStatus, lastFetch } = list
  if (!lastFetch && (fetchStatus === 'pending' || fetchStatus === 'loading')) {
    return <Loading loadingType="albums_fetching" />
  }
  if (fetchStatus === 'failed') {
    return <ErrorComponent errorType="albums" />
  }

  return <AlbumsList {...list} />
}

class AlbumsView extends Component {
  render() {
    const { t, router } = this.props
    if (this.props.children) return this.props.children
    if (!this.props.albums) {
      return null
    }
    return (
      <div
        data-testid="album-pho-content-wrapper"
        className={styles['pho-content-wrapper']}
      >
        <Topbar viewName="albums">
          <AlbumsToolbar t={t} router={router} />
        </Topbar>
        <Content list={this.props.albums} />
      </div>
    )
  }
}

export default translate()(withRouter(AlbumsView))
