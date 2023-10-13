import React, { useState } from 'react'
import { hsbToRgb, Icon } from '@shopify/polaris'
import type { LinksFunction } from '@remix-run/node'
import { useSortable } from '@dnd-kit/sortable'
import { DragHandleMinor, EditMinor, DeleteMinor } from '@shopify/polaris-icons'
import { CSS } from '@dnd-kit/utilities'
import type { IBoxShadow } from '~/types/index.type'
import listItem from './list-item.css'

interface ListItem {
    data: IBoxShadow[]
    editData?: IBoxShadow
    setEditData: (value: IBoxShadow | undefined) => void
    setData: (value: IBoxShadow[]) => void
    shadow: IBoxShadow
    formData: IBoxShadow
    type: string
}

const ListItem = ({
    data,
    setData,
    formData,
    type,
    setEditData,
    shadow,
}: ListItem) => {
    const formatColor = (color: any) => {
        const changeColor = hsbToRgb(color)
        return `rgba(${changeColor.red}, ${changeColor.green}, ${changeColor.blue})`
    }
    const newFormData = { ...formData, color: formatColor(formData?.color) }
    const newShadow = { ...shadow, color: formatColor(shadow?.color) }
    const displayProperties =
        formData?.id === shadow?.id ? newFormData : newShadow

    const handleEditClick = (item: IBoxShadow) => {
        setEditData(item)
    }

    const onDelete = (id: number) => {
        const updatedData = data.filter((item: IBoxShadow) => item.id !== id)
        setData(updatedData)
    }

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: shadow.id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }
    return (
        <div
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            key={shadow?.id}
            onClick={() => handleEditClick(shadow)}
            className={`list-item ${
                formData?.id === shadow?.id ? 'active' : ' inactive'
            }`}
        >
            <div className="list-shadow">
                <Icon source={DragHandleMinor} color="base" />
                <div>
                    {type === 'box'
                        ? displayProperties?.inset
                            ? `inset ${displayProperties?.shiftRight}px ${displayProperties?.shiftDown}px ${displayProperties?.blur}px ${displayProperties?.spread}px ${displayProperties?.color}`
                            : ` ${displayProperties?.shiftRight}px ${displayProperties?.shiftDown}px ${displayProperties?.blur}px ${displayProperties?.spread}px ${displayProperties?.color}`
                        : `${displayProperties?.shiftRight}px ${displayProperties?.shiftDown}px ${displayProperties?.blur}px ${displayProperties?.color}`}
                </div>
            </div>
            <div className="list-button">
                <span>
                    <Icon source={EditMinor} color="base" />
                </span>
                <span onClick={() => onDelete(shadow.id)}>
                    <Icon source={DeleteMinor} color="base" />
                </span>
            </div>
        </div>
    )
}
export default ListItem
export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: listItem },
]
