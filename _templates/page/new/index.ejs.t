---
to: "<%= name ? `src/pages/${h.changeCase.paramCase(String(name))}/index.tsx` : null %>"
---
export {default} from './<%=h.changeCase.paramCase(String(name))%>.tsx'
