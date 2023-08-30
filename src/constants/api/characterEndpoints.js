export const Character_API = {
  get_all: () => `/characters/getall`,
  get_by_id: (id) => `/characters/getbyid/${id}`,
  create: () => `/characters/create`,
  edit: (id) => `/characters/update/${id}`,
  delete: (id) => `/characters/delete/${id}`
};
