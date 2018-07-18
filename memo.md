// Projects > ProjectLine -----------------------------------------------------------------
import * as React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import { ICONS } from '../../app/constants.js';
import Icon from '../../chrome/components/Icon';
import ProjectLineSlider from './ProjectLineSlider';
import { SendDelay } from '../../orders/sendDelayOptions';
import {
  lineImageList,
  projectImageList,
  campaignImageList
} from '../projectHelpers';
import styles from '../styles/projectLine.scss';

type Props = {
  line: any;
  lines?: any;
  type?: any;
  total?: any;
  image?: any;
  active?: boolean;
  title?: string;
  editButtonLabel?: string;
  newLine?: boolean;
  sharing?: boolean;
  onAddCard?: any;
  onTileClick?: any;
  onEditClick?: any;
  onEditDate?: any;
  id?: string;
};

type State = Readonly<{
  slider: boolean;
  loading: boolean;
  images: any;
  frontImage: any;
}>;

class ProjectLine extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      slider: false,
      loading: true,
      images: image,
      frontImage: ''
    };
  }

  componentDidMount() {
    if (this.props.type === 'campaign') {
      this.createImageListForCampaigns();
    } else {
      this.createImageListForProjects();
    }
  }

  createImageListForProjects = () => {
    let images = [];
    if (this.props.lines) {
      images = projectImageList(this.props.lines);
    } else if (this.props.line) {
      images = lineImageList(this.props.line);
    }
    this.setState({
      images,
      frontImage: !this.props.newLine ? images[0] : null
    });
  };

  createImageListForCampaigns = () => {
    let images = [];
    if (this.props.lines) {
      images = campaignImageList(this.props.lines);
    } else {
      images = [{ image: this.props.image }];
    }
    this.setState({
      images,
      frontImage: !this.props.newLine ? images[0] : null
    });
  };

  handleEdit = event => {
    event.stopPropagation();
    this.props.onEditClick();
  };

  handleEditDate = event => {
    event.stopPropagation();
    this.props.onEditDate();
  };

  handleSlider = event => {
    event.stopPropagation();
    this.setState({ slider: !this.state.slider });
  };

  render() {
    const linesLength = this.props.lines && this.props.lines.length;
    return (
      <div
        className={styles.itemContainer}
        style={
          this.state.slider
            ? { transform: 'rotateY( 180deg)', transition: '100ms ease-out' }
            : {}
        }
        id={'add_card_to_projects'}
        onClick={
          this.props.newLine
            ? this.props.onAddCard
            : !this.state.slider
              ? this.props.onTileClick
              : () => {}
        }
      >
        {!this.state.slider &&
          !this.props.newLine && (
            <div>
              <div
                className={styles.itemView}
                style={
                  this.props.active
                    ? { boxShadow: '0 10px 20px 0 rgba(239,146,251,.3)' }
                    : {}
                }
              >
                <img
                  src={this.state.frontImage ? this.state.frontImage.image : ''}
                  style={{ display: 'none' }}
                  alt="Used for onLoad function"
                  onLoad={() => this.setState({ loading: false })}
                />
                <div
                  className={
                    this.state.frontImage && this.state.frontImage.isHorizontal
                      ? `${styles.card} ${styles.horizontal}`
                      : styles.card
                  }
                  style={{
                    backgroundImage: `url(${
                      this.state.frontImage ? this.state.frontImage.image : ''
                    })`
                  }}
                >
                  {this.props.line && (
                    <div className={styles.date} onClick={this.handleEditDate}>
                      {this.props.line.sendDelay.type === 'SPE' ? (
                        <div>
                          <div className={styles.day}>
                            {SendDelay.getDay(this.props.line.sendDelay)}
                          </div>
                          <div className={styles.month}>
                            {SendDelay.getMonthAbbr(this.props.line.sendDelay)}
                          </div>
                        </div>
                      ) : (
                        <div className={styles.calendar}>
                          <Icon
                            icon={ICONS.CALENDAR}
                            color={'#FFFFFF'}
                            viewBox={'0 0 32 32'}
                          />
                        </div>
                      )}
                      <div className={styles.editDate}>
                        <Icon icon={ICONS.EDIT} color={'#FFFFFF'} />
                      </div>
                    </div>
                  )}
                  <div className={styles.cardActions} />
                </div>
              </div>
              <section className={styles.itemDetails}>
                <div className={styles.category}>
                  {this.props.type === 'campaign' && !this.props.lines
                    ? 'Product'
                    : this.props.line
                      ? SendDelay.ribbonDescription(this.props.line.sendDelay)
                      : `${linesLength || 0} Touch${
                          linesLength > 1 ? 'es' : ''
                        }`}
                </div>
                <h1
                  className={styles.title}
                  style={
                    this.props.type === 'campaign'
                      ? { whiteSpace: 'normal' }
                      : {}
                  }
                >
                  {this.props.title}
                </h1>
                {this.props.total &&
                  this.props.type === 'campaign' && (
                    <h2 className={styles.subTitle}>
                      {`Price: $${this.props.total}`}
                    </h2>
                  )}
                {/* <h2 className={styles.subTitle}>  // Backend pricing changes needed for totals
                  {(this.props.total && this.props.type !== 'campaign')
                    ? `Price / contact: ${this.props.total}`
                    : (this.props.total)
                    ? `Price: $${this.props.total}`
                    : ''}
                </h2> */}
                {this.props.line && (
                  <div
                    className={styles.description}
                    style={{ display: 'none' }}
                  >
                    {this.props.line.giftVariation && (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h5 style={{ fontSize: 15, paddingRight: 15 }}>Gift</h5>
                        <span>{this.props.line.giftVariation.name}</span>
                        {/* {`${
                          this.props.line.giftVariation.price.description
                        } | ${
                          this.props.line.giftVariation.points.description
                        }`} */}
                      </div>
                    )}
                    {/* <div> // Backend pricing changes needed for totals
                      <h5>Card</h5>
                      {`${this.props.line.card.price.description} | ${
                        this.props.line.card.points.description
                      }`} */}
                  </div>
                )}
                <div className={styles.buttonContainer}>
                  <div
                    id={'view_items_btn'}
                    className={styles.button}
                    style={this.props.sharing ? { width: '100%' } : {}}
                    onClick={this.handleSlider}
                  >
                    View Items
                  </div>
                  <div
                    id={this.props.id ? this.props.id : 'open_campaign_btn'}
                    className={styles.button}
                    style={this.props.sharing ? { display: 'none' } : {}}
                    onClick={this.handleEdit}
                  >
                    {this.props.editButtonLabel}
                  </div>
                </div>
              </section>
            </div>
          )}
        {!this.props.newLine &&
          this.state.loading && (
            <CircularProgress
              className={styles.loader}
              style={{ zIndex: 1000 }}
            />
          )}
        {this.props.newLine && (
          <div className={styles.addIcon}>
            <Icon icon={ICONS.ADD} />
            <p>Add a Card</p>
          </div>
        )}
        {!this.props.newLine &&
        this.state.images &&
        this.state.images.length > 1 ? (
          <ProjectLineSlider
            images={this.state.images}
            style={
              this.state.slider
                ? {
                    display: 'block',
                    transform: 'rotateY(180deg)'
                  }
                : { display: 'none' }
            }
            onClose={this.handleSlider}
          />
        ) : (
          <div
            className={styles.card}
            style={
              this.state.slider
                ? this.state.frontImage.isHorizontal
                  ? {
                      backgroundImage: `url(${this.state.frontImage.image})`,
                      backgroundSize: 'contain',
                      transform: 'translateY(-50%) rotateY(180deg)',
                      display: 'flex',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backgroundRepeat: 'no-repeat',
                      borderRadius: 3,
                      top: '75%'
                    }
                  : {
                      backgroundImage: `url(${this.state.frontImage.image})`,
                      transform: 'rotateY(180deg)'
                    }
                : { display: 'none' }
            }
          >
            <span className={styles.closeItem} onClick={this.handleSlider}>
              <Icon icon={ICONS.CLOSE} color={'#AFAFAF'} />
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default ProjectLine;


















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
