// Copyright 2023 The Perses Authors
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

import { Stack } from '@mui/material';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

export function GridToolbar() {
  return (
    <GridToolbarContainer>
      <Stack direction="row" width="100%" gap={4} m={2}>
        <Stack sx={{ flexShrink: 1 }} width="100%">
          <GridToolbarQuickFilter sx={{ width: '100%' }} />
        </Stack>
        <Stack direction="row" sx={{ flexShrink: 3 }} width="100%">
          <GridToolbarColumnsButton sx={{ width: '100%' }} />
          <GridToolbarFilterButton sx={{ width: '100%' }} />
        </Stack>
      </Stack>
    </GridToolbarContainer>
  );
}