import { useState } from "react";

export function convertDocumentData(fields: any): any {
  const convertedData: any = {};

  for (const field in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, field)) {
      convertedData[field] = convertFieldValue(fields[field]);
    }
  }

  return convertedData;
}

export function convertFieldValue(field: any): any {
  if (field.stringValue !== undefined) {
    return field.stringValue;
  } else if (field.integerValue !== undefined) {
    return parseInt(field.integerValue, 10);
  } else if (field.timestampValue !== undefined) {
    return new Date(field.timestampValue);
  } else if (field.booleanValue !== undefined) {
    return field.booleanValue;
  } else if (
    field.arrayValue !== undefined &&
    Array.isArray(field.arrayValue.values)
  ) {
    return field.arrayValue.values.map((value: any) =>
      convertFieldValue(value)
    );
  } else if (
    field.mapValue !== undefined &&
    field.mapValue.fields !== undefined
  ) {
    const mapData: any = {};
    for (const key in field.mapValue.fields) {
      if (Object.prototype.hasOwnProperty.call(field.mapValue.fields, key)) {
        mapData[key] = convertFieldValue(field.mapValue.fields[key]);
      }
    }
    return mapData;
  } else {
    // Handle other field types as needed
    return null;
  }
}

export const convertDate = (date: Date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  } as const;
  return date?.toLocaleDateString("vi-VN", options);
};
