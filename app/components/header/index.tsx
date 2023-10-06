import React from 'react'
import { Link } from '@remix-run/react'
import { LinksFunction } from '@remix-run/node'
import header from './header.css'
const Header = () => {
    return (
        <div className='header'>
            <div className='header-main'>
                <Link to={'/box-shadow'}> Box shadow</Link>
                <Link to={'/text-shadow'}> Text shadow</Link>
                <Link to={'/box-shadow'}>Border</Link>
                <Link to={'/box-shadow'}> Transform</Link>
            </div>
        </div>
    )
}

export default Header
export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: header }]
}