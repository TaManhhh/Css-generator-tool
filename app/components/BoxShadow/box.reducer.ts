import { createReducer, createAction, current } from '@reduxjs/toolkit'
import React from 'react'
import { initialBoxShadow } from '~/constants/box-shadow-values'
import type { IBoxShadow } from '~/types/index.type'

interface BoxState {
    shadowList: IBoxShadow[]
    editingShadow: IBoxShadow | null
}
const initalSate: BoxState = {
    shadowList: initialBoxShadow,
    editingShadow: null,
}

const boxReducer = createReducer(initalSate, (builder) => {})

export default boxReducer
