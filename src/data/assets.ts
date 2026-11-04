// projects.json stores media as "/src/assets/projects/<file>". That path only exists in
// the dev server, so every URL is resolved here to the hashed file Vite emits at build time.
const projectAssets = import.meta.glob<string>('../assets/projects/*', {
  eager: true,
  import: 'default',
});

const assetsByFileName: Record<string, string> = Object.fromEntries(
  Object.entries(projectAssets).map(([path, url]) => [path.split('/').pop() ?? path, url]),
);

export const resolveAsset = (url: string): string => {
  if (/^(https?:)?\/\//.test(url)) return url;
  const fileName = url.split('/').pop() ?? url;
  return assetsByFileName[fileName] ?? url;
};
