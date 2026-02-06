import Fuse from 'fuse.js';
import type { Post } from './data';

export const searchConfig: Fuse.IFuseOptions<Post> = {
    keys: [
        { name: 'title', weight: 0.5 },
        { name: 'excerpt', weight: 0.3 },
        { name: 'content', weight: 0.2 },
        { name: 'tags', weight: 0.1 },
    ],
    threshold: 0.3,
    ignoreLocation: true,
    useExtendedSearch: true,
    minMatchCharLength: 2,
};

export function createSearchIndex(posts: Post[]) {
    return new Fuse(posts, searchConfig);
}
