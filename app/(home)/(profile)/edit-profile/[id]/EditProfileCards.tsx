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
import { useForm } from "@mantine/form";
import React from "react";
import { mutate } from "swr";

export default function EditProfileCards({ user }: { user: any }) {
console.log("🚀 ~ file: EditProfileCards.tsx:20 ~ EditProfileCards ~ user:", user)

  
  const form = useForm({
    initialValues: {
      name: user?.name,
      email: user?.email,
      phoneNumber: user?.phone_number || "",
      gender: user?.gender,
      dateOfBirth: user && new Date(user?.date_of_birth) || null,
    },
  });

  const onUpdating = form.onSubmit(async (values, _event) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(values)
      })

      console.log("🚀 ~ file: EditProfileCards.tsx:34 ~ onUpdating ~ res:", res)
      
      if (res.ok) {
        alert("Successfully updated user data")
        mutate(`/api/users/${user.id}`)
      } else {
        alert("Failed to update user data")
      }
    } catch (error) {
      alert("Error updating user data")
    }
  })

  

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
            <form onSubmit={onUpdating}>
              <Stack>
                <TextInput label="Name" placeholder="Name..." {...form.getInputProps("name")}/>
                <TextInput label="Email" placeholder="Email..." {...form.getInputProps("email")}/>
                <TextInput label="Phone number" placeholder="Phone number..." {...form.getInputProps("phoneNumber")}/>
                <Radio.Group label="Gender" {...form.getInputProps("gender")}>
                  <Group>
                    <Radio value="male" label="Male" />
                    <Radio value="female" label="Female" />
                  </Group>
                </Radio.Group>
                <DatePickerInput
                  label="Date of birth"
                  placeholder="Pick your date of birth"
                  {...form.getInputProps("dateOfBirth")}
                />
                <Button
                  color="red.6"
                  className="bg-red-600"
                  maw={rem(150)}
                  radius="xl"
                  type="submit"
                >
                  Save
                </Button>
              </Stack>
            </form>
          </Grid.Col>
          <Grid.Col lg={4}>
            <Stack maw={rem(200)} mx="auto" align="center">
              <Avatar size="xl" />
              <Button variant="outline" color="gray.4">
                Select Image
              </Button>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
}
