"use client";
import { fetcher } from "@/src/utils/fetcher";
import {
  Button,
  Checkbox,
  Divider,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Stack,
  TextInput,
  Title,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ContextModalProps, modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR, { mutate } from "swr";

export default function EditAddressCards() {
  const { data } = useSession();
  const { data: addressesResponse, isLoading } = useSWR(
    `/api/users/${data?.user.id}/shipping-address`,
    fetcher
  );

  if (isLoading) {
    <Loader />;
  }

  const addresses = addressesResponse?.map((address: any) => (
    <Paper
      key={address.id}
      className="border-2 border-red-600 p-10 text-left shadow-xl"
    >
      <Stack spacing={10}>
        <p className="font-semibold">{address.recipients_name}</p>
        <p>
          {address.save_address}, {address.address} {address.city}{" "}
          {address.postal_code}
        </p>
        <UnstyledButton
          className="font-bold"
          c="red.6"
          onClick={() =>
            modals.open({
              children: <UpdateAddressModal {...address}/>,
            })
          }
        >
          Change Address
        </UnstyledButton>
      </Stack>
    </Paper>
  ));

  return (
    <Paper shadow="xl" withBorder className=" p-3 lg:p-16">
      <Stack spacing="xs">
        <p className="text-2xl font-semibold">Choose another address</p>
        <p className="text-slate-400">Manage your shipping address</p>
        <Divider />
      </Stack>
      <Stack className="pt-5 lg:pt-10">
        <Paper
          className="border-2 border-dashed p-10 text-center"
          component="button"
          onClick={() =>
            modals.open({
              children: <CreateNewAddressModals />,
            })
          }
        >
          <p className="text-slate-400">Add new address</p>
        </Paper>
        <ScrollArea h={500} className="shadow-inner">
          <Stack>{addresses}</Stack>
        </ScrollArea>
      </Stack>
    </Paper>
  );
}

function CreateNewAddressModals() {
  const { data } = useSession();
  const form = useForm({
    initialValues: {
      saveAddress: "",
      recipientsName: "",
      recipientsPhone: "",
      address: "",
      city: "",
      postalCode: "",
      isPrimary: null,
    },
  });

  const onSubmit = form.onSubmit(async (values, _event) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${data?.user.id}/shipping-address`,
        {
          method: "POST",
          body: JSON.stringify(values),
        }
      );

      if (res.ok) {
        mutate(`/api/users/${data?.user.id}/shipping-address`);
        notifications.show({
          message: "Success adding address",
        });
      }
    } catch (error) {
      notifications.show({
        message: "Error while adding address",
      });
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Title order={1} className="text-center">
          Add new address
        </Title>
        <TextInput
          label="Save address as (ex: home address, office address)"
          placeholder="ex: home address, office address..."
          {...form.getInputProps("saveAddress")}
        />
        <Group grow>
          <TextInput
            label="Recipient's name"
            placeholder="ex: John Smith..."
            {...form.getInputProps("recipientsName")}
          />
          <TextInput
            label="Recipient's phone"
            placeholder="ex: 0812345..."
            {...form.getInputProps("recipientsPhone")}
          />
        </Group>
        <Group grow>
          <TextInput
            label="Address"
            placeholder="ex: Jl.Durian Runt..."
            {...form.getInputProps("address")}
          />
          <TextInput
            label="Postal code"
            placeholder="ex: 1452..."
            {...form.getInputProps("postalCode")}
          />
        </Group>
        <TextInput
          label="City or Subdistrict"
          placeholder="ex: Jakarta..."
          {...form.getInputProps("city")}
        />
        <Checkbox
          {...form.getInputProps("isPrimary")}
          label="Make it the primary address"
          color="red.6"
        />
        <Group position="right">
          <Button
            radius="xl"
            w={rem(80)}
            color="red.6"
            variant="outline"
            onClick={() => modals.closeAll()}
          >
            Cancel
          </Button>
          <Button
            radius="xl"
            className="bg-red-600"
            color="red.6"
            variant="filled"
            type="submit"
            w={rem(80)}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

interface UpdateAddressModalComponent {
  id: number;
  save_address: string;
  recipients_name: string;
  recipients_phone: string;
  address: string;
  city: string;
  postal_code: string;
  is_primary: boolean;
}

function UpdateAddressModal(addressData: UpdateAddressModalComponent) {
  const { data } = useSession();
  const form = useForm({
    initialValues: {
      saveAddress: addressData.save_address,
      recipientsName: addressData.recipients_name,
      recipientsPhone: addressData.recipients_phone,
      address: addressData.address,
      city: addressData.city,
      postalCode: addressData.postal_code,
      isPrimary: addressData.is_primary,
    },
  });

  const onSubmit = form.onSubmit(async (values, _event) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${data?.user.id}/shipping-address`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...values,
            addressId: addressData.id
          }),
        }
      );

      if (res.ok) {
        mutate(`/api/users/${data?.user.id}/shipping-address`);
        notifications.show({
          message: "Success updating address",
        });
      }
    } catch (error) {
      notifications.show({
        message: "Error while updating address",
      });
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Title order={1} className="text-center">
          Add new address
        </Title>
        <TextInput
          label="Save address as (ex: home address, office address)"
          placeholder="ex: home address, office address..."
          {...form.getInputProps("saveAddress")}
        />
        <Group grow>
          <TextInput
            label="Recipient's name"
            placeholder="ex: John Smith..."
            {...form.getInputProps("recipientsName")}
          />
          <TextInput
            label="Recipient's phone"
            placeholder="ex: 0812345..."
            {...form.getInputProps("recipientsPhone")}
          />
        </Group>
        <Group grow>
          <TextInput
            label="Address"
            placeholder="ex: Jl.Durian Runt..."
            {...form.getInputProps("address")}
          />
          <TextInput
            label="Postal code"
            placeholder="ex: 1452..."
            {...form.getInputProps("postalCode")}
          />
        </Group>
        <TextInput
          label="City or Subdistrict"
          placeholder="ex: Jakarta..."
          {...form.getInputProps("city")}
        />
        <Checkbox
          {...form.getInputProps("isPrimary")}
          label="Make it the primary address"
          color="red.6"
        />
        <Group position="right">
          <Button
            radius="xl"
            w={rem(80)}
            color="red.6"
            variant="outline"
            onClick={() => modals.closeAll()}
          >
            Cancel
          </Button>
          <Button
            radius="xl"
            className="bg-red-600"
            color="red.6"
            variant="filled"
            type="submit"
            w={rem(80)}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
