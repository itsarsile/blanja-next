"use client";
import {
  Avatar,
  Button,
  Divider,
  FileButton,
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
import { notifications } from "@mantine/notifications";
import React, { FormEvent, useState } from "react";
import { mutate } from "swr";

export default function EditProfileCards({ user }: { user: any }) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      name: user?.name,
      email: user?.email,
      phoneNumber: user?.phone_number || "",
      gender: user?.gender,
      dateOfBirth: (user && new Date(user?.date_of_birth)) || null,
    },
  });

  const onUpdating = form.onSubmit(async (values, _event) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}`,
        {
          method: "PUT",
          body: JSON.stringify(values),
        }
      );

      if (res.ok) {
        setIsLoading(false);
        notifications.show({
          message: "Successfully update user!",
        });
        mutate(`/api/users/${user.id}`);
      } else {
        setIsLoading(false);

        notifications.show({
          message: "Error while updating user",
        });
        setIsLoading(false);
      }
    } catch (error) {
      notifications.show({
        message: "Error while updating user",
      });
    } finally {
      setIsLoading(false);
    }
  });

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      notifications.show({
        message: "Please select a file!",
      });

      return;
    }
    const formData = new FormData();
    formData.append("content", file);

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}/avatar-upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setIsLoading(false);
        mutate("/api/users");
        notifications.show({
          message: "Successfully uploaded avatar!",
        });
      }
    } catch (error) {
      setIsLoading(false);

      notifications.show({
        message: "Error while uploading avatar!",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                <TextInput
                  label="Name"
                  placeholder="Name..."
                  {...form.getInputProps("name")}
                />
                <TextInput
                  label="Email"
                  placeholder="Email..."
                  {...form.getInputProps("email")}
                />
                <TextInput
                  label="Phone number"
                  placeholder="Phone number..."
                  {...form.getInputProps("phoneNumber")}
                />
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
            <Stack maw={rem(200)} mx="auto" align="center" justify="center">
              <form
                className="flex flex-col items-center gap-5 justify-center"
                onSubmit={handleUpload}
              >
                <Avatar
                  size="xl"
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : (user && user.avatar) || null
                  }
                  styles={{
                    root: {
                      borderRadius: "100%",
                    },
                    image: {
                      objectFit: "cover",
                    },
                  }}
                />
                <FileButton onChange={setFile} accept="image/*" disabled={isLoading ? true : false}>
                  {(props) => (
                    <Button variant="outline" color="gray.6" {...props}>
                      Select Image
                    </Button>
                  )}
                </FileButton>
                {file && (
                  <Button variant="filled" type="submit" color="red.6"  disabled={isLoading ? true : false} loading={isLoading ? true : false}>
                    Upload
                  </Button>
                )}
              </form>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
}
