import React from 'react'
import { Link } from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'
import header from './header.css'

const Header = () => (
    <div className="header">
        <div className="header-main">
            <Link to={'/box-shadow'}> Box shadow</Link>
            <Link to={'/text-shadow'}> Text shadow</Link>
            <Link to={'/border'}>Border</Link>
            <Link to={'/transform'}> Transform</Link>
        </div>
    </div>
)

export default Header
export const links: LinksFunction = () => [{ rel: 'stylesheet', href: header }]
