const mapBase = (form: CreateProductForm) => {
  const {
    name,
    category,
    itemStatus,
    description,
    deliveryInclude,
    directDealAvailable,
    region,
    preferredPlace,
    images,
  } = form;

  return {
    name,
    category,
    itemStatus,
    description,
    deliveryInclude,
    directDealAvailable,
    region,
    preferredPlace,
    images,
  };
};

export const mapToCreateLiveProductRequest = (
  form: Extract<CreateProductForm, { type: "LIVE" }>
): CreateLiveProductRequest => {
  return {
    ...mapBase(form),
    liveTime: form.liveTime,
    initPrice: form.initPrice,
  };
};

export const mapToCreateDelayProductRequest = (
  form: Extract<CreateProductForm, { type: "DELAYED" }>
): CreateDelayProductRequest => {
  return {
    ...mapBase(form),
    endTime: form.endTime,
    startPrice: form.startPrice,
  };
};
