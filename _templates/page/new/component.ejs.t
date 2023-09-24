---
to: "<%= name ? `src/pages/${h.changeCase.paramCase(String(name))}/${h.changeCase.paramCase(String(name))}.tsx` : null %>"
---
import React, {FunctionComponent, PropsWithChildren} from 'react'

interface <%= h.changeCase.pascalCase(String(name)) %>PageProps {
      children?: React.ReactNode;
      /* Define your other props here */
}

const <%= h.changeCase.pascalCase(String(name)) %>Page: FunctionComponent<PropsWithChildren<<%= h.changeCase.pascalCase(String(name)) %>PageProps>> = () => {
    return (
        <div>
            <h1><%= h.changeCase.pascalCase(String(name)) %></h1>
            <p>This is a <%= h.changeCase.pascalCase(String(name)) %> page.</p>
        </div>
    );
}

export default <%= h.changeCase.pascalCase(String(name)) %>Page
