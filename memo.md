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




VideoPlayer.tsx ------------------
import * as React from 'react';
import { Video } from '../types';
import Poster from './Poster';
import Player from './Player';
import Playlist from './Playlist';
import styles from '../styles/components/videoPlayer.scss';

type Props = {
  video: Video;
};

type State = Readonly<{
  stagedVideo?: any; //
  playerSrc?: string;
}>;

class VideoPlayer extends React.Component<Props, State> {
  state = {
    stagedVideo: undefined,
    playerSrc: ''
  };

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
      playerSrc: undefined
    });
  };

  componentWillMount() {
    if (this.props.video) {
      this.setState({
        stagedVideo: this.props.video[0]
      });
    }
  }

  render() {
    const imagePrefix = 'http://localhost:8001';
    return (
      <div className={styles.videoHeroWrapper}>
        <div className={styles.videoPlayerHeader}>
          {!this.state.playerSrc && (
            <Poster
              poster={`${imagePrefix}${this.state.stagedVideo.poster}`}
              actionTitle={this.props.video.actionTitle}
              onPlay={this.handleChangeVideo}
              playerSource={this.props.video.videoSrc}
            />
          )}
          {this.state.playerSrc && <Player src={this.state.playerSrc} />}
        </div>
        <Playlist videos={this.props.video} onPlay={this.handleStageVideo} />
      </div>
    );
  }
}

export default VideoPlayer;



















 Orders > ReturnAddress.tsx -----------------------------------------
import * as React from 'react';
import AddressForm from '../../contacts/components/AddressForm';
import Blinker from '../../chrome/components/Blinker';
import Button from '../../chrome/components/Button';
import tileStyles from '../../chrome/styles/detailView.scss';
import styles from '../styles/returnAddrForm.scss';

type tileStyles = {
  previewSections?: string;
  overviewCard?: string;
};

type Props = {
  onSave: (address: any) => void;
  blinker?: boolean;
  order?: any;
  toggleAddressBlinker?: any;
  tileStyles?: tileStyles;
};

type State = Readonly<{
  editing: boolean;
  address: any;
}>;

class ReturnAddress extends React.Component<Props, State> {
  address = {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    company: '',
    city: '',
    state: '',
    country: 'United States',
    postalCode: ''
  };

  state = {
    editing:
      !this.props.order.returnAddress ||
      !this.props.order.returnAddress.address1,
    address: this.props.order.returnAddress || this.address
  };

  handleContextChange = () => {
    this.setState({
      editing: !this.state.editing
    });
  };

  handleChange = event => {
    this.setState({
      address: {
        ...this.state.address,
        [event.target.name]: event.target.value
      }
    });
  };

  handleCountryChange = value => {
    this.setState({
      address: {
        ...this.state.address,
        country: value
      }
    });
  };

  handleSave = () => {
    this.props.onSave(this.state.address);
    this.setState({ editing: false });
  };

