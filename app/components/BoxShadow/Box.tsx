import { useEffect, useState } from 'react'
import type { LinksFunction } from '@remix-run/node'
import {
    BLUE_DEFAULT,
    Templates,
    WHITE_DEFAULT,
    initialBoxShadow,
} from '~/constants/box-shadow-values'
import type { HSBAColor } from '@shopify/polaris'
import {
    AppProvider,
    Button,
    ButtonGroup,
    FormLayout,
    hsbToRgb,
    Page,
    Divider,
    Grid,
    LegacyCard,
    Checkbox,
    RangeSlider,
    ColorPicker,
} from '@shopify/polaris'
import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import ListItem, { links as listItem } from '~/components/ListItem/ListItem'
import type { IBoxShadow, ITemplate } from '~/types/index.type'
import boxShadow from './boxShadow.css'
import CustomColorPicker, {
    links as colorPicker,
} from '../ColorPicker/ColorPicker'

const getDataFromLocalStorage = (): IBoxShadow[] => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedData = window.localStorage.getItem('boxShadowData')
        const parsedData = storedData
            ? JSON.parse(storedData)
            : initialBoxShadow
        if (Array.isArray(parsedData) && parsedData.length === 0) {
            return initialBoxShadow
        }
        return parsedData
    }
    return initialBoxShadow
}

