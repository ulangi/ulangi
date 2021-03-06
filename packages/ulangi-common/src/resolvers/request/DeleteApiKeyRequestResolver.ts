/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import * as Joi from 'joi';

import { DeleteApiKeyRequest } from '../../interfaces/request/DeleteApiKeyRequest';
import { RequestResolver } from './RequestResolver';

export class DeleteApiKeyRequestResolver extends RequestResolver<
  DeleteApiKeyRequest
> {
  protected rules = {
    query: Joi.strip(),
    body: {
      apiKey: Joi.string(),
    },
  };
}
