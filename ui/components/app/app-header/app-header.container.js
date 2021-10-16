import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import * as actions from '../../../store/actions';
import { getMetaMaskAccountsOrdered } from '../../../selectors/selectors';
import AppHeader from './app-header.component';

const mapStateToProps = (state) => {
  const { appState, metamask } = state;
  const { networkDropdownOpen } = appState;
  const { selectedAddress, isUnlocked, isAccountMenuOpen } = metamask;
  const accounts = getMetaMaskAccountsOrdered(state);

  let avatarIndex = 1;
  for (const account of accounts) {
    if (account.address === selectedAddress) {
      break;
    } else {
      avatarIndex = avatarIndex + 1 > 10 ? 1 : avatarIndex + 1;
    }
  }

  const avatar = `images/avatars/(${avatarIndex}).png`;

  return {
    avatar,
    networkDropdownOpen,
    selectedAddress,
    isUnlocked,
    isAccountMenuOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showNetworkDropdown: () => dispatch(actions.showNetworkDropdown()),
    hideNetworkDropdown: () => dispatch(actions.hideNetworkDropdown()),
    toggleAccountMenu: () => dispatch(actions.toggleAccountMenu()),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(AppHeader);
