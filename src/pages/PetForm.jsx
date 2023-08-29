import React, { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Paper, Group, Grid, Button, Stack, NumberInput, Select, Textarea } from '@mantine/core';
import { get, post } from '../helpers/api_helpers';
import { PET_TYPE_API } from '../constants/api/petTypeEndpoints';
import { Character_API } from '../constants/api/characterEndpoints';
import { PET_API } from '../constants/api/petEndpoints';
import { successToast } from '../helpers/toastHelper';
import { useNavigate } from 'react-router-dom';

const PetForm = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: '',
      age: '',
      image: '',
      petType: '',
      character: '',
      about: '',
      favorite: ''
    }
  });

  const [petTypes, setPetTypes] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const getAllPetTypes = async () => {
      const response = await get(PET_TYPE_API.get_all());
      setPetTypes(response?.map((item) => ({ value: item?._id, label: item?.label, key: item?._id })));
    };
    getAllPetTypes();
  }, []);

  useEffect(() => {
    const getAllCharacters = async () => {
      const response = await get(Character_API.get_all());
      setCharacters(response?.map((item) => ({ value: item?._id, label: item?.label, key: item?._id })));
    };
    getAllCharacters();
  }, []);

  const shouldCreate = (query, data) => {
    if (query.length < 1) {
      return false;
    }
    return data.every((item) => item.label.toLowerCase() !== query.toLowerCase());
  };

  const onCreatePetType = async (value) => {
    const response = await post(PET_TYPE_API.create(), { label: value });
    if (response) successToast('Pet Type created successfully');
    const selectedItem = { value: response?._id, label: response?.label, key: response?._id, selected: true };
    setPetTypes([...petTypes, selectedItem]);
    form.setFieldValue('petType', selectedItem);
    return selectedItem;
  };

  const onCreateCharacter = async (value) => {
    const response = await post(Character_API.create(), { label: value });
    if (response) successToast('Character created successfully');
    const selectedItem = { value: response?._id, label: response?.label, key: response?._id, selected: true };
    setCharacters([...characters, selectedItem]);
    form.setFieldValue('character', selectedItem);
    return selectedItem;
  };

  const onSubmit = async (values) => {
    const response = await post(PET_API.create(), values);
    if (response) {
      successToast('Pet registered successfully');
      navigate('/');
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          <Grid>
            <Grid.Col xs={12} md={6}>
              <TextInput
                label="Name"
                placeholder="Pet name"
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                radius="md"
                required
              />
            </Grid.Col>

            <Grid.Col xs={12} md={6}>
              <NumberInput
                label="Age"
                placeholder="Pet age"
                onChange={(value) => form.setFieldValue('age', value)}
                radius="md"
                required
              />
            </Grid.Col>

            <Grid.Col xs={12} md={6}>
              <Select
                withinPortal
                label="Pet Type"
                placeholder="Pet Type"
                data={petTypes}
                onChange={(value) => form.setFieldValue('petType', value)}
                radius="md"
                creatable
                getCreateLabel={(value) => `Create "${value}"`}
                shouldCreate={shouldCreate}
                onCreate={(value) => onCreatePetType(value)}
                searchable
                required
              />
            </Grid.Col>

            <Grid.Col xs={12} md={6}>
              <Select
                withinPortal
                label="Pet Character"
                placeholder="Pet Character"
                data={characters}
                onChange={(value) => form.setFieldValue('character', value)}
                radius="md"
                creatable
                getCreateLabel={(value) => `Create "${value}"`}
                shouldCreate={shouldCreate}
                onCreate={(value) => onCreateCharacter(value)}
                searchable
                required
              />
            </Grid.Col>

            <Grid.Col xs={12}>
              <TextInput
                label="Image"
                placeholder="Paste a image URL"
                onChange={(event) => form.setFieldValue('image', event.currentTarget.value)}
                radius="md"
                required
              />
            </Grid.Col>

            <Grid.Col xs={12}>
              <Textarea
                label="About"
                placeholder="Write at least 100 characters about your pet"
                onChange={(event) => form.setFieldValue('about', event.currentTarget.value)}
                radius="md"
                minRows={3}
                autosize
                required
              />
            </Grid.Col>

            <Grid.Col xs={12}>
              <Textarea
                label="Favorite"
                placeholder="What your pet likes to do"
                onChange={(event) => form.setFieldValue('favorite', event.currentTarget.value)}
                radius="md"
                minRows={3}
                autosize
                required
              />
            </Grid.Col>
          </Grid>
        </Stack>

        <Group position="right" mt="xl">
          <Button type="submit" radius="md">
            Introduce in Pet Fair
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export default PetForm;
