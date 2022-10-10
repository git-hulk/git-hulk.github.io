import React from 'react';
import Giscus from '@giscus/react';

export default function Comments() {
return (
<Giscus
  id="comments"
  repo="git-hulk/git-hulk.github.io"
  repoId="MDEwOlJlcG9zaXRvcnkyMzgzODU4MDM="
  category="General"
  categoryId="DIC_kwDODjV6i84CR5jn"
  mapping="pathname"
  term="Comments"
  reactionsEnabled="1"
  emitMetadata="0"
  inputPosition="top"
  theme="preferred_color_scheme"
  lang="en"
  loading="lazy"
/>
  );
}
