import type { LinksFunction, MetaFunction } from '@remix-run/node'
import type { HSBAColor } from '@shopify/polaris'
import {
    AppProvider,
    Button,
    Divider,
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
import { BLUE_DEFAULT, WHITE_DEFAULT } from '~/constants/box-shadow-values'
import type { ITransform } from '~/types/index.type'
import { INITIALTRANSFORM } from '~/constants/transform-value'
import boxShadow from '../components/BoxShadow/boxShadow.css'

export const meta: MetaFunction = () => [
    { title: 'Transform-Shadow CSS Generator | Section Cloud' },
    {
        name: 'Transform-Shadow CSS Generator | Section Cloud',
        content: 'Transform-Shadow CSS Generator | Section Cloud',
    },
]

const Tranform = () => {
    const [formData, setFormData] = useState<ITransform>(INITIALTRANSFORM)
    const [colorItem, setColorItem] = useState('rgba(13, 189, 253)')
    const [colorBg, setColorBg] = useState('')
    const [colorItemDf, setColorItemDf] = useState(BLUE_DEFAULT)
    const [colorBgDf, setColorBgDf] = useState(WHITE_DEFAULT)
    const [transform, setTransform] = useState('none')
    const [transformOrigin, setTransformOrigin] = useState('none')
    const [changedFields, setChangedFields] = useState<string[]>([])
    const [topCenter, setTopCenter] = useState('50%')
    const [leftCenter, setLeftCenter] = useState('50%')

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

    const handleChangeTransfrom = (prop: string, val: any) => {
        setFormData({ ...formData, [prop]: val })
        if (!changedFields.includes(prop)) {
            setChangedFields([...changedFields, prop])
        }
    }
    useEffect(() => {
        let transform = ''
        let newTransformOrigin = ''
        if (changedFields.includes('scale')) {
            transform += `scale(${formData.scale}) `
        }
        if (changedFields.includes('rotate')) {
            transform += `rotate(${formData.rotate}deg) `
        }
        if (
            changedFields.includes('translateX') ||
            changedFields.includes('translateY')
        ) {
            transform += `translate(${formData.translateX}px, ${formData.translateY}px) `
        }
        if (changedFields.includes('skewX')) {
            transform += `skewX(${formData.skewX}deg) `
        }
        if (changedFields.includes('skewY')) {
            transform += `skewY(${formData.skewY}deg) `
        }
        if (
            changedFields.includes('transformX') ||
            changedFields.includes('transformY')
        ) {
            newTransformOrigin = `${formData.transformX}% ${formData.transformY}%`
            setLeftCenter(`${formData.transformX}%`)
            setTopCenter(`${formData.transformY}%`)
        }
        setTransformOrigin(newTransformOrigin)
        setTransform(transform)
    }, [formData, changedFields])

    const handleResetData = () => {
        setTransform('none')
        setTransformOrigin('none')
        setFormData(INITIALTRANSFORM)
    }
    return (
        <AppProvider i18n={{}}>
            <Page>
                <Layout>
                    <Layout.Section oneHalf>
                        <LegacyCard title="Transform CSS Generator" sectioned>
                            <FormLayout>
                                <RangeSlider
                                    label="Scale (x)"
                                    value={formData?.scale}
                                    id="scale"
                                    onChange={(e) =>
                                        handleChangeTransfrom('scale', e)
                                    }
                                    output
                                    max={2}
                                    min={0}
                                    step={0.1}
                                />
                                <RangeSlider
                                    id="rotate"
                                    label="Rotate (deg)"
                                    value={formData?.rotate}
                                    onChange={(e) =>
                                        handleChangeTransfrom('rotate', e)
                                    }
                                    output
                                    min={0}
                                    max={360}
                                    step={1}
                                />
                                <RangeSlider
                                    id="translateX"
                                    label="TranslateX (px)"
                                    value={formData?.translateX}
                                    onChange={(e) =>
                                        handleChangeTransfrom('translateX', e)
                                    }
                                    output
                                    min={-100}
                                    max={100}
                                    step={1}
                                />
                                <RangeSlider
                                    label="TranslateY (px)"
                                    id="translateY"
                                    value={formData?.translateY}
                                    onChange={(e) =>
                                        handleChangeTransfrom('translateY', e)
                                    }
                                    output
                                    min={-100}
                                    max={100}
                                    step={1}
                                />
                                <RangeSlider
                                    label="SkewX (deg)"
                                    id="skewX"
                                    value={formData?.skewX}
                                    onChange={(e) =>
                                        handleChangeTransfrom('skewX', e)
                                    }
                                    output
                                    min={-90}
                                    max={90}
                                    step={1}
                                />
                                <RangeSlider
                                    label="SkewY (deg)"
                                    id="skewY"
                                    value={formData?.skewY}
                                    onChange={(e) =>
                                        handleChangeTransfrom('skewY', e)
                                    }
                                    output
                                    min={-90}
                                    max={90}
                                    step={1}
                                />
                                <RangeSlider
                                    label="Transform origin X (%)"
                                    id="transformX"
                                    value={formData?.transformX}
                                    onChange={(e) =>
                                        handleChangeTransfrom('transformX', e)
                                    }
                                    output
                                    min={-50}
                                    max={150}
                                    step={1}
                                />
                                <RangeSlider
                                    label="Transform origin Y (%)"
                                    id="transformY"
                                    value={formData?.transformY}
                                    onChange={(e) =>
                                        handleChangeTransfrom('transformY', e)
                                    }
                                    output
                                    min={-50}
                                    max={150}
                                    step={1}
                                />
                                <Divider />
                                <Button onClick={handleResetData}>
                                    Reset default
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
                                    style={{ background: colorBg, padding: 36 }}
                                >
                                    <div className="box-transform">
                                        <div
                                            className="box-preview "
                                            style={{
                                                transform,
                                                transformOrigin,
                                                backgroundColor: colorItem,
                                            }}
                                        ></div>
                                        <div
                                            className="center"
                                            style={{
                                                top: topCenter,
                                                left: leftCenter,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </LegacyCard.Section>
                        </LegacyCard>
                        <LegacyCard title="Css code">
                            <LegacyCard.Section>
                                <p>transform :{transform}</p>
                                <p>transform-origin :{transformOrigin} </p>
                            </LegacyCard.Section>
                        </LegacyCard>
                    </Layout.Section>
                </Layout>
            </Page>
        </AppProvider>
    )
}

export default Tranform
export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: boxShadow },
    ...colorPicker(),
]
