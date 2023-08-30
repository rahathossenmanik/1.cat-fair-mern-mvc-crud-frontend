export const PET_API = {
  get_all: () => `/pets/getall`,
  get_by_id: (id) => `/pets/getbyid/${id}`,
  create: () => `/pets/create`,
  edit: (id) => `/pets/update/${id}`,
  delete: (id) => `/pets/delete/${id}`,
  get_all_dog: () => `/pets/getalldog`,
  get_all_cat: () => `/pets/getallcat`,
  get_all_bird: () => `/pets/getallbird`,
  get_all_reptile: () => `/pets/getallreptile`,
  love: (id) => `/pets/love/${id}`,
};
