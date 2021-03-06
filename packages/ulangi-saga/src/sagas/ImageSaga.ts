/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { assertExists } from '@ulangi/assert';
import { SQLiteDatabase } from '@ulangi/sqlite-adapter';
import { Action, ActionType, createAction } from '@ulangi/ulangi-action';
import {
  SearchPixabayImagesRequest,
  UploadPixabayImagesRequest,
} from '@ulangi/ulangi-common/interfaces';
import {
  SearchPixabayImagesResponseResolver,
  UploadPixabayImagesResponseResolver,
} from '@ulangi/ulangi-common/resolvers';
import { SessionModel } from '@ulangi/ulangi-local-database';
import axios from 'axios';
import { Task } from 'redux-saga';
import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { PromiseType } from 'utility-types';

import { errorConverter } from '../converters/ErrorConverter';
import { SagaEnv } from '../interfaces/SagaEnv';
import { createRequest } from '../utils/createRequest';
import { ProtectedSaga } from './ProtectedSaga';

export class ImageSaga extends ProtectedSaga {
  private uploadPixabayImagesResponseResolver = new UploadPixabayImagesResponseResolver();
  private searchPixabayImagesResponseResolver = new SearchPixabayImagesResponseResolver();
  private searchPixabayImagesTask?: Task;

  private sharedDb: SQLiteDatabase;
  private sessionModel: SessionModel;

  public constructor(sharedDb: SQLiteDatabase, sessionModel: SessionModel) {
    super();
    this.sharedDb = sharedDb;
    this.sessionModel = sessionModel;
  }

  public *run(env: SagaEnv): IterableIterator<any> {
    yield fork(
      [this, this.allowPrepareAndClearSearchPixabayImages],
      env.API_URL
    );
    yield fork([this, this.allowUploadPixabayImages], env.API_URL);
  }

  public *allowPrepareAndClearSearchPixabayImages(
    apiUrl: string
  ): IterableIterator<any> {
    this.searchPixabayImagesTask = yield fork(
      [this, this.allowPrepareSearchPixabayImages],
      apiUrl
    );
    yield fork([this, this.allowClearSearchPixabayImages], apiUrl);
  }

  private *allowClearSearchPixabayImages(
    apiUrl: string
  ): IterableIterator<any> {
    while (true) {
      yield take(ActionType.IMAGE__CLEAR_SEARCH);
      if (typeof this.searchPixabayImagesTask !== 'undefined') {
        yield cancel(this.searchPixabayImagesTask);
      }

      this.searchPixabayImagesTask = yield fork(
        [this, this.allowPrepareSearchPixabayImages],
        apiUrl
      );
    }
  }

  private *allowPrepareSearchPixabayImages(
    apiUrl: string
  ): IterableIterator<any> {
    try {
      const action: Action<
        ActionType.IMAGE__PREPARE_SEARCH_IMAGES
      > = yield take(ActionType.IMAGE__PREPARE_SEARCH_IMAGES);
      const { q, image_type, safesearch } = action.payload;

      yield put(createAction(ActionType.IMAGE__PREPARING_SEARCH_IMAGES, null));
      yield fork(
        [this, this.allowSearchPixabayImages],
        apiUrl,
        q,
        image_type,
        safesearch
      );
      yield put(
        createAction(ActionType.IMAGE__PREPARE_SEARCH_IMAGES_SUCCEEDED, null)
      );
    } catch (error) {
      yield put(
        createAction(ActionType.IMAGE__PREPARE_SEARCH_IMAGES_FAILED, {
          errorCode: errorConverter.getErrorCode(error),
          error,
        })
      );
    }
  }

  private *allowSearchPixabayImages(
    apiUrl: string,
    q: string,
    image_type: string,
    safesearch: boolean
  ): IterableIterator<any> {
    let page = 1;
    let noMore = false;
    while (noMore === false) {
      yield take(ActionType.IMAGE__SEARCH_IMAGES);
      try {
        yield put(createAction(ActionType.IMAGE__SEARCHING_IMAGES, null));

        const result: PromiseType<
          ReturnType<SessionModel['getAccessToken']>
        > = yield call([this.sessionModel, 'getAccessToken'], this.sharedDb);

        const accessToken = assertExists(result);

        const response = yield call(
          [axios, 'request'],
          createRequest<SearchPixabayImagesRequest>(
            'get',
            apiUrl,
            '/search-pixabay-images',
            {
              q,
              image_type,
              safesearch,
              page,
            },
            null,
            { accessToken }
          )
        );

        const { hits } = this.searchPixabayImagesResponseResolver.resolve(
          response.data,
          true
        );

        const noMore = hits.length === 0;
        page += 1;

        yield put(
          createAction(ActionType.IMAGE__SEARCH_IMAGES_SUCCEEDED, {
            images: hits.slice(),
            noMore,
          })
        );
      } catch (error) {
        yield put(
          createAction(ActionType.IMAGE__SEARCH_IMAGES_FAILED, {
            errorCode: errorConverter.getErrorCode(error),
            error,
          })
        );
      }
    }
  }

  private *allowUploadPixabayImages(apiUrl: string): IterableIterator<any> {
    while (true) {
      const action = yield take(ActionType.IMAGE__UPLOAD_IMAGES);
      try {
        yield put(createAction(ActionType.IMAGE__UPLOADING_IMAGES, null));

        const result: PromiseType<
          ReturnType<SessionModel['getAccessToken']>
        > = yield call([this.sessionModel, 'getAccessToken'], this.sharedDb);

        const accessToken = assertExists(result);

        const response = yield call(
          [axios, 'request'],
          createRequest<UploadPixabayImagesRequest>(
            'post',
            apiUrl,
            '/upload-pixabay-images',
            null,
            {
              images: action.payload.images,
            },
            { accessToken }
          )
        );

        const { urls } = this.uploadPixabayImagesResponseResolver.resolve(
          response.data,
          true
        );

        yield put(
          createAction(ActionType.IMAGE__UPLOAD_IMAGES_SUCCEEDED, {
            urls: urls.slice(),
          })
        );
      } catch (error) {
        yield put(
          createAction(ActionType.IMAGE__UPLOAD_IMAGES_FAILED, {
            errorCode: errorConverter.getErrorCode(error),
            error,
          })
        );
      }
    }
  }
}