const Box = () => {
    const [data, setData] = useState<IBoxShadow[]>(getDataFromLocalStorage())
    const [shadows, setShadows] = useState<string>()
    const [colorItem, setColorItem] = useState('rgba(13, 189, 253)')
    const [colorBg, setColorBg] = useState('')
    const [colorItemDf, setColorItemDf] = useState(BLUE_DEFAULT)
    const [colorBgDf, setColorBgDf] = useState(WHITE_DEFAULT)
    const [formData, setFormData] = useState<IBoxShadow>(data[0])
    const [count, setCount] = useState(data.length)
    const [editData, setEditData] = useState<IBoxShadow>()
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    })
    const keyboardSensor = useSensor(KeyboardSensor)
    const sensors = useSensors(mouseSensor, keyboardSensor)
    const handleTemplateChange = (e: IBoxShadow[]) => {
        setData(e)
        setEditData(e[0])
    }
    useEffect(() => {
        const storedData = localStorage.getItem('boxShadowData')
        if (storedData) {
            setData(JSON.parse(storedData))
        } else {
            setData(initialBoxShadow)
        }
    }, [])

    const updateShadow = (prop: string, val: any) => {
        setFormData({ ...formData, [prop]: val })
        const updatedData = data.map((item: IBoxShadow) => {
            if (item.id === editData?.id) {
                return { ...item, [prop]: val }
            }
            return item
        })
        setData(updatedData)
    }

    const handleColorItemChange = (value: HSBAColor) => {
        setColorItemDf(value)
        const colorFomat = hsbToRgb(colorItemDf)
        setColorItem(
            `rgba(${colorFomat?.red}, ${colorFomat?.green}, ${colorFomat?.blue})`
        )
    }

    const handleColorBgChange = (value: HSBAColor) => {
        setColorBgDf(value)
        const colorFomat = hsbToRgb(colorBgDf)
        setColorBg(
            `rgba(${colorFomat?.red}, ${colorFomat?.green}, ${colorFomat?.blue})`
        )
    }

    useEffect(() => {
        const boxShadowString = data
            .map((item: IBoxShadow) => {
                const { shiftRight, shiftDown, blur, spread, color, inset } =
                    item
                const ToRgb = hsbToRgb(color)
                const colorWithOpacity = `rgba(${ToRgb?.red}, ${ToRgb?.green}, ${ToRgb?.blue})`
                const insetString = inset
                    ? `inset ${shiftRight}px ${shiftDown}px ${blur}px ${spread}px `
                    : `${shiftRight}px ${shiftDown}px ${blur}px ${spread}px`
                return ` ${insetString} ${colorWithOpacity} `
            })
            .join(',')
        setShadows(boxShadowString)
        localStorage.setItem('boxShadowData', JSON.stringify(data))
    }, [data, formData])

    useEffect(() => {
        if (editData) {
            setFormData((prevFormData: IBoxShadow) => ({
                ...prevFormData,
                shiftRight: editData?.shiftRight,
                shiftDown: editData?.shiftDown,
                spread: editData?.spread,
                blur: editData?.blur,
                color: editData?.color,
                inset: editData?.inset,
                id: editData?.id,
            }))
        } else {
            setEditData(data[0])
            setFormData(data[0])
        }
    }, [editData])

    const handleAdd = () => {
        const newData: IBoxShadow = {
            id: count,
            shiftRight: 0,
            shiftDown: 19,
            spread: 3,
            blur: 7,
            color: {
                hue: 120,
                brightness: 1,
                saturation: 1,
                alpha: 1,
            },
            inset: false,
        }
        setData((prevData: IBoxShadow[]) => [...prevData, newData])
        setCount(count + 1)
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event
        if (!active.id !== over.id) {
            setData((e) => {
                const oldIndex = e.findIndex(
                    (shadow) => shadow?.id === active?.id
                )
                const newIndex = e.findIndex(
                    (shadow) => shadow?.id === over?.id
                )
                return arrayMove(e, oldIndex, newIndex)
            })
        }
    }
    const handleClearData = () => {
        localStorage.removeItem('boxShadowData')
        setData(initialBoxShadow)
        setEditData(initialBoxShadow[0])
    }
    return (
        <AppProvider i18n={{}}>
            <div className="box">
                <Page fullWidth>
                    <Grid>
                        <Grid.Cell columnSpan={{ xs: 6, lg: 6, xl: 6 }}>
                            <LegacyCard
                                title="Box-Shadow CSS Generator"
                                sectioned
                            >
                                <FormLayout>
                                    <RangeSlider
                                        label="Shift right"
                                        value={formData?.shiftRight}
                                        id="shiftRight"
                                        onChange={(e) =>
                                            updateShadow('shiftRight', e)
                                        }
                                        output
                                        max={50}
                                        min={-50}
                                        step={1}
                                    />
                                    <RangeSlider
                                        id="shiftDown"
                                        label="Shift down"
                                        value={formData?.shiftDown}
                                        onChange={(e) =>
                                            updateShadow('shiftDown', e)
                                        }
                                        output
                                        min={-50}
                                        max={50}
                                        step={1}
                                    />
                                    <RangeSlider
                                        id="spread"
                                        label="Spread"
                                        value={formData?.spread || 0}
                                        onChange={(e) =>
                                            updateShadow('spread', e)
                                        }
                                        output
                                        min={0}
                                        max={100}
                                        step={1}
                                    />
                                    <RangeSlider
                                        label="Blur"
                                        id="blur"
                                        value={formData?.blur}
                                        onChange={(e) =>
                                            updateShadow('blur', e)
                                        }
                                        output
                                        min={0}
                                        max={100}
                                        step={1}
                                    />
                                    <Checkbox
                                        label="Inset"
                                        id="inset"
                                        checked={formData?.inset}
                                        onChange={(e) =>
                                            updateShadow('inset', e)
                                        }
                                    />
                                    <ColorPicker
                                        onChange={(e) =>
                                            updateShadow('color', e)
                                        }
                                        color={formData?.color}
                                    />
                                    <Divider />
                                    <ButtonGroup>
                                        <Button onClick={handleAdd}>
                                            Add product
                                        </Button>
                                        <Button
                                            destructive
                                            onClick={handleClearData}
                                        >
                                            Reset
                                        </Button>
                                    </ButtonGroup>
                                    <DndContext
                                        sensors={sensors}
                                        collisionDetection={closestCenter}
                                        onDragEnd={handleDragEnd}
                                        id="ROOT"
                                    >
                                        <SortableContext
                                            items={data}
                                            strategy={
                                                verticalListSortingStrategy
                                            }
                                        >
                                            <div className="list">
                                                {data?.map(
                                                    (
                                                        e: IBoxShadow,
                                                        index: number
                                                    ) => (
                                                        <ListItem
                                                            type="box"
                                                            formData={formData}
                                                            data={data}
                                                            setData={setData}
                                                            shadow={e}
                                                            key={index}
                                                            editData={editData}
                                                            setEditData={
                                                                setEditData
                                                            }
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </SortableContext>
                                    </DndContext>
                                </FormLayout>
                            </LegacyCard>
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ xs: 6, lg: 6, xl: 6 }}>
                            <LegacyCard>
                                <LegacyCard.Header title="Preview">
                                    <CustomColorPicker
                                        value={colorItemDf}
                                        onChange={handleColorItemChange}
                                    />
                                    <CustomColorPicker
                                        value={colorBgDf}
                                        onChange={handleColorBgChange}
                                    />
                                </LegacyCard.Header>
                                <LegacyCard.Section>
                                    <div
                                        style={{
                                            background: colorBg,
                                            padding: 36,
                                        }}
                                    >
                                        <div
                                            className="box-preview "
                                            style={{
                                                boxShadow: shadows,
                                                backgroundColor: colorItem,
                                            }}
                                        ></div>
                                    </div>
                                </LegacyCard.Section>
                            </LegacyCard>
                            <LegacyCard title="Css code">
                                <LegacyCard.Section>
                                    <p>box-shadow: {shadows}</p>
                                </LegacyCard.Section>
                            </LegacyCard>
                            <LegacyCard title="Template">
                                <LegacyCard.Section>
                                    <div className="list-template">
                                        {Templates.map((e: ITemplate) => (
                                            <div
                                                className="template"
                                                style={{ boxShadow: e.shadow }}
                                                key={e.id}
                                                onClick={() =>
                                                    handleTemplateChange(
                                                        e.template
                                                    )
                                                }
                                            ></div>
                                        ))}
                                    </div>
                                </LegacyCard.Section>
                            </LegacyCard>
                        </Grid.Cell>
                    </Grid>
                </Page>
            </div>
        </AppProvider>
    )
}
export default Box

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: boxShadow },
    ...listItem(),
    ...colorPicker(),
]
