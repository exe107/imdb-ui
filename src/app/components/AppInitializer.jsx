// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { asyncOperation } from 'app/common/util';
import { getInitializationData } from 'app/http';
import { getSpinner } from 'app/redux/spinner/selectors';
import { saveUser } from 'app/redux/user/actions';
import type { SaveUserAction, User } from 'app/redux/user/flow';

const SpinnerContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 7;
`;

const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

type InitializationData = {
  user: User,
};

type Props = {
  children: React.Node,
  spinner: boolean,
  saveUser: User => SaveUserAction,
};

const AppInitializer = ({ children, spinner, saveUser }: Props): React.Node => {
  const [fetchingFinished, setFetchingFinished] = React.useState(false);

  React.useEffect(() => {
    asyncOperation(() =>
      getInitializationData().then(({ user }: InitializationData) => {
        saveUser(user);
        setFetchingFinished(true);
      }),
    );
  }, [saveUser]);

  return (
    <React.Fragment>
      {spinner && (
        <SpinnerContainer>
          <Spinner className="spinner-border" />
        </SpinnerContainer>
      )}
      {fetchingFinished && children}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  spinner: getSpinner(state),
});

const mapDispatchToProps = {
  saveUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppInitializer);
