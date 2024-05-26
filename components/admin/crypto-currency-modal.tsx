import * as z from "zod";

import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect } from "react";

import { CryptoCurrencySchema } from "@/schemas";
import { NotificationIcon } from "../icons";
import { OperatorEnum } from "./crypto-currency-table";
import { getCryptoById } from "@/actions/crypto-currency";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: any;
  onSubmit: (values: z.infer<typeof CryptoCurrencySchema>) => void;
  isPending: boolean;
  error: string;
  operatorType: string;
}

const DefaultValus = {
  name: "",
  description: "",
  logoUrl: "",
  network: "",
  balance: 0,
  currencyCode: "",
  claimAmount: 1,
  claimFrequency: 1,
  balanceAlert: 1,
};

const CryptoCurrencyModal = ({
  isOpen,
  onClose,
  selectedItem,
  onSubmit,
  isPending,
  error,
  operatorType,
}: Props) => {
  const { control, handleSubmit, reset } = useForm<
    z.infer<typeof CryptoCurrencySchema>
  >({
    resolver: zodResolver(CryptoCurrencySchema),
    defaultValues: DefaultValus,
  });

  useEffect(() => {
    if (isOpen && selectedItem && OperatorEnum["EDIT"]) {
      getCryptoById(selectedItem.id).then((res: any) => {
        return reset(res?.data ?? DefaultValus);
      });
    } else if (isOpen && operatorType === OperatorEnum["ADD"]) {
      reset(DefaultValus);
    }
  }, [isOpen, selectedItem, reset, operatorType]);

  const getModalTitle = () => {
    switch (operatorType) {
      case OperatorEnum["ADD"]:
        return "Add";
      case OperatorEnum["EDIT"]:
        return "Edit";
      case OperatorEnum["DELETE"]:
        return "Confirm";
      default:
        return "Tip";
    }
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onClose={onClose}
      radius="lg"
      classNames={{
        header:
          operatorType === OperatorEnum["DELETE"]
            ? null
            : "border-b-[1px] border-[#]",
        footer:
          operatorType === OperatorEnum["DELETE"]
            ? null
            : "border-t-[1px] border-[#]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">
            {getModalTitle()}
          </ModalHeader>
          {operatorType === OperatorEnum["DELETE"] ? (
            <ModalBody>
              <p>Confirm deletion of this record?</p>
            </ModalBody>
          ) : (
            <ModalBody>
              <div className="flex justify-center min-h-[30px]">
                {error && (
                  <Chip
                    startContent={<NotificationIcon size={18} />}
                    variant="flat"
                    color="danger"
                    classNames={{
                      base: "rounded-md p-2 whitespace-pre-wrap h-auto",
                    }}
                  >
                    {error}
                  </Chip>
                )}
              </div>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      label="Chain Name"
                      placeholder="Please enter the chain name"
                      errorMessage={fieldState.error?.message}
                      color={fieldState.invalid ? "danger" : "default"}
                      isInvalid={fieldState.invalid}
                      isClearable
                      labelPlacement="outside"
                      {...field}
                    />
                  );
                }}
              />
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      label="Description"
                      placeholder="Please enter a description"
                      errorMessage={fieldState.error?.message}
                      color={fieldState.invalid ? "danger" : "default"}
                      isInvalid={fieldState.invalid}
                      isClearable
                      labelPlacement="outside"
                      {...field}
                    />
                  );
                }}
              />
              <Controller
                name="logoUrl"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      type="url"
                      label="Logo Url"
                      placeholder="please enter your logo url"
                      errorMessage={fieldState.error?.message}
                      color={fieldState.invalid ? "danger" : "default"}
                      isInvalid={fieldState.invalid}
                      isClearable
                      labelPlacement="outside"
                      {...field}
                    />
                  );
                }}
              />
              <Controller
                name="network"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      label="Network"
                      placeholder="please enter your network"
                      errorMessage={fieldState.error?.message}
                      color={fieldState.invalid ? "danger" : "default"}
                      isInvalid={fieldState.invalid}
                      isClearable
                      labelPlacement="outside"
                      {...field}
                    />
                  );
                }}
              />
              <Controller
                name="balance"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      type="number"
                      label="Balance"
                      placeholder="please enter your balance"
                      errorMessage={fieldState.error?.message}
                      color={fieldState.invalid ? "danger" : "default"}
                      isInvalid={fieldState.invalid}
                      labelPlacement="outside"
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                      {...field}
                      value={
                        field.value !== undefined ? String(field.value) : ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value !== ""
                            ? parseFloat(e.target.value)
                            : ""
                        )
                      }
                    />
                  );
                }}
              />
              <Controller
                name="currencyCode"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      label="Currency Code"
                      placeholder="please enter your currency code"
                      errorMessage={fieldState.error?.message}
                      color={fieldState.invalid ? "danger" : "default"}
                      isInvalid={fieldState.invalid}
                      isClearable
                      labelPlacement="outside"
                      {...field}
                    />
                  );
                }}
              />
              <Controller
                name="claimAmount"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      type="number"
                      label="Claim Amount"
                      placeholder="please enter your claim amount"
                      errorMessage={fieldState.error?.message}
                      color={fieldState.invalid ? "danger" : "default"}
                      isInvalid={fieldState.invalid}
                      labelPlacement="outside"
                      {...field}
                      value={
                        field.value !== undefined ? String(field.value) : ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value !== ""
                            ? parseFloat(e.target.value)
                            : ""
                        )
                      }
                    />
                  );
                }}
              />
              <Controller
                name="claimFrequency"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      type="number"
                      label="Claim Frequency"
                      placeholder="please enter your claim frequency"
                      errorMessage={fieldState.error?.message}
                      color={fieldState.invalid ? "danger" : "default"}
                      isInvalid={fieldState.invalid}
                      labelPlacement="outside"
                      {...field}
                      value={
                        field.value !== undefined ? String(field.value) : ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value !== ""
                            ? parseFloat(e.target.value)
                            : ""
                        )
                      }
                    />
                  );
                }}
              />
              <Controller
                name="balanceAlert"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      type="number"
                      label="Balance Alert"
                      placeholder="please enter your balance alert"
                      errorMessage={fieldState.error?.message}
                      color={fieldState.invalid ? "danger" : "default"}
                      isInvalid={fieldState.invalid}
                      labelPlacement="outside"
                      {...field}
                      value={
                        field.value !== undefined ? String(field.value) : ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value !== ""
                            ? parseFloat(e.target.value)
                            : ""
                        )
                      }
                    />
                  );
                }}
              />
            </ModalBody>
          )}
          <ModalFooter>
            <Button color="default" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button
              className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
              type="submit"
              isLoading={isPending}
            >
              Action
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CryptoCurrencyModal;
