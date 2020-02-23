// @flow
import type { User } from 'app/redux/user/flow';
import type { ExistingReview } from 'app/pages/movie/reviews/flow';

export const canWriteReview = (
  user: User,
  movieId: string,
  movieReviews: ExistingReview[],
) => {
  if (!user) {
    return false;
  }

  const { username, admin, pendingReviews } = user;

  const findMovieReview = reviews =>
    reviews.find(
      review => review.username === username && review.movieId === movieId,
    );

  if (admin) {
    return !findMovieReview(movieReviews);
  }

  return !findMovieReview(pendingReviews) && !findMovieReview(movieReviews);
};
