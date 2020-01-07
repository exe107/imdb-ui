// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { asyncOperation } from 'app/common/util';
import { getInitializationData } from 'app/http';
import { getSpinner } from 'app/redux/spinner/selectors';
import { saveUser } from 'app/redux/user/actions';
import type { SaveUserAction, UserPersonalDetails } from 'app/redux/user/flow';

const Spinner = styled.div`
  position: absolute;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 7;
`;

type InitializationData = {
  user: UserPersonalDetails,
};

type Props = {
  children: React.Node,
  spinner: boolean,
  saveUser: UserPersonalDetails => SaveUserAction,
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
        <Spinner>
          <div className="spinner-border" />
        </Spinner>
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
