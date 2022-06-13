import React from 'react';
import { useFormikContext } from 'formik';
import ImageInputList from '../ImageInputList';
import ErrorMessage from './ErrorMessage';

function FormImagePicker({ name }) {
  const { values, setFieldValue, errors, touched } = useFormikContext();

  const imageUris = values[name];
  const handleAddImage = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemoveImage = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((item) => item !== uri)
    );
  };
  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onRemoveImage={handleRemoveImage}
        onAddImage={handleAddImage}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormImagePicker;