  render() {
    const address = this.state.address;
    return (
      <section
        className={`${tileStyles.previewSection} ${tileStyles.overviewCard}`}
        style={{ marginTop: 0, justifyContent: 'left' }}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <h6>Return Address</h6>
            {this.props.blinker && (
              <Blinker
                style={{ bottom: 7 }}
                messagePosition={{
                  position: 'absolute',
                  top: -95,
                  right: 85
                }}
                message={'Please make sure you have a return address'}
              />
            )}
            {!this.props.order.isSent && (
              <div className={styles.actions}>
                <Button
                  title={this.state.editing ? 'Cancel' : 'Edit'}
                  gradient={'pink'}
                  style={{ marginRight: 15 }}
                  onClick={this.handleContextChange}
                  id={'edit_or_cancel_return_address_btn'}
                />
              </div>
            )}
          </div>
          {this.state.editing ? (
            <AddressForm
              toggleAddressBlinker={this.props.toggleAddressBlinker}
              contact={address}
              onChange={this.handleChange}
              onCountryChange={this.handleCountryChange}
              shippingAddress={true}
              onSubmit={this.handleSave}
            />
          ) : (
            <div className={styles.addressPreview}>
              <span>
                {address.firstName} {address.lastName}
              </span>
              <span>{address.company}</span>
              <span>{address.address1}</span>
              <span>{address.address2}</span>
              <span>
                {address.city}, {address.state} {address.postalCode}
              </span>
              <span>{address.country}</span>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default ReturnAddress;

















Player.tsx -----------------------------------------------------
import * as React from 'react';
import { Video } from '../types';
import styles from '../styles/components/videoPlayer.scss';

type Props = {
  video: Video;
};

class Player extends React.Component<Props, {}> {
  render() {
    const { posterTitle, videoSrc } = this.props.video;
    return (
      <div className={styles.player}>
        <iframe
          title={posterTitle}
          src={videoSrc}
          width="620"
          height="349"
          allowFullScreen
        />
      </div>
    );
  }
}

export default Player;








LinkItem.tsx -----------------------------------------------------
import * as React from 'react';
import { SuggestedLink } from '../types';
import { ICONS } from '../../app/constants';
import Icon from '../../chrome/components/Icon';
import styles from '../styles/components/suggestedLinks.scss';

type Props = {
  linkItem: SuggestedLink;
};

class LinkItem extends React.Component<Props, {}> {
  render() {
    const { title, link_external, link_class, document } = this.props.linkItem;
    return (
      <div className={styles.linkItem}>
        <div className={styles.linkIcon}>
          <Icon
            icon={
              link_external
                ? ICONS.CAMPAIGN
                : link_class
                  ? ICONS.STAR
                  : document
                    ? ICONS.DOCUMENT
                    : ICONS.DOCUMENT
            }
          />
        </div>
        <div className={styles.linkTitle}>
          <a
            href={
              link_external
                ? link_external
                : link_class
                  ? link_class
                  : document
                    ? document
                    : ''
            }
          >
            {title}
          </a>
        </div>
      </div>
    );
  }
}

export default LinkItem;






FORM MODAL -----------------------------------------------------------------------
import * as React from 'react';
import Dialog from 'material-ui/Dialog';

import Button from '../../chrome/components/GradientButton';
import buttonStyles from '../../chrome/styles/gradientButtons.scss';
import styles from '../styles/createOrderModal.scss';

type Props = {
  open: boolean;
  close: any;
  onSubmit: any;
  title: string;
};

type State = Readonly<{
}>;

class FormModal extends React.Component<Props, State> {
  state = {
    ...initialState
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <Dialog
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.close}
        autoScrollBodyContent={true}
      >
        <div className={styles.delayForm}>
          <form onSubmit={this.props.onSubmit} className={styles.formContainer}>
            <div className={`${styles.flex} ${styles.modalHeader}`}>
              <h6>{this.props.title}</h6>
            </div>
            <div className={styles.formFields} style={{ padding: '20px 0' }}>
              {this.props.children}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                title="Cancel"
                onClick={this.props.close}
                style={{ marginRight: '15px' }}
              />
              <button
                type="submit"
                className={`${buttonStyles.gradientButton} ${
                  buttonStyles.pink
                }`}
                style={{
                  width: '125px',
                  height: '29px'
                }}
              >
                <span style={{ margin: '0 auto' }}>Submit</span>
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    );
  }
}

export default FormModal;




FORM MODAL tsx ============================================= errors
import * as React from 'react';
import Dialog from 'material-ui/Dialog';

import Button from '../../chrome/components/GradientButton';
import buttonStyles from '../../chrome/styles/gradientButtons.scss';
import styles from '../styles/createOrderModal.scss';

type Props = {
  open: boolean;
  close: any;
  onSubmit: any;
  title: string;
};

type State = Readonly<{}>;

class FormModal extends React.Component<Props, State> {
  state = {
    ...initialState
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <Dialog
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.close}
        autoScrollBodyContent={true}
      >
        <div className={styles.delayForm}>
          <form onSubmit={this.props.onSubmit} className={styles.formContainer}>
            <div className={`${styles.flex} ${styles.modalHeader}`}>
              <h6>{this.props.title}</h6>
            </div>
            <div className={styles.formFields} style={{ padding: '20px 0' }}>
              {this.props.children}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                title="Cancel"
                onClick={this.props.close}
                style={{ marginRight: '15px' }}
              />
              <button
                type="submit"
                className={`${buttonStyles.gradientButton} ${
                  buttonStyles.pink
                }`}
                style={{
                  width: '125px',
                  height: '29px'
                }}
              >
                <span style={{ margin: '0 auto' }}>Submit</span>
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    );
  }
}

export default FormModal;



ProjectDrawer====================================== TSX
import * as React from 'react';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';

import Icon from '../../chrome/components/Icon';
import { ICONS } from '../../app/constants';
import GradientButton from '../../chrome/components/GradientButton';
import { months, days } from '../../app/dates';
import {
  SendDelay,
  typeCode,
  updateDelay
} from '../../orders/sendDelayOptions';
import styles from '../styles/projectDetail.scss';
import { SelectField } from 'material-ui';
import { getPaperTypes } from '../../app/constants';

const paperTypes = {
  STD: 'Standard',
  PRE: 'Pearl',
  HVY: 'Satin'
};
const listStyle = {
  padding: '1px 0px',
  border: '1px solid #d5d5d5',
  borderLeft: 0,
  borderRight: 0,
  fontSize: 13,
  fontWeight: 'bold'
};
const listHeaderStyle = {
  fontSize: 16,
  fontFamily: '"Open Sans", sans-serif',
  color: '#757575',
  fontWeight: 500
};
const listItemStyle = active => {
  return {
    fontSize: 14,
    fontFamily: '"Open Sans", sans-serif',
    color: active ? '#f669b5' : '#757575',
    fontWeight: active ? 'bold' : 300
  };
};

type Props = {
  chooseDate: boolean;
  line: any; //object
  projectId: string;
  onAddGift: any;
  onClose: any;
  onRemoveLine: any;
  onRemoveGift: any;
  onUpdateDate: any;
  onUpdateLine: any;
  onUpdatePaperType: any;
  onUpdateSendDelay: any;
  openSendDelayModal: any; //
};

type State = Readonly<{
  paper: boolean;
  gift: boolean;
  delayMonth: any;
  delayDay: any;
  sendDelay: boolean; //
  card: any; //
}>;

class ProjectDrawer extends React.Component<Props, State> {
  state = {
    paper: false,
    gift: true,
    delayMonth: undefined,
    delayDay: undefined,
    sendDelay: false, //true
    card: undefined //
  };

