"use client";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Group,
  Paper,
  Radio,
  Stack,
  TextInput,
  rem,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import React from "react";

export default function EditProfileCards() {
  return (
    <>
      <Paper shadow="xl" withBorder className="p-16" h={rem(630)}>
        <Stack spacing="xs">
          <p className="text-2xl font-semibold">My Profile</p>
          <p className="text-slate-400">Manage your profile information</p>
          <Divider />
        </Stack>
        <Grid className="pt-5" justify="center">
          <Grid.Col lg={8}>
          <Stack >
            <TextInput label="Name" />
            <TextInput label="Email" />
            <TextInput label="Phone number" />
            <Radio.Group label="Gender">
              <Group>
                <Radio value="male" label="Male" />
                <Radio value="Female" label="Female" />
              </Group>
            </Radio.Group>
            <DatePickerInput
              label="Date of birth"
              placeholder="Pick your date of birth"
            />
            <Button color="red.6" className="bg-red-600" maw={rem(150)} radius="xl">Save</Button>
          </Stack>
          </Grid.Col>
          <Grid.Col lg={4}>
            <Stack maw={rem(200)} mx="auto" align="center">
              <Avatar size="xl"/>
              <Button variant="outline" color="gray.4">Select Image</Button>
              </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
}
