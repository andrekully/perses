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

import { usePlugin, PanelProps } from '@perses-dev/plugin-system';
import { Skeleton } from '@mui/material';
import { UnknownSpec, PanelDefinition } from '@perses-dev/core';
import { ReactElement } from 'react';

export interface PanelContentProps extends PanelProps<UnknownSpec> {
  panelPluginKind: string;
  definition?: PanelDefinition<UnknownSpec>;
}

/**
 * A small wrapper component that renders the appropriate PanelComponent from a Panel plugin based on the panel
 * definition's kind. Used so that an ErrorBoundary can be wrapped around this.
 */
export function PanelContent(props: PanelContentProps): ReactElement {
  const { panelPluginKind, contentDimensions, definition, ...others } = props;
  const { data: plugin, isLoading } = usePlugin('Panel', panelPluginKind, { throwOnError: true });
  const PanelComponent = plugin?.PanelComponent;

  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        width={contentDimensions?.width}
        height={contentDimensions?.height}
        aria-label="Loading..."
      />
    );
  }

  if (PanelComponent === undefined) {
    throw new Error(`Missing PanelComponent from panel plugin for kind '${panelPluginKind}'`);
  }

  return <PanelComponent {...others} contentDimensions={contentDimensions} definition={definition} />;
}
