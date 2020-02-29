// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getInitializationData } from 'app/http';
import { asyncOperation } from 'app/redux/util';
import { getSpinner } from 'app/redux/spinner/selectors';
import { saveInitializationDataAction } from 'app/redux/actions';
import type {
  InitializationData,
  InitializationDataAction,
} from 'app/redux/flow';

const SpinnerContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 7;
`;

const Spinner = styled.div`
  height: 50px;
  width: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
`;

type Props = {
  children: React.Node,
  spinner: boolean,
  saveInitializationData: InitializationData => InitializationDataAction,
};

const AppInitializer = ({
  children,
  spinner,
  saveInitializationData,
}: Props): React.Node => {
  const [fetchingFinished, setFetchingFinished] = React.useState(false);

  React.useEffect(() => {
    asyncOperation(() =>
      getInitializationData()
        .then(saveInitializationData)
        .then(() => setFetchingFinished(true)),
    );
  }, [saveInitializationData]);

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
  saveInitializationData: saveInitializationDataAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppInitializer);
