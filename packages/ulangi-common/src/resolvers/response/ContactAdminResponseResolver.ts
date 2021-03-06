/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { AbstractResolver } from '@ulangi/resolver';
import * as Joi from 'joi';

import { ContactAdminResponse } from '../../interfaces/response/ContactAdminResponse';

export class ContactAdminResponseResolver extends AbstractResolver<
  ContactAdminResponse
> {
  protected rules = {
    success: Joi.any().valid(true),
  };
}
