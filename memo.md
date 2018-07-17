
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
