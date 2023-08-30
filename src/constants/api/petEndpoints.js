export const PET_API = {
  get_all: () => `/pets/getall`,
  get_by_id: (id) => `/pets/getbyid/${id}`,
  create: () => `/pets/create`,
  edit: (id) => `/pets/update/${id}`,
  delete: (id) => `/pets/delete/${id}`
};
