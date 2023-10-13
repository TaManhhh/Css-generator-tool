import React from 'react'
import type { LinksFunction } from '@remix-run/node'
import boderItem from './borderItem.css'

const BorderItem = ({ children, className, style, ...props }: any) => (
    <div className={`border-item ${className}`} style={style} {...props}>
        <p>{children}</p>
    </div>
)

export default BorderItem
export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: boderItem },
]
