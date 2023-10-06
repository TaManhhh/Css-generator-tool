import { useState, useCallback ,useEffect} from 'react'
import {  Popover,hsbToRgb, ColorPicker } from '@shopify/polaris';
import colorPiker from './colorPicker.css'
import { LinksFunction } from '@remix-run/node';
interface ColorPickerI{
    value:any,
    setValue:any
}
const CustomColorPicker = ({value,setValue}:ColorPickerI) => {
    const [popoverActive, setPopoverActive] = useState(false);
    const [color, setColor] = useState('');
    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );
    useEffect(() => {
        const colorFomat= hsbToRgb(value)
        setColor(`rgba(${colorFomat.red}, ${colorFomat.green}, ${colorFomat.blue})` )
    
    }, [value])

    const activator = (
        <div className='colorPicker'>
            <button onClick={togglePopoverActive} className='color-picker-main' style={{ backgroundColor: color }} >
            </button>
        </div>

    );
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
                        <ColorPicker onChange={setValue} color={value} />
                    </Popover.Section>
                </Popover.Pane>
            </Popover>
        </div>
    )
}

export default CustomColorPicker
export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: colorPiker }]
  }