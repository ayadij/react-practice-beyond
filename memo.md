PlanTile tsx------------------------------------------------------------------------
import * as React from 'react';
import moment from 'moment';
import { ICONS } from '../../app/constants';
import Icon from '../../chrome/components/Icon';
import * as styles from '../styles/components/planTile.scss';

type HighlightPlan = {
  id: string;
  title: string;
};

type Props = {
  plan: any;
  purchasePlan: (plan) => void;
  className?: string;
  subscription?: any;
  currentPlan?: any;
  featured?: boolean;
  highlightPlan?: HighlightPlan;
  style: any;
};

class PlanTile extends React.Component<Props, {}> {
  state;
  render() {
    const plan = this.props.plan;
    const subscription = this.props.subscription;
    const currentPlan = this.props.currentPlan;
    const activePlan =
      currentPlan.title === plan.title ||
      (plan.title === 'Basic' && currentPlan.title === 'Legacy');
    const activeGradient = 'linear-gradient(115deg, #b6fc64, #8BC34A)';
    const highlightPlan =
      this.props.highlightPlan &&
      this.props.highlightPlan.title !== currentPlan.title &&
      this.props.highlightPlan.id === plan.id;
    const backgroundGradient = {
      backgroundImage: activePlan
        ? activeGradient
        : `linear-gradient(115deg, ${plan.backgroundStartColor}, ${
            plan.backgroundEndColor
          })`
    };
    const backgroundImage = {
      background: `url(${plan.backgroundImageUrl})`
    };
    const available =
      !currentPlan.title ||
      currentPlan.title === 'Legacy' ||
      !subscription ||
      (currentPlan.id && currentPlan.id <= plan.id);
    const canceled =
      activePlan &&
      subscription &&
      subscription.setToCancel &&
      `Set to cancel ${moment(subscription.currentPeriodEnd).format(
        'ddd MMM DD, YYYY HH:mm a'
      )}`;
    return (
      <div
        className={`${styles.planTile} ${highlightPlan &&
          styles.upsaleActive} ${this.props.className}`}
        id={`${plan.title.toLowerCase()}_heading`}
      >
        {highlightPlan && <div className={styles.highlight}>Suggested</div>}
        <div
          className={
            activePlan
              ? `${styles.tileBackground} ${styles.disabled}`
              : styles.tileBackground
          }
          style={plan.backgroundImageUrl ? backgroundImage : backgroundGradient}
        >
          <div className={styles.planTitle}>{plan.title}</div>
        </div>
        <div className={styles.planInformation}>
          <div className={styles.planPrice}>
            {plan.price.amount !== 0 && <span>$</span>}
            {plan.price.amount !== 0 ? plan.price.amount / 100 : 'free'}
            {plan.price.amount !== 0 && (
              <span style={{ fontSize: 36, position: 'relative', right: 6 }}>
                /m
              </span>
            )}
          </div>
          <div className={styles.features}>
            {plan.features.map((feature, index) => {
              return (
                <div key={index} className={styles.feature}>
                  {feature.title}
                </div>
              );
            })}
          </div>
        </div>
        {canceled ? (
          <div
            style={{
              zIndex: '1',
              color: 'red',
              width: '100%',
              bottom: '45px',
              textAlign: 'center',
              position: 'absolute'
            }}
          >
            {canceled}
          </div>
        ) : (
          activePlan &&
          plan.title !== 'Basic' && (
            <div
              style={{
                zIndex: '1',
                color: 'red',
                width: '100%',
                bottom: '45px',
                textAlign: 'center',
                position: 'absolute',
                cursor: 'pointer'
              }}
              onClick={() => this.props.purchasePlan(plan)}
            >
              cancel
            </div>
          )
        )}
        {available && (
          <div
            id={`add_${plan.title.toLowerCase()}_btn`}
            onClick={() => this.props.purchasePlan(plan)}
            className={
              activePlan
                ? `${styles.planAction} ${styles.disabled}`
                : styles.planAction
            }
            style={backgroundGradient}
          >
            {activePlan ? (
              <Icon
                className={styles.activeIcon}
                icon={ICONS.CHECKMARK}
                width={30}
                height={28}
                viewBox={'0 0 1024 1424'}
                color={'#FFFFFF'}
              />
            ) : (
              'Add Plan'
            )}
          </div>
        )}
      </div>
    );
  }
}

