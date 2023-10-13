import { useState, useCallback, useEffect } from 'react'
import type { HSBAColor } from '@shopify/polaris'
import { Popover, hsbToRgb, ColorPicker } from '@shopify/polaris'
import type { LinksFunction } from '@remix-run/node'
import colorPiker from './colorPicker.css'

interface ColorPickerI {
    value: HSBAColor
    onChange: (value: HSBAColor) => void
}
const CustomColorPicker = ({ value, onChange }: ColorPickerI) => {
    const [popoverActive, setPopoverActive] = useState(false)
    const [color, setColor] = useState('')
    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        []
    )
    useEffect(() => {
        const colorFomat = hsbToRgb(value)
        setColor(
            `rgba(${colorFomat.red}, ${colorFomat.green}, ${colorFomat.blue})`
        )
    }, [value])

    const activator = (
        <div className="colorPicker">
            <button
                onClick={togglePopoverActive}
                className="color-picker-main"
                style={{ background: color }}
            ></button>
        </div>
    )
    return (
        <div>
            <Popover
                active={popoverActive}
                activator={activator}
                autofocusTarget="first-node"
                onClose={togglePopoverActive}
                sectioned={true}
            >
                <Popover.Pane fixed>
                    <Popover.Section>
                        <ColorPicker onChange={onChange} color={value} />
                    </Popover.Section>
                </Popover.Pane>
            </Popover>
        </div>
    )
}

export default CustomColorPicker
export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: colorPiker },
]
