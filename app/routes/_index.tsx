import type { LinksFunction, MetaFunction } from '@remix-run/node'
import Box, { links as box } from '~/components/BoxShadow/Box'

export const meta: MetaFunction = () => [
    { title: 'CSS Generator | Section Cloud' },
    {
        name: 'CSS Generator | Section Cloud',
        content: 'CSS Generator | Section Cloud',
    },
]

export default function Index() {
    return (
        <div>
            <Box />
        </div>
    )
}
export const links: LinksFunction = () => [...box()]
