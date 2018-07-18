
// Orders > CardPanelView --------------------------------------
import * as React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import { cardPreviewConfig } from '../../chrome/components/previews/lib/cardPreviewConfig';
import PanoramaSlide from '../../chrome/components/previews/PanoramaSlide';
import styles from '../styles/cardPanelView.scss';

type Props = {
  card: any;
  imageHeight?: string;
  imageWidth?: string;
  imageClass?: string;
  useContainerBorder?: any;
  sliderMaxContainerHeight?: any;
};

type State = Readonly<{
  fixedIndex: number;
  loaded: any;
  cardConfig: any;
}>;

class CardPanelView extends React.Component<Props, State> {
  state = {
    fixedIndex: 0,
    loaded: {},
    cardConfig: cardPreviewConfig(props.card)
  };

  onLoad = panelName => {
    this.setState({
      loaded: {
        [panelName]: true,
        ...this.state.loaded
      }
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.card !== prevState.card) {
      return { cardConfig: cardPreviewConfig(nextProps.card) };
    }
    return null;
  }

  render() {
    const { card, useContainerBorder, sliderMaxContainerHeight } = this.props;
    const maxHeight = window.innerHeight <= 850 ? 576 : 700;
    return (
      <div
        style={{ width: '100%', maxHeight, overflow: 'hidden' }}
        ref={el => (this.containerRef = el)}
      >
        {this.state.cardConfig && (
          <PanoramaSlide
            sliderId={card.id}
            config={this.state.cardConfig}
            marginSize={25}
            containerRef={this.containerRef}
            vertical={card.isHorizontal}
            verticalMaxContainerHeight={sliderMaxContainerHeight || 500}
            useContainerBorder={useContainerBorder}
          >
            {this.state.cardConfig.map((panel, i) => (
              <div key={i}>
                <img
                  src={panel.previewUrl}
                  onLoad={() => this.onLoad(panel.name + card.id)}
                  onError={() => this.onLoad(panel.name + card.id)}
                  alt={panel.name}
                  className={`${styles.cardShadow}`}
                  style={
                    this.state.loaded[panel.name + card.id]
                      ? { width: panel.width, height: panel.height }
                      : { display: 'none' }
                  }
                />
                {this.state.loaded[panel.name + card.id] !== true && (
                  <div
                    className={styles.cardShadow}
                    style={{
                      width: panel.width,
                      height: panel.height,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
              </div>
            ))}
          </PanoramaSlide>
        )}
      </div>
    );
  }
}

export default CardPanelView;




------------------

import React from 'react';
import PropTypes from 'prop-types';
import Poster from '../components/Poster';
import Player from '../components/Player';
import VideoRibbon from '../components/VideoRibbon';
import styles from '../styles/components/videoPlayer.scss';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stagedVideo: null,
      playerSrc: ''
    };
  }

  handleChangeVideo = source => {
    console.log(source);
    this.setState({
      playerSrc: source
    });
  };

  handleStageVideo = video => {
    console.log(video);
    this.setState({
      stagedVideo: video,
      playerSrc: null
    });
  };

  componentWillMount() {
    if (this.props.videos) {
      this.setState({
        stagedVideo: this.props.videos[0]
      });
    }
  }

  render() {
    return (
      <div className={styles.videoHeroWrapper}>
        <div className={styles.videoPlayerHeader}>
          {!this.state.playerSrc && (
            <Poster
              poster={this.state.stagedVideo.poster}
              copy={this.state.stagedVideo.copy}
              actionTitle={this.state.stagedVideo.actionTitle}
              onPlay={this.handleChangeVideo}
              playerSource={this.state.stagedVideo.src}
            />
          )}
          {this.state.playerSrc && <Player src={this.state.playerSrc} />}
        </div>
        <VideoRibbon
          videos={this.props.videos}
          onPlay={this.handleStageVideo}
        />
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  title: PropTypes.string,
  video: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    posterContent: PropTypes.string.isRequired,
    actionTitle: PropTypes.string.isRequired
  })
};

export default VideoPlayer;
