const fs = require('node:fs/promises');

async function getStoredPosts() {
  const rawFileContent = await fs.readFile('/usr/src/app/src/data/posts.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedPosts = data.posts ?? [];
  return storedPosts;
}

function storePosts(posts) {
  return fs.writeFile('/usr/src/app/src/data/posts.json', JSON.stringify({ posts: posts || [] }));
}

exports.getStoredPosts = getStoredPosts;
exports.storePosts = storePosts;