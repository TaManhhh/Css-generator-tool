import type { HSBAColor } from '@shopify/polaris'
import {
    AppProvider,
    Button,
    FormLayout,
    Layout,
    LegacyCard,
    Page,
    RangeSlider,
    hsbToRgb,
} from '@shopify/polaris'
import { useState, useEffect } from 'react'
import CustomColorPicker, {
    links as colorPicker,
} from '~/components/ColorPicker/ColorPicker'
import {
  BORDERRADIUS,
    INITIALBORDER,
    PositionBorder,
    TypeBorder,
} from '~/constants/border-value'
import { BLUE_DEFAULT, WHITE_DEFAULT } from '~/constants/box-shadow-values'
import type { IBorder } from '~/types/index.type'
import type { LinksFunction } from '@remix-run/node'
import BorderItem, {
    links as borderCss,
} from '~/components/BorderItem/BorderItem'
import boxShadow from '../components/BoxShadow/boxShadow.css'

function convertToKebabCase(input: string): string {
    return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

const Border = () => {
    const [formData, setFormData] = useState<IBorder>(INITIALBORDER)
    const [colorItem, setColorItem] = useState('rgba(13, 189, 253)')
    const [colorBg, setColorBg] = useState('')
    const [colorItemDf, setColorItemDf] = useState(BLUE_DEFAULT)
    const [colorBgDf, setColorBgDf] = useState(WHITE_DEFAULT)
    const [border, setBorder] = useState('')
    const [borderRadius, setBorderRadius] = useState('')
    const [colorBorder, setColorBorder] = useState('rgba(0, 0, 0)')
    const [radius, setRadius] = useState(BORDERRADIUS)
    const [activeStyle, setActiveStyle] = useState(INITIALBORDER.style)
    const [activePosition, setActivePosition] = useState(INITIALBORDER.position)

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

    const handleColorBorder = (value: HSBAColor) => {
      setFormData({ ...formData, color: value })
        const colorFomat = hsbToRgb(formData.color)
        setColorBorder(
            `rgba(${colorFomat?.red}, ${colorFomat?.green}, ${colorFomat?.blue})`
        )
    }

    const handleChangeBorder = (prop: any, val: any) => {
        setFormData({ ...formData, [prop]: val })
        if (prop === 'style') {
            setActiveStyle(val)
        } else if (prop === 'position') {
            setActivePosition(val)
        }
    }

    const handleChangeRadius = (prop: string, val: any) => {
        setRadius({ ...radius, [prop]: val })
        if (prop === 'allCorners') {
            setRadius({
                allCorners: val,
                topLeft: val,
                topRight: val,
                bottomRight: val,
                bottomLeft: val,
            })
        }
    }

    useEffect(() => {
        setBorder(`${formData.width}px ${formData.style} ${colorBorder}`)
    }, [formData])

    useEffect(() => {
        setBorderRadius(
            `${radius.topLeft}px ${radius.topRight}px ${radius.bottomRight}px ${radius.bottomLeft}px`
        )
    }, [radius])

    const handleResetData = () => {
        setFormData(INITIALBORDER)
        setColorBorder('rgba(0, 0, 0)')
        setRadius(BORDERRADIUS)
    }

    return (
        <div className="border">
            <AppProvider i18n={{}}>
                <Page>
                    <Layout>
                        <Layout.Section oneHalf>
                            <LegacyCard
                                title="Transform CSS Generator"
                                sectioned
                            >
                                <FormLayout>
                                    <RangeSlider
                                        label="Width"
                                        value={formData?.width}
                                        id="width"
                                        onChange={(e) =>
                                            handleChangeBorder('width', e)
                                        }
                                        output
                                        max={30}
                                        min={1}
                                        step={1}
                                    />
                                    <div>
                                        <p>Color</p>
                                        <CustomColorPicker
                                            value={formData.color}
                                            onChange={handleColorBorder}
                                        />
                                    </div>
                                    <div>
                                        <p>Style</p>
                                        <div className="border-wrapper">
                                            {TypeBorder.map((e) => (
                                                <BorderItem
                                                    key={e.id}
                                                    onClick={() =>
                                                        handleChangeBorder(
                                                            'style',
                                                            e.typeBorder
                                                        )
                                                    }
                                                    style={{ border: e.css }}
                                                    className={
                                                        activeStyle ===
                                                        e.typeBorder
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {e.typeBorder}
                                                </BorderItem>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p>Position</p>
                                        <div className="border-wrapper">
                                            {PositionBorder.map((e) => (
                                                <BorderItem
                                                    key={e.id}
                                                    style={{
                                                        [e.style]: `5px ${formData.style} #1C6EA4 `,
                                                    }}
                                                    onClick={() =>
                                                        handleChangeBorder(
                                                            'position',
                                                            e.style
                                                        )
                                                    }
                                                    className={
                                                        activePosition ===
                                                        e.style
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {e.name}
                                                </BorderItem>
                                            ))}
                                        </div>
                                    </div>
                                    <p>Border Radius</p>
                                    <RangeSlider
                                        label="All corners"
                                        value={radius.allCorners}
                                        onChange={(e) =>
                                            handleChangeRadius('allCorners', e)
                                        }
                                        output
                                        min={1}
                                        max={200}
                                        step={1}
                                    />
                                    <RangeSlider
                                        label="Top left"
                                        value={radius.topLeft}
                                        onChange={(e) =>
                                            handleChangeRadius('topLeft', e)
                                        }
                                        output
                                        min={1}
                                        max={200}
                                        step={1}
                                    />
                                    <RangeSlider
                                        label="Top right"
                                        value={radius.topRight}
                                        onChange={(e) =>
                                            handleChangeRadius('topRight', e)
                                        }
                                        output
                                        min={1}
                                        max={200}
                                        step={1}
                                    />
                                    <RangeSlider
                                        label="Bottom right"
                                        value={radius.bottomRight}
                                        onChange={(e) =>
                                            handleChangeRadius('bottomRight', e)
                                        }
                                        output
                                        min={1}
                                        max={200}
                                        step={1}
                                    />
                                    <RangeSlider
                                        label="Bottom left"
                                        value={radius.bottomLeft}
                                        onChange={(e) =>
                                            handleChangeRadius('bottomLeft', e)
                                        }
                                        output
                                        min={1}
                                        max={200}
                                        step={1}
                                    />
                                    <Button onClick={handleResetData}>
                                        Reset
                                    </Button>
                                </FormLayout>
                            </LegacyCard>
                        </Layout.Section>
                        <Layout.Section oneHalf>
                            <LegacyCard sectioned>
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
                                                backgroundColor: colorItem,
                                                [formData.position]: border,
                                                borderRadius,
                                            }}
                                        ></div>
                                    </div>
                                </LegacyCard.Section>
                            </LegacyCard>
                            <LegacyCard title="Css code">
                                <LegacyCard.Section>
                                    <p>
                                        {convertToKebabCase(formData.position)}:{' '}
                                        {border}
                                    </p>
                                    <p>border-radius :{borderRadius} </p>
                                </LegacyCard.Section>
                            </LegacyCard>
                        </Layout.Section>
                    </Layout>
                </Page>
            </AppProvider>
        </div>
    )
}
export default Border
export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: boxShadow },
    ...colorPicker(),
    ...borderCss(),
]
