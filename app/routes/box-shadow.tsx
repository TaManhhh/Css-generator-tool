import React, { useState } from 'react'
import type { LinksFunction, MetaFunction } from '@remix-run/node'
import Box, { links as box } from '~/components/BoxShadow/Box'

export const meta: MetaFunction = () => [
    { title: 'Box-Shadow CSS Generator | Section Cloud' },
    {
        name: 'Box-Shadow CSS Generator | Section Cloud',
        content: 'Box-Shadow CSS Generator | Section Cloud',
    },
]

const BoxShadow = () => (
    <div>
        <Box />
    </div>
)

export default BoxShadow
export const links: LinksFunction = () => [...box()]
