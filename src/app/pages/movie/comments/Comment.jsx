// @flow
import * as React from 'react';
import ReactHtmlParser from 'react-html-parser';
import styled from 'styled-components';
import moment from 'moment';
import { ClickableElement } from 'app/styles';
import type { ExistingComment } from 'app/pages/movie/comments/flow';

const CommentHeading = styled.div`
  background: sandybrown;
`;

type Props = {
  comment: ExistingComment,
  username: ?string,
  onDeleteComment: Function,
};

const Comment = ({ comment, username, onDeleteComment }: Props) => {
  const { username: commentUsername, comment: commentText, date } = comment;
  const isUserComment = username === commentUsername;
  const usernameLabel = isUserComment ? 'You' : commentUsername;
  const formattedDate = moment(date).format('DD MMMM YYYY HH:mm');

  return (
    <div className="mt-5 border border-info rounded">
      <CommentHeading className="d-flex justify-content-between align-items-center border-bottom border-info p-3">
        <span>
          <b>{usernameLabel}</b> wrote on {formattedDate}
        </span>
        {isUserComment && (
          <ClickableElement
            className="fa fa-times"
            data-toggle="tooltip"
            title="Delete comment"
            onClick={onDeleteComment}
          />
        )}
      </CommentHeading>
      <div className="p-3">{ReactHtmlParser(commentText)}</div>
    </div>
  );
};

export default Comment;
