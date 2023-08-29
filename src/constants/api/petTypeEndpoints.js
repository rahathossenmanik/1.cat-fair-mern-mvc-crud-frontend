export const PET_TYPE_API = {
  get_all: () => `/petTypes/getall`,
  get_by_id: (id) => `/petTypes/${id}`,
  create: () => `/petTypes/create`,
  edit: (id) => `/petTypes/update/${id}`,
  delete: (id) => `/petTypes/delete/${id}`
};
