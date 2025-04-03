import type { BuildPageTreeOptions } from 'fumadocs-core/source';

/**
 * Source API Integration
 *
 * Add this to page tree builder options
 */
export const attachFile: BuildPageTreeOptions['attachFile'] = (node, file) => {
  if (!file) return node;
  const data = file.data.data as object;

  if ('new' in data && typeof data.new === 'boolean' && data.new) {
    node.name = (
      <span className="flex items-center gap-3 w-full">
        {node.name}{' '}
        <span className="ms-auto text-[10px] text-nowrap bg-blue-500 text-white rounded-sm leading-1 px-1 py-0.5 h-4.5 font-semibold flex items-center justify-center">
          <span>NEW</span>
        </span>
      </span>
    );
  }

  return node;
};
