import { createReducer, createAction, current } from '@reduxjs/toolkit'


interface BoxState {
    shadowList: BoxShadowI[]
    editingShadow: BoxShadowI | null
  }
  const initalSate: BoxState = {
    shadowList: initialBoxShadow,
    editingShadow: null
  }
import React from 'react'
import { initialBoxShadow } from '~/constants/box-shadow-values'
import { BoxShadowI } from '~/types/index.type'
const boxReducer = createReducer(initalSate,(builder)=>{
  
}) 

export default boxReducer
