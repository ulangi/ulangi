/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { AbstractResolver } from '@ulangi/resolver';
import * as Joi from 'joi';
import * as _ from 'lodash';

import { FieldState } from '../enums/FieldState';
import { DirtyUserFieldRow } from '../interfaces/DirtyUserFieldRow';

export class DirtyUserFieldRowResolver extends AbstractResolver<
  DirtyUserFieldRow
> {
  protected rules = {
    userId: Joi.string(),
    fieldName: Joi.string(),
    createdAt: Joi.number(),
    updatedAt: Joi.number(),
    fieldState: Joi.string().valid(_.values(FieldState)),
  };
}
