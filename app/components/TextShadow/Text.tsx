import React, { useEffect, useState } from 'react'
import type { LinksFunction } from "@remix-run/node";
import { AppProvider, Button, ButtonGroup, FormLayout, hsbToRgb, Page, Divider, Grid, LegacyCard, Checkbox, RangeSlider, ColorPicker } from '@shopify/polaris';
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
import ListItem, { links as listItem } from '~/components/ListItem/ListItem';
import { BLUE_DEFAULT, WHITE_DEFAULT, initialTextShadow } from '~/constants/box-shadow-values';
import { TextShadow } from '~/types/index.type';
import boxShadow from '../BoxShadow/boxShadow.css'
import CustomColorPicker, { links as colorPicker } from '../ColorPicker/ColorPicker';

const getDataFromLocalStorage = (): TextShadow[] => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedData = window.localStorage.getItem('textShadowData');
    const parsedData = storedData ? JSON.parse(storedData) : initialTextShadow;
    if (Array.isArray(parsedData) && parsedData.length === 0) {
      return initialTextShadow;
    }
    return parsedData;
  } else {
    return initialTextShadow;
  }
};
const Text = () => {
  const [data, setData] = useState<TextShadow[]>(getDataFromLocalStorage());
  const [shadows, setShadows] = useState<string>('');
  const [colorItem, setColorItem] = useState('');
  const [colorBg, setColorBg] = useState('');
  const [colorItemDf, setColorItemDf] = useState(BLUE_DEFAULT);
  const [colorBgDf, setColorBgDf] = useState(WHITE_DEFAULT);
  const [formData, setFormData] = useState(data[0]);
  const [count, setCount] = useState(data.length);
  const [editData, setEditData] = useState<any>();

  // const updateBackGround = (prop) => {
  //   setColorBgDf(prop)

  //   //cnvert
  //   const colorFomat = hsbToRgb(colorBgDf)
  //   setColorBg(`rgba(${colorFomat.red}, ${colorFomat.green}, ${colorFomat.blue})`)
  // }


  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  })
  const keyboardSensor = useSensor(KeyboardSensor)
  const sensors = useSensors(mouseSensor, keyboardSensor)

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
  useEffect(() => {
    const textShadowString = data
      .map((item: any) => {
        const { shiftRight, shiftDown, blur, color } = item;
        const ToRgb = hsbToRgb(color)
        const colorWithOpacity = `rgba(${ToRgb.red}, ${ToRgb.green}, ${ToRgb.blue})`;
        const insetString = `${shiftRight}px ${shiftDown}px ${blur}px `;
        return ` ${insetString} ${colorWithOpacity} `;
      })
      .join(",");
    setShadows(textShadowString);
    localStorage.setItem('textShadowData', JSON.stringify(data));
  }, [data, formData]);

  useEffect(() => {
    if (editData) {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        shiftRight: editData.shiftRight,
        shiftDown: editData.shiftDown,
        blur: editData.blur,
        color: editData.color,
        id: editData.id,
      }));
    } else {
      setEditData(data[0])
      setFormData(data[0])
    }
  }, [editData]);

  const handleAdd = () => {
    const newData: TextShadow = {
      id: count,
      shiftRight: 0,
      shiftDown: 19,
      blur: 7,
      color: {
        hue: 120,
        brightness: 1,
        saturation: 1,
      },
    };
    setData((prevData: any) => [...prevData, newData]);
    setCount(count + 1);
  };
  const handleClearData = () => {
    localStorage.removeItem('textShadowData');
    setData(initialTextShadow);
    setEditData(initialTextShadow[0]);
  };
  return (
    <AppProvider i18n={{}}>
      <div className='box'>
        <Page fullWidth>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, lg: 6, xl: 6 }}>
              <LegacyCard title="Text-Shadow CSS Generator" sectioned>
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
                    label="Blur"
                    id='blur'
                    value={formData.blur}
                    onChange={(e) => updateShadow("blur", e)}
                    output
                    min={0}
                    max={100}
                    step={1}
                  />
                  <ColorPicker onChange={(e) => updateShadow("color", e)} color={formData.color} />
                  <Divider />
                  <ButtonGroup>
                    <Button onClick={handleAdd}>Add product</Button>
                    <Button destructive onClick={handleClearData}>
                      Reset
                    </Button>
                  </ButtonGroup>

                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext
                      items={data}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className='list'>
                        {data.map((e: any, index: number) => (
                          <ListItem type='text' formData={formData} data={data} setData={setData} shadow={e} key={index} editData={editData} setEditData={setEditData} />
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
                  <div style={{ background: colorBg, padding: 50 }}>
                    <div style={{ fontSize: 80 }} >
                      <p style={{ textShadow: shadows, color: colorItem }}>HeHe !!</p>
                    </div>
                  </div>
                </LegacyCard.Section>
              </LegacyCard>
              <LegacyCard title='Css code'>
                <LegacyCard.Section>
                  <p>text-shadow: {shadows}</p>
                </LegacyCard.Section>
              </LegacyCard>
              <LegacyCard title='Template'>
                <LegacyCard.Section>

                </LegacyCard.Section>
              </LegacyCard>
            </Grid.Cell>
          </Grid>
        </Page>
      </div>

    </AppProvider >
  )
}

export default Text
export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: boxShadow }, ...listItem(), ...colorPicker()]
}