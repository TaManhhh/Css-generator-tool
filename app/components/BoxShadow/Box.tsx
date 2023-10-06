import React, { useEffect, useState } from 'react'
import type { LinksFunction } from "@remix-run/node";
import { Templates, initialBoxShadow } from '~/constants/box-shadow-values';
import { AppProvider, Button, FormLayout, hsbToRgb, Page, Divider, Grid, LegacyCard, Checkbox, RangeSlider, ColorPicker } from '@shopify/polaris';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import boxShadow from './boxShadow.css'
import ListItem, { links as listItem } from '~/components/ListItem/ListItem';
import { BoxShadowI } from '~/types/index.type';
import CustomColorPicker, { links as colorPicker } from '../ColorPicker/ColorPicker';

const Box = () => {
  const [data, setData] = useState(initialBoxShadow);
  console.log("🚀 ~ file: Box.tsx:25 ~ Box ~ data:", data)
  const [shadows, setShadows] = useState<any>([]);
  const [colorItem, setColorItem] = useState('');
  const [colorBg, setColorBg] = useState('');
  const [colorItemDf, setColorItemDf] = useState({
    hue: 196.11940298507463,
    saturation: 1,
    brightness: 0.98125,
    alpha: 1
  });
  const [colorBgDf, setColorBgDf] = useState({
    hue: 196.11940298507463,
    saturation: 0.03125,
    brightness: 0.98125,
    alpha: 1
  });
  const [formData, setFormData] = useState(data[0]);
  console.log("🚀 ~ file: Box.tsx:42 ~ Box ~ formData:", formData)
  const [count, setCount] = useState(data.length);
  const [editData, setEditData] = useState<any>();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  })
  const keyboardSensor = useSensor(KeyboardSensor)
  const sensors = useSensors(mouseSensor, keyboardSensor)
  const handleTemplateChange = (e: any) => {
    setData(e);
    setEditData(e[0])
  };


  const updateShadow = (prop: string, val: any) => {
    setFormData({ ...formData, [prop]: val });
    const updatedData = data.map((item: any) => {
      if (item.id === editData.id) {
        return { ...item, [prop]: val };
      }
      return item;
    });
    setData(updatedData);
  };
  
  useEffect(() => {
    const colorFomat = hsbToRgb(colorItemDf)
    setColorItem(`rgba(${colorFomat.red}, ${colorFomat.green}, ${colorFomat.blue})`)
  }, [colorItemDf])

  useEffect(() => {
    const colorFomat = hsbToRgb(colorBgDf)
    setColorBg(`rgba(${colorFomat.red}, ${colorFomat.green}, ${colorFomat.blue})`)
  }, [colorBgDf])

  useEffect(() => {
    const boxShadowString = data
      .map((item: any) => {
        const { shiftRight, shiftDown, blur, spread, color, inset } = item;
        const ToRgb = hsbToRgb(color)
        const colorWithOpacity = `rgba(${ToRgb.red}, ${ToRgb.green}, ${ToRgb.blue})`;
        const insetString = inset
          ? `inset ${shiftRight}px ${shiftDown}px ${blur}px ${spread}px `
          : `${shiftRight}px ${shiftDown}px ${blur}px ${spread}px`;
        return ` ${insetString} ${colorWithOpacity} `;
      })
      .join(",");
    setShadows(boxShadowString);
  }, [data, formData]);

  useEffect(() => {
    if (editData) {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        shiftRight: editData.shiftRight,
        shiftDown: editData.shiftDown,
        spread: editData.spread,
        blur: editData.blur,
        color: editData.color,
        inset: editData.inset,
        id: editData.id,
      }));
    } else {
      setEditData(data[0])
      setFormData(data[0])
    }
  }, [editData]);

  const handleAdd = () => {
    const newData: BoxShadowI = {
      id: count,
      shiftRight: 0,
      shiftDown: 19,
      spread: 3,
      blur: 7,
      color: {
        hue: 120,
        brightness: 1,
        saturation: 1,
      },
      inset: false,
    };
    setData((prevData: any) => [...prevData, newData]);
    setCount(count + 1);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!active.id !== over.id) {
      setData((e) => {
        const oldIndex = e.findIndex((shadow) => shadow.id === active.id);
        const newIndex = e.findIndex((shadow) => shadow.id === over.id);
        return arrayMove(e, oldIndex, newIndex);
      });
    }
  };
  return (
    <AppProvider i18n={{}}>
      <div className='box'>
        <Page fullWidth>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, lg: 6, xl: 6 }}>
              <LegacyCard title="Box-Shadow CSS Generator" sectioned>
                <FormLayout>
                  <RangeSlider
                    label="Shift right"
                    value={formData.shiftRight}
                    id='shiftRight'
                    onChange={(e) => updateShadow("shiftRight", e)}
                    output
                    max={50}
                    min={-50}
                    step={1}
                  />
                  <RangeSlider
                    id='shiftDown'
                    label="Shift down"
                    value={formData.shiftDown}
                    onChange={(e) => updateShadow("shiftDown", e)}
                    output
                    min={-50}
                    max={50}
                    step={1}
                  />
                  <RangeSlider
                    id='spread'
                    label="Spread"
                    value={formData.spread}
                    onChange={(e) => updateShadow("spread", e)}
                    output
                    min={0}
                    max={100}
                    step={1}
                  />
                  <RangeSlider
                    label="Blur"
                    id='blur'
                    value={formData.blur}
                    onChange={(e) => updateShadow("blur", e)}
                    output
                    min={0}
                    max={100}
                    step={1}
                  />
                  <Checkbox
                    label="Inset"
                    id='inset'
                    checked={formData.inset}
                    onChange={(e) => updateShadow("inset", e)}
                  />
                  <ColorPicker onChange={(e) => updateShadow("color", e)} color={formData.color} />
                  <Divider />
                  <div>
                    <Button onClick={handleAdd}>Add product</Button>
                  </div>
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} id='ROOT'>
                    <SortableContext
                      items={data}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className='list'>
                        {data.map((e: any, index: number) => (
                          <ListItem index={index} type='box' formData={formData} data={data} setData={setData} shadow={e} key={index} editData={editData} setEditData={setEditData} />
                        ))}

                      </div>
                    </SortableContext>
                  </DndContext>
                </FormLayout>
              </LegacyCard>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, lg: 6, xl: 6 }}>
              <LegacyCard  >
                <LegacyCard.Header title="Preview">
                  <CustomColorPicker value={colorItemDf} setValue={setColorItemDf} />
                  <CustomColorPicker value={colorBgDf} setValue={setColorBgDf} />
                </LegacyCard.Header>
                <LegacyCard.Section>
                  <div style={{ background: colorBg, padding: 36 }}>
                    <div
                      className="box-preview "
                      style={{ boxShadow: shadows, background: colorItem }}></div>
                  </div>
                </LegacyCard.Section>
              </LegacyCard>
              <LegacyCard title='Css code'>
                <LegacyCard.Section>
                  <p>box-shadow: {shadows}</p>
                </LegacyCard.Section>
              </LegacyCard>
              <LegacyCard title='Template'>
                <LegacyCard.Section>
                  <div className='list-template'>
                    {Templates.map((e: any) => (
                      <div className="template" style={{ boxShadow: e.shadow }} key={e.id} onClick={() => handleTemplateChange(e.template)}></div>
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

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: boxShadow }, ...listItem(), ...colorPicker()]
}