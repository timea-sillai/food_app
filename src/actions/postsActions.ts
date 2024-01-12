import {
  FetchPostsFailure,
  FetchPostsFailurePayload,
  FetchPostsRequest,
  FetchPostsSuccess,
  FetchPostsSuccessPayload,
} from "../types/types";
import { postTypes } from "./ActionTypes";

export const fetchPostsRequest = (): FetchPostsRequest => ({
  type: postTypes.FETCH_POST_REQUEST,
});

export const fetchPostsSuccess = (
  payload: FetchPostsSuccessPayload
): FetchPostsSuccess => ({
  type: postTypes.FETCH_POST_SUCCESS,
  payload,
});

export const fetchPostsFailure = (
  payload: FetchPostsFailurePayload
): FetchPostsFailure => ({
  type: postTypes.FETCH_POST_FAILURE,
  payload,
});
