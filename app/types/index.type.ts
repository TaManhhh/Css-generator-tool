import type { HSBAColor } from '@shopify/polaris'

export interface IBoxShadow {
    shiftRight: number
    shiftDown: number
    spread?: number | undefined
    blur: number
    color: HSBAColor
    inset?: boolean
    id: number
}
export interface ITemplate {
    template: IBoxShadow[]
    id: number
    shadow: string
}

export interface ITransform {
    scale: number
    rotate: number
    translateX: number
    translateY: number
    skewX: number
    skewY: number
    transformX: number
    transformY: number
}
export interface IBorder {
    width: number
    color: HSBAColor
    style: string
    position: string
}

export interface IStyle {
    id: number
    typeBorder: string
    css: string
}
export interface IPosition {
    id: number
    name: string
    positionBorder: string
    css: string
    style: string
}

export interface IBorderRadius {
    allCorners: number
    topLeft: number
    topRight: number
    bottomRight: number
    bottomLeft: number
}
