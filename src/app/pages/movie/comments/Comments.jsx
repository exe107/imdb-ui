// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import _get from 'lodash/get';
import { asyncOperation } from 'app/redux/util';
import { addComment, deleteComment } from 'app/http';
import { addError } from 'app/redux/errors/actions';
import { PanelButton } from 'app/styled';
import Comment from 'app/pages/movie/comments/Comment';
import type { ExistingComment } from 'app/pages/movie/comments/flow';
import type { User, UserMovie } from 'app/redux/user/flow';
import type { AddErrorAction, ApiError } from 'app/redux/errors/flow';

const CommentEditor = styled(ReactQuill)`
  .ql-container {
    height: 150px;
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

  const onAddComment = React.useCallback(() => {
    const comment = {
      movie,
      comment: commentText,
    };

    asyncOperation(() =>
      addComment(comment)
        .then(newComment => {
          setComments([newComment, ...comments]);
          setCommentText('');
          toggleEditor();
        })
        .catch(addError),
    );
  }, [movie, commentText, comments, addError, toggleEditor]);

  const deleteCommentHandlerCreator = React.useCallback(
    (commentId: number) => () => {
      asyncOperation(() =>
        deleteComment(commentId)
          .then(() =>
            setComments(comments.filter(comment => comment.id !== commentId)),
          )
          .catch(addError),
      );
    },
    [comments, addError],
  );

  const iconClassName = expanded ? 'fa-minus' : 'fa-plus';

  return (
    <div className="pb-5 mt-5">
      {comments.length > 0 && (
        <React.Fragment>
          <h5>
            <CommentsPanelButton
              className="list-group-item list-group-item-action"
              data-toggle="collapse"
              data-target="#comments"
              onClick={onPanelClick}
            >
              <i className={`fa ${iconClassName} mr-2`} />
              <span>Comments</span>
              {comments.length > 0 && (
                <span className="ml-2">({comments.length})</span>
              )}
            </CommentsPanelButton>
          </h5>
          <div className="collapse" id="comments">
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
      {user &&
        (showEditor ? (
          <div>
            <CommentEditor
              className="mt-5"
              value={commentText}
              onChange={onEditorChange}
            />
            <div className="mt-3">
              <button className="btn btn-primary mr-3" onClick={onAddComment}>
                Add
              </button>
              <button className="btn btn-danger" onClick={toggleEditor}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button className="btn btn-primary mt-5" onClick={toggleEditor}>
            Write a comment
          </button>
        ))}
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
