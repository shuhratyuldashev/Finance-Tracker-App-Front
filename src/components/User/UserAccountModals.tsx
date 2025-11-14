import { useState } from "react";
import Modal from "../Modal";
import InputField from "../InputField";

export const useUserAccountModals = () => {
  const [openModal, setOpenModal] = useState<
    "email" | "password" | "logout" | null
  >(null);

  const handleOpen = (type: "email" | "password" | "logout") =>
    setOpenModal(type);
  const handleClose = () => setOpenModal(null);

  const ChangeEmailModal = () => (
    <Modal
      open={openModal === "email"}
      onClose={handleClose}
      title="Изменить почту"
      footer={
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition"
          >
            Отмена
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            Сохранить
          </button>
        </div>
      }
    >
      <InputField
        id="newEmail"
        label="Новая почта"
        type="email"
        placeholder="example@email.com"
      />
    </Modal>
  );

  const ChangePasswordModal = () => (
    <Modal
      open={openModal === "password"}
      onClose={handleClose}
      title="Сменить пароль"
      footer={
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition"
          >
            Отмена
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            Обновить
          </button>
        </div>
      }
    >
      <InputField id="oldPassword" label="Старый пароль" type="password" />
      <InputField id="newPassword" label="Новый пароль" type="password" />
      <InputField
        id="confirmPassword"
        label="Подтвердите пароль"
        type="password"
      />
    </Modal>
  );

  const LogoutConfirmModal = () => (
    <Modal
      open={openModal === "logout"}
      onClose={handleClose}
      title="Выход из аккаунта"
      footer={
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition"
          >
            Отмена
          </button>
          <button className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
            Выйти
          </button>
        </div>
      }
    >
      <p className="text-gray-700 dark:text-gray-300">
        Вы уверены, что хотите выйти из аккаунта?
      </p>
    </Modal>
  );

  return {
    openModal: handleOpen,
    ChangeEmailModal,
    ChangePasswordModal,
    LogoutConfirmModal,
  };
};
