// Copyright 2024 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { PanelPlugin, PanelProps } from '@perses-dev/plugin-system';
import { TimeSeriesTablePanel } from './TimeSeriesTablePanel';

type TimeSeriesTableOptions = Record<string, unknown>;

/**
 * The core TimeSeriesTable panel plugin for Perses.
 */
export const TimeSeriesTable: PanelPlugin<TimeSeriesTableOptions> = {
  PanelComponent: TimeSeriesTablePanel,
  supportedQueryTypes: ['TimeSeriesQuery'],
  queryOptions: {
    mode: 'instant',
  },
  createInitialOptions: () => {
    return {};
  },
};

export type TimeSeriesTableProps = PanelProps<TimeSeriesTableOptions>;
