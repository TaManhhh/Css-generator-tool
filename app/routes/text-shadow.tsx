import { LinksFunction, MetaFunction } from '@remix-run/node'
import React from 'react'
import Text, { links as box } from '~/components/TextShadow/Text'
export const meta: MetaFunction = () => {
    return [
      { title: "Text-Shadow CSS Generator | Section Cloud" },
      { name: "Text-Shadow CSS Generator | Section Cloud", content: "Text-Shadow CSS Generator | Section Cloud" },
    ];
  };
  
const TextShadow = () => {
    return (
        <div>
            <Text />
        </div>
    )
}

export default TextShadow
export const links: LinksFunction = () => {
    return [...box()]
}