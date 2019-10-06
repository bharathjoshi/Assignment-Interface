export const updateObject = (oldObject, updatedProperties) => {
  
  const k= {
    ...oldObject,
    ...updatedProperties
  }
  console.log(k,'utility')
  return {
    ...oldObject,
    ...updatedProperties
  };
};