export default PlanTile;














FeatureItemRibbon tsx------------------------------------------------------------------------

import * as React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import FeatureItemTile from './FeatureItemTile';
import styles from '../styles/components/featureItemRibbon.scss';

type Props = {
  items: any;
  handleItemPurchase: () => void;
};

type State = Readonly<{
  someState: string;
}>;

class FeatureItemsRibbon extends React.Component<Props, State> {
  state = {
    someState: ''
  };

  handleChange = index => {
    this.setState({ someState: 'value' });
  };

  render() {
    const scrollBarOptions = {
      wheelSpeed: 3,
      swipeEasing: true,
      scrollingThreshold: 2000,
      scrollXMarginOffset: 100,
      maxScrollbarLength: 300,
      suppressScrollY: true
    };
    return (
      <div className={styles.itemRibbonContainer}>
        <PerfectScrollbar option={scrollBarOptions}>
          <div className={styles.itemRibbonInner}>
            {this.props.items.map(item => {
              return (
                <FeatureItemTile
                  key={item.itemCode}
                  item={item}
                  onClick={this.props.handleItemPurchase}
                />
              );
            })}
          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}

export default FeatureItemsRibbon;





















payment > EditCard.tsx------------------------------------------------------------------------

import * as React from 'react';
import _ from 'lodash';
import { Elements, CardElement, injectStripe } from 'react-stripe-elements';
import styles from '../../styles/addCard.scss';
import buttonStyles from '../../../chrome/styles/gradientButtons.scss';

type Props = {
  onSuccess?: any;
  onError?: any;
  submit?: boolean;
  onRef?: any;
  stripe?: any;
};

class _CardForm extends React.Component<Props, {}> {
  handleSubmit = ev => {
    if (ev) ev.preventDefault();
    this.props.stripe.createToken().then(data => {
      if (data.error) {
        const msg = _.get(
          data,
          'error.message',
          'There has been a payment error.'
        );
        this.props.onError(msg);
        return;
      }
      if (data.token) {
        this.props.onSuccess(data.token);
      }
    });
  };

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }
  componentWillUnmount() {
    if (this.props.onRef) {
      this.props.onRef(undefined);
    }
  }

  render() {
    return (
      <form id={'addCardForm'} onSubmit={this.handleSubmit}>
        <CardElement />
        {this.props.children}
        {!this.props.children &&
          this.props.submit && (
            <button
              type={'submit'}
              className={`${buttonStyles.gradientButton} ${buttonStyles.pink}`}
              style={{
                width: 125,
                height: 29,
                marginTop: '20px'
              }}
            >
              <span style={{ margin: '0 auto' }}>Add Card</span>
            </button>
          )}
      </form>
    );
  }
}

const CardForm = injectStripe(_CardForm);

class EditCard extends React.Component<Props, {}> {
  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }
  componentWillUnmount() {
    if (this.props.onRef) {
      this.props.onRef(undefined);
    }
  }

  handleSubmit() {
    this.child.handleSubmit();
  }

  render() {
    return (
      <div className={styles.walletContents}>
        <div id={styles.payment} className={styles.payment}>
          <Elements>
            <CardForm
              onRef={ref => (this.child = ref)}
              onSuccess={this.props.onSuccess}
              onError={this.props.onError}
              submit={this.props.submit}
            >
              {this.props.children}
            </CardForm>
          </Elements>
        </div>
      </div>
    );
  }
}

export default EditCard;