  componentWillMount() {
    const { month, day } = SendDelay.monthDayDefaults(
      this.props.line.sendDelay
    );
  }
  componentDidMount() {
    this.setState({ sendDelay: this.props.chooseDate });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ sendDelay: nextProps.chooseDate });
    if (this.props.line.sendDelay.type !== nextProps.line.sendDelay.type) {
      const { month, day } = SendDelay.monthDayDefaults(
        nextProps.line.sendDelay
      );
      this.setState({ delayMonth: month, delayDay: day });
    }
  }

  handleDateSelect = (name, event, index, value) => {
    this.setState({
      [name]: value
    });
  };

  toggleSection = type => {
    this.setState({
      [type]: !this.state[type]
    });
  };

  render() {
    const line = this.props.line;
    return (
      <Drawer
        open={true}
        className={styles.projectDrawer}
        containerClassName={styles.drawerInner}
      >
        <div className={styles.drawerContents}>
          <div className={styles.drawerHeader}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h1 className={styles.title}>
                Card:{' '}
                {line.card.sendableCard
                  ? line.card.sendableCard.title
                  : 'Custom Card'}
              </h1>
              <span onClick={this.props.onClose} style={{ paddingRight: 15 }}>
                <Icon icon={ICONS.CLOSE} color={'#AFAFAF'} size={18} />
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                className={styles.cardThumbnail}
                style={{
                  backgroundImage: `url(${line.card.frontPreviewUrl})`,
                  width: line.card.isHorizontal ? 70 : 50,
                  height: line.card.isHorizontal ? 50 : 70
                }}
              />
              <span
                onClick={() => this.props.onUpdateLine('edit', line.card.id)}
                style={{ paddingRight: 15 }}
              >
                <Icon icon={ICONS.EDIT} color={'#ff5689'} size={18} />
                <span style={{ marginLeft: 5 }}>Edit Card</span>
              </span>
            </div>
          </div>
          <div className={styles.details}>
            <h1 className={styles.subTitle}>
              <span onClick={() => this.toggleSection('sendDelay')}>
                <Icon
                  icon={ICONS.CALENDAR}
                  color={'#AFAFAF'}
                  size={18}
                  viewBox={'0 0 32 32'}
                />
              </span>
              {SendDelay.shortDescription(line.sendDelay)}
            </h1>
            {line.giftVariation && (
              <h1 className={styles.subTitle}>
                <span onClick={() => this.toggleSection('gift')}>
                  <Icon icon={ICONS.BAG} color={'#AFAFAF'} size={18} />
                </span>
                Gift: {line.giftVariation.price.description}
              </h1>
            )}
            <h1 className={styles.subTitle}>
              <span onClick={() => this.toggleSection('paper')}>
                <Icon icon={ICONS.FLATCARD} color={'#AFAFAF'} size={18} />
              </span>
              Card Type:&nbsp;<span style={{ fontWeight: 'bold' }}>
                {line.card.type}
              </span>
            </h1>
            <h1 className={styles.subTitle} style={{ marginLeft: 25 }}>
              Paper Type:&nbsp;<span style={{ fontWeight: 'bold' }}>
                {paperTypes[line.card.paperType]}
              </span>
            </h1>
          </div>
          <List style={listStyle}>
            <ListItem
              primaryText={
                <div style={{ display: 'flex' }}>
                  <div>Send Delay</div>
                  <div className={styles.sendDelayInfo}>
                    <Icon icon={ICONS.INFO} size={15} color={'#afafaf'} />
                    <span className={styles.sendDelayTooltip}>
                      <p>
                        Cards with an anniversary or birthday delay are
                        scheduled to print and send 7 days before the scheduled
                        date.
                      </p>
                    </span>
                  </div>
                </div>
              }
              open={this.state.sendDelay}
              onNestedListToggle={() => this.toggleSection('sendDelay')}
              primaryTogglesNestedList={true}
              innerDivStyle={listHeaderStyle}
              nestedItems={[
                <ListItem
                  key={1}
                  primaryText="Arrive on Birthday"
                  onClick={() =>
                    this.props.onUpdateSendDelay(
                      updateDelay(typeCode.BIR),
                      typeCode.BIR
                    )
                  }
                  innerDivStyle={listItemStyle(
                    line.sendDelay.type === typeCode.BIR
                  )}
                />,
                <ListItem
                  key={2}
                  primaryText="Arrive on Anniversary"
                  onClick={() =>
                    this.props.onUpdateSendDelay(
                      updateDelay(typeCode.ANN),
                      typeCode.ANN
                    )
                  }
                  innerDivStyle={listItemStyle(
                    line.sendDelay.type === typeCode.ANN
                  )}
                />,
                <ListItem
                  key={3}
                  primaryText="Send Immediately"
                  onClick={() =>
                    this.props.onUpdateSendDelay(
                      updateDelay(typeCode.IMM),
                      typeCode.IMM
                    )
                  }
                  innerDivStyle={listItemStyle(
                    line.sendDelay.type === typeCode.IMM &&
                      line.sendDelay.delayNumber === 0
                  )}
                />,
                <ListItem
                  key={4}
                  primaryText={
                    <div style={{ display: 'flex' }}>
                      <div>
                        {line.sendDelay.type === typeCode.SPE
                          ? `Specific Date: ${SendDelay.ribbonDescription(
                              line.sendDelay
                            )}`
                          : 'Send on Specific Date'}
                      </div>
                      <div className={styles.sendDelayInfo}>
                        <Icon icon={ICONS.INFO} size={15} color={'#afafaf'} />
                        <span
                          className={styles.sendDelayTooltip}
                          style={{
                            right: '-100px',
                            color: 'rgb(117, 117, 117)'
                          }}
                        >
                          <p>
                            Reminder: If the date you choose has already passed,
                            the card(s) will send on that date next year.
                          </p>
                        </span>
                      </div>
                    </div>
                  }
                  primaryTogglesNestedList={true}
                  innerDivStyle={listItemStyle(
                    line.sendDelay.type === typeCode.SPE
                  )}
                  nestedItems={[
                    <ListItem key={1}>
                      <SelectField
                        required
                        floatingLabelText="Month"
                        fullWidth={true}
                        value={this.state.delayMonth}
                        onChange={this.handleDateSelect.bind(
                          null,
                          'delayMonth'
                        )}
                        name="month"
                        maxHeight={200}
                        labelStyle={{ fontWeight: 400 }}
                        floatingLabelStyle={{ fontWeight: 400 }}
                        style={{ width: '50%' }}
                      >
                        {months &&
                          months.map((month, index) => {
                            return (
                              <MenuItem
                                key={index}
                                value={month === null ? null : index}
                                primaryText={month}
                              />
                            );
                          })}
                      </SelectField>
                      <SelectField
                        required
                        floatingLabelText="Day"
                        fullWidth={true}
                        value={this.state.delayDay}
                        onChange={this.handleDateSelect.bind(null, 'delayDay')}
                        name="day"
                        maxHeight={200}
                        labelStyle={{ fontWeight: 400 }}
                        floatingLabelStyle={{ fontWeight: 400 }}
                        style={{ width: '30%', marginLeft: 10 }}
                      >
                        {days &&
                          days.map((day, index) => {
                            return (
                              <MenuItem
                                key={index}
                                value={day === null ? null : index}
                                primaryText={day}
                              />
                            );
                          })}
                      </SelectField>
                      <GradientButton
                        title="Submit"
                        onClick={() =>
                          this.props.onUpdateDate(
                            this.state.delayMonth,
                            this.state.delayDay
                          )
                        }
                        style={{ width: 70 }}
                      />
                    </ListItem>
                  ]}
                />,
                <ListItem
                  key={5}
                  primaryText="Advanced Options"
                  onClick={this.props.openSendDelayModal}
                  innerDivStyle={listItemStyle(
                    line.sendDelay.type === typeCode.IMM &&
                      line.sendDelay.delayNumber > 0
                  )}
                />
              ]}
            />
          </List>
          <List style={listStyle}>
            <ListItem
              primaryText={'Paper Options'}
              primaryTogglesNestedList={true}
              open={this.state.card}
              onNestedListToggle={() => this.toggleSection('paper')}
              innerDivStyle={listHeaderStyle}
              nestedItems={[
                <ListItem
                  key={1}
                  primaryTogglesNestedList={true}
                  primaryText={
                    <div>
                      Paper Type:&nbsp;
                      <span style={{ fontWeight: 'bold' }}>
                        {paperTypes[line.card.paperType]}
                      </span>
                    </div>
                  }
                  innerDivStyle={listItemStyle(false)}
                  nestedItems={getPaperTypes(line.card.type).map(
                    (type, index) => {
                      return (
                        <ListItem
                          key={index}
                          primaryText={type.label}
                          onClick={() =>
                            this.props.onUpdatePaperType(type.value)
                          }
                          innerDivStyle={listItemStyle(
                            line.card.paperType === type.value
                          )}
                        />
                      );
                    }
                  )}
                />
              ]}
            />
          </List>
          {line.card &&
            line.card.type !== 'POSTCARD' && (
              <List style={listStyle}>
                <ListItem
                  primaryText={'Gift'}
                  initiallyOpen={true}
                  open={this.state.gift}
                  onNestedListToggle={() => this.toggleSection('gift')}
                  primaryTogglesNestedList={true}
                  innerDivStyle={listHeaderStyle}
                  nestedItems={[
                    <ListItem key={1}>
                      <div className={styles.gift}>
                        {line.giftVariation ? (
                          <div>
                            <div
                              className={styles.giftImage}
                              style={{
                                backgroundImage: `url(${
                                  line.giftVariation.defaultImageUrl
                                }`
                              }}
                            />
                            <div className={styles.giftDescription}>
                              <div className={styles.giftTitle}>
                                <h5>{line.giftVariation.name}</h5>
                              </div>
                              <div className={styles.giftPrice}>
                                <h5>{line.giftVariation.price.description}</h5>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className={styles.addGift}>
                            <h2 style={{ marginBottom: '12px' }}>
                              Add a gift?
                            </h2>
                            <GradientButton
                              title="Yes Please"
                              style={{ margin: 'auto' }}
                              onClick={this.props.onAddGift}
                            />
                          </div>
                        )}
                      </div>
                    </ListItem>,
                    <ListItem
                      key={2}
                      primaryText={
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Icon
                            icon={ICONS.TRASH}
                            color={'#afafaf'}
                            size={20}
                          />
                          Remove Gift
                        </div>
                      }
                      style={!line.giftVariation ? { display: 'none' } : {}}
                      onClick={this.props.onRemoveGift}
                    />
                  ]}
                />
              </List>
            )}
        </div>
        <div className={styles.drawerActions}>
          <div className={styles.actionButtons}>
            <GradientButton
              title={'Replace Card'}
              gradient={'pink'}
              style={{ width: 150, marginRight: '15px' }}
              onClick={() => this.props.onUpdateLine('replace')}
            />
            <GradientButton
              title={'Delete Card'}
              style={{ width: 150 }}
              onClick={() => this.props.onRemoveLine(line)}
            />
          </div>
        </div>
      </Drawer>
    );
  }
}

export default ProjectDrawer;

