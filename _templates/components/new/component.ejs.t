---
to: "<%= type && name ? `src/components/${type}/${h.changeCase.paramCase(name)}/${h.changeCase.paramCase(name)}.tsx` : null %>"
---
import React, { PropsWithChildren } from 'react'

interface <%= h.changeCase.pascalCase(name) %>Props {
  children?: React.ReactNode;
  /* Define your other props here */
}

const <%= h.changeCase.pascalCase(name) %> = ({children}: PropsWithChildren<<%= h.changeCase.pascalCase(name) %>Props>) => {
    return (
        <div>
            <h1><%= h.changeCase.pascalCase(name) %></h1>
            <p>This is a <%= h.changeCase.pascalCase(name) %> loader.</p>
            <div>
                {children}
            </div>
        </div>
    );
}

export default <%= h.changeCase.pascalCase(name) %>

