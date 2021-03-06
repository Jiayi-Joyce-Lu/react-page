/* eslint-disable @typescript-eslint/ban-types */

import { getAlignmentFromElement } from '../plugins/paragraphs';
import { SlateComponentPluginDefinition } from '../types/slatePluginDefinitions';
import createComponentPlugin from './createComponentPlugin';

type Def<T extends {}> = Pick<
  SlateComponentPluginDefinition<HtmlBlockData<T>>,
  | 'type'
  | 'icon'
  | 'label'
  | 'customAdd'
  | 'customRemove'
  | 'isDisabled'
  | 'hotKey'
  | 'onKeyDown'
  | 'getInitialData'
  | 'schema'
> & {
  replaceWithDefaultOnRemove?: boolean;
  tagName: keyof JSX.IntrinsicElements;
  getData?: SlateComponentPluginDefinition<
    HtmlBlockData<T>
  >['deserialize']['getData'];
  noButton?: boolean;
};

export type DefaultBlockDataType = {
  align: 'left' | 'right' | 'center' | 'justify';
};

export type HtmlBlockData<T> = T & DefaultBlockDataType;

function createSimpleHtmlBlockPlugin<T = {}>(def: Def<HtmlBlockData<T>>) {
  return createComponentPlugin<HtmlBlockData<T>>({
    type: def.type,
    object: 'block',
    hotKey: def.hotKey,
    replaceWithDefaultOnRemove: def.replaceWithDefaultOnRemove,
    icon: def.icon,
    label: def.label,
    onKeyDown: def.onKeyDown,
    addToolbarButton: !def.noButton,
    customAdd: def.customAdd,
    customRemove: def.customRemove,
    schema: def.schema,
    addHoverButton: false,
    deserialize: {
      tagName: def.tagName,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getData: def.getData || (getAlignmentFromElement as any),
    },
    getStyle: ({ align }) => ({ textAlign: align }),

    Component: def.tagName,
  });
}

export default createSimpleHtmlBlockPlugin;
