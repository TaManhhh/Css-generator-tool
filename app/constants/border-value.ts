import type { IBorder, IBorderRadius, IPosition, IStyle } from '~/types/index.type'

export const INITIALBORDER: IBorder = {
    width: 5,
    color: {
        hue: 120,
        saturation: 1,
        brightness: 0,
        alpha: 1,
    },
    style: 'solid',
    position: 'border',
}

export const TypeBorder: IStyle[] = [
    {
        id: 0,
        typeBorder: 'solid',
        css: '5px solid #1C6EA4',
    },
    {
        id: 1,
        typeBorder: 'dotted',
        css: '5px dotted #1C6EA4',
    },
    {
        id: 2,
        typeBorder: 'dashed',
        css: '5px dashed #1C6EA4',
    },
    {
        id: 3,
        typeBorder: 'double',
        css: '5px double #1C6EA4',
    },
    {
        id: 4,
        typeBorder: 'groove',
        css: '5px groove #1C6EA4',
    },
    {
        id: 5,
        typeBorder: 'ridge',
        css: '5px ridge #1C6EA4',
    },
    {
        id: 6,
        typeBorder: 'inset',
        css: '5px inset #1C6EA4',
    },
    {
        id: 7,
        typeBorder: 'outset',
        css: '5px outset #1C6EA4',
    },
]
export const BORDERRADIUS: IBorderRadius = {
    allCorners: 1,
    topLeft: 1,
    topRight: 1,
    bottomRight: 1,
    bottomLeft: 1,
}
export const PositionBorder: IPosition[] = [
    {
        id: 0,
        name: 'All',
        positionBorder: 'border',
        css: '5px solid #1C6EA4',
        style: 'border',
    },
    {
        id: 1,
        name: 'Top',
        positionBorder: 'border-top',
        css: '5px dotted #1C6EA4',
        style: 'borderTop',
    },
    {
        id: 2,
        name: 'Right',
        positionBorder: 'border-right',
        css: '5px dashed #1C6EA4',
        style: 'borderRight',
    },
    {
        id: 3,
        name: 'Bottom',
        positionBorder: 'border-bottom',
        css: '5px double #1C6EA4',
        style: 'borderBottom',
    },
    {
        id: 4,
        name: 'Left',
        positionBorder: 'border-left',
        css: '5px groove #1C6EA4',
        style: 'borderLeft',
    },
]
