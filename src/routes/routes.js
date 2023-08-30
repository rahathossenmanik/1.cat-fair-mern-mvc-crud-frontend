import AllPets from '../pages/AllPets';
import Birds from '../pages/Birds';
import Cats from '../pages/Cats';
import Dogs from '../pages/Dogs';
import Error404 from '../pages/Error404';
import PetForm from '../pages/PetForm';
import Reptiles from '../pages/Reptiles';
import Single from '../pages/Single';

export const routes = [
  { path: '/', element: <AllPets /> },
  { path: '/dogs', element: <Dogs /> },
  { path: '/cats', element: <Cats /> },
  { path: '/birds', element: <Birds /> },
  { path: '/reptiles', element: <Reptiles /> },
  { path: '/pets/register', element: <PetForm /> },
  { path: '/pets/single/:id', element: <Single /> },
  { path: '*', element: <Error404 /> },
];
