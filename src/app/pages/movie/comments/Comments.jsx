// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import _get from 'lodash/get';
import $ from 'jquery';
import { asyncOperation } from 'app/redux/util';
import { addComment, deleteComment } from 'app/http';
import { addError } from 'app/redux/errors/actions';
import { PanelButton } from 'app/styles';
import Comment from 'app/pages/movie/comments/Comment';
import type { ExistingComment } from 'app/pages/movie/comments/flow';
import type { User, UserMovie } from 'app/redux/user/flow';
import type { AddErrorAction, ApiError } from 'app/redux/errors/flow';

const CommentEditor = styled(ReactQuill)`
  width: 100%;

  .ql-container {
    height: 200px;
  }
`;

const CommentsPanelButton = styled(PanelButton)`
  max-width: 200px;
`;

type Props = {
  user: User,
  movie: UserMovie,
  comments: ExistingComment[],
  addError: ApiError => AddErrorAction,
};

const COMMENTS_NAME = 'comments';
const COMMENTS_ID = `#${COMMENTS_NAME}`;

const Comments = ({
  user,
  movie,
  comments: initialComments,
  addError,
}: Props) => {
  const [commentText, setCommentText] = React.useState('');
  const [comments, setComments] = React.useState(initialComments);
  const [expanded, setExpanded] = React.useState(false);
  const [showEditor, setShowEditor] = React.useState(false);

  React.useEffect(() => {
    if (expanded) {
      $(COMMENTS_ID).collapse('show');
    }
  }, [expanded]);

  const onPanelClick = React.useCallback(() => setExpanded(!expanded), [
    expanded,
  ]);

  const toggleEditor = React.useCallback(() => setShowEditor(!showEditor), [
    showEditor,
  ]);

  const onEditorChange = React.useCallback(
    content => setCommentText(content),
    [],
  );

  const onPostComment = React.useCallback(() => {
    if (!commentText) {
      return;
    }

    const comment = {
      movie,
      comment: commentText,
    };

    asyncOperation(() =>
      addComment(comment)
        .then(newComment => {
          setCommentText('');
          toggleEditor();
          setComments([newComment, ...comments]);

          if (!expanded) {
            setExpanded(true);
          }
        })
        .catch(addError),
    );
  }, [expanded, movie, commentText, comments, addError, toggleEditor]);

  const deleteCommentHandlerCreator = React.useCallback(
    (commentId: number) => () => {
      asyncOperation(() =>
        deleteComment(commentId)
          .then(() => {
            const newComments = comments.filter(
              comment => comment.id !== commentId,
            );

            setComments(newComments);

            if (newComments.length === 0) {
              setExpanded(false);
            }
          })
          .catch(addError),
      );
    },
    [comments, addError],
  );

  const iconClassName = expanded ? 'fa-minus' : 'fa-plus';
  const hasComments = comments.length > 0;

  return (
    <div>
      {hasComments && (
        <React.Fragment>
          <h5>
            <CommentsPanelButton
              className="list-group-item list-group-item-action bg-light"
              data-toggle="collapse"
              data-target={COMMENTS_ID}
              onClick={onPanelClick}
            >
              <i className={`fa ${iconClassName} mr-2`} />
              <span>Comments</span>
              {comments.length > 0 && (
                <span className="ml-2">({comments.length})</span>
              )}
            </CommentsPanelButton>
          </h5>
          <div className="collapse" id={COMMENTS_NAME}>
            {comments.map(comment => (
              <Comment
                key={comment.id}
                comment={comment}
                username={_get(user, 'username')}
                onDeleteComment={deleteCommentHandlerCreator(comment.id)}
              />
            ))}
          </div>
        </React.Fragment>
      )}
      {user && (
        <div className={hasComments ? 'mt-5' : 'mt-0'}>
          {showEditor ? (
            <React.Fragment>
              <CommentEditor value={commentText} onChange={onEditorChange} />
              <div className="mt-3">
                <button
                  className="btn btn-primary mr-3"
                  onClick={onPostComment}
                >
                  Post
                </button>
                <button className="btn btn-danger" onClick={toggleEditor}>
                  Cancel
                </button>
              </div>
            </React.Fragment>
          ) : (
            <button className="btn btn-primary" onClick={toggleEditor}>
              Write a comment
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  addError,
};

export default connect(
  null,
  mapDispatchToProps,
)(Comments);
