---
to: "<%= name ? `src/components/icon/${h.changeCase.paramCase(name)}/${h.changeCase.paramCase(name)}.tsx` : null %>"
---
import { SvgIcon, SvgIconProps } from '@mui/material'
import { PropsWithChildren, ReactElement } from 'react'
import { deepmerge } from '@mui/utils'

interface <%= h.changeCase.pascalCase(name) %>Props extends SvgIconProps {
  children?: ReactElement
  /* Define your other props here */
}

const <%= h.changeCase.pascalCase(name) %> = ({ sx, ...props }: PropsWithChildren<<%= h.changeCase.pascalCase(name) %>Props>) => {
    return (
       <SvgIcon
            sx={deepmerge({ width: 20, height: 20 }, sx)}
            viewBox='0 0 20 20'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            {/* Implement this section */}
        </SvgIcon>
    );
}

export default <%= h.changeCase.pascalCase(name) %>
